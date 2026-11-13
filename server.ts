import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  DEALERSHIP_INFO,
  DEMONSTRATION_INVENTORY,
  PLACEHOLDER_REVIEWS,
} from './src/data/dealership.ts';
import type {
  ContactSubmissionPayload,
  QuoteRequestPayload,
  ServiceAppointmentPayload,
} from './src/types/dealership.ts';

interface StoredSubmission {
  referenceId: string;
  type: 'contact' | 'service-appointment' | 'quote-request';
  submittedAt: string;
  payload: ContactSubmissionPayload | ServiceAppointmentPayload | QuoteRequestPayload;
}

const PORT = Number(process.env.PORT) || 3000;
const SUBMISSIONS_LOG_PATH = '/tmp/vancouver_mitsubishi_submissions.json';
const submissionsStore: StoredSubmission[] = [];

async function persistSubmission(entry: StoredSubmission): Promise<void> {
  submissionsStore.push(entry);
  try {
    await fs.writeFile(
      SUBMISSIONS_LOG_PATH,
      JSON.stringify(submissionsStore, null, 2),
      'utf-8'
    );
  } catch {
    // Non-fatal fallback if ephemeral filesystem is read-only
  }
}

function createReferenceId(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timePart = Date.now().toString().slice(-4);
  return `${prefix}-${timePart}-${randomPart}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      dealership: DEALERSHIP_INFO.name,
      timestamp: new Date().toISOString(),
    });
  });

  // Structured inventory feed endpoint (ready to swap for live DMS/vAuto feed adapter)
  app.get('/api/inventory', (req, res) => {
    const category = typeof req.query.category === 'string' ? req.query.category.trim() : '';
    const model = typeof req.query.model === 'string' ? req.query.model.trim() : '';
    const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';

    let items = [...DEMONSTRATION_INVENTORY];

    if (category && category !== 'All Vehicles') {
      items = items.filter((item) => item.category === category);
    }

    if (model && model !== 'All Models') {
      items = items.filter((item) => item.model === model);
    }

    if (query) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.model.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.bodyStyle.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query)
      );
    }

    res.json({
      feedType: 'demonstration',
      isLiveInventoryConnected: false,
      note: 'Demonstration showcase entries. Connect dealership DMS feed to replace placeholder catalog.',
      total: items.length,
      items,
    });
  });

  // Structured reviews feed endpoint (ready for Google Places API connection)
  app.get('/api/reviews', (_req, res) => {
    res.json({
      connected: false,
      isPlaceholder: true,
      googleReviewsUrl: DEALERSHIP_INFO.googleReviewsUrl,
      items: PLACEHOLDER_REVIEWS,
    });
  });

  // General dealership contact endpoint
  app.post('/api/contact', async (req, res) => {
    const body = req.body as Partial<ContactSubmissionPayload>;
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const department = body.department ?? 'Sales';
    const subject = (body.subject ?? '').trim();
    const message = (body.message ?? '').trim();

    if (name.length < 2) {
      res.status(400).json({ error: 'Please enter your full name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: 'Please enter a valid phone number.' });
      return;
    }
    if (!['Sales', 'Service', 'Parts'].includes(department)) {
      res.status(400).json({ error: 'Please select a valid department (Sales, Service, or Parts).' });
      return;
    }
    if (subject.length < 2) {
      res.status(400).json({ error: 'Please include a subject for your inquiry.' });
      return;
    }
    if (message.length < 10) {
      res.status(400).json({ error: 'Please enter a message of at least 10 characters.' });
      return;
    }

    const referenceId = createReferenceId('VM-INQ');
    const submittedAt = new Date().toISOString();

    await persistSubmission({
      referenceId,
      type: 'contact',
      submittedAt,
      payload: { name, email, phone, department, subject, message },
    });

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message: `Thank you, ${name}. Your ${department} inquiry has been recorded under reference ${referenceId}. Our Vancouver Mitsubishi team will follow up shortly.`,
    });
  });

  // Service appointment request endpoint
  app.post('/api/service-appointment', async (req, res) => {
    const body = req.body as Partial<ServiceAppointmentPayload>;
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const vehicleModel = (body.vehicleModel ?? '').trim();
    const serviceType = (body.serviceType ?? '').trim();
    const preferredDate = (body.preferredDate ?? '').trim();
    const notes = (body.notes ?? '').trim();

    if (name.length < 2) {
      res.status(400).json({ error: 'Please provide your name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: 'Please provide a valid phone number.' });
      return;
    }
    if (!vehicleModel) {
      res.status(400).json({ error: 'Please specify your vehicle model.' });
      return;
    }
    if (!serviceType) {
      res.status(400).json({ error: 'Please select a requested service type.' });
      return;
    }
    if (!preferredDate) {
      res.status(400).json({ error: 'Please select a preferred appointment date.' });
      return;
    }

    const referenceId = createReferenceId('VM-SRV');
    const submittedAt = new Date().toISOString();

    await persistSubmission({
      referenceId,
      type: 'service-appointment',
      submittedAt,
      payload: { name, email, phone, vehicleModel, serviceType, preferredDate, notes },
    });

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message: `Service request ${referenceId} received for ${vehicleModel} (${preferredDate}). For immediate scheduling assistance, call Carson Leung at ${DEALERSHIP_INFO.serviceContact.phoneDisplay}.`,
    });
  });

  // Vehicle quote / financing / trade-in request endpoint
  app.post('/api/quote-request', async (req, res) => {
    const body = req.body as Partial<QuoteRequestPayload>;
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const modelName = (body.modelName ?? '').trim();
    const category = (body.category ?? '').trim();
    const inquiryType = body.inquiryType ?? 'Vehicle Quote';
    const notes = (body.notes ?? '').trim();

    if (name.length < 2) {
      res.status(400).json({ error: 'Please provide your full name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: 'Please provide a valid phone number.' });
      return;
    }
    if (!modelName) {
      res.status(400).json({ error: 'Please select a vehicle model or inquiry focus.' });
      return;
    }

    const referenceId = createReferenceId('VM-QTE');
    const submittedAt = new Date().toISOString();

    await persistSubmission({
      referenceId,
      type: 'quote-request',
      submittedAt,
      payload: { name, email, phone, modelName, category, inquiryType, notes },
    });

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message: `Your ${inquiryType} request for ${modelName} has been logged (${referenceId}). Our Vancouver Mitsubishi advisors will reach out with current availability and options.`,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vancouver Mitsubishi server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
