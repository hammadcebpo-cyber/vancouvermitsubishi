import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, Check, CheckCircle2, Phone, X } from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership.ts';
import type {
  InventoryItem,
  QuoteInquiryType,
  SubmissionSuccessResponse,
} from '../types/dealership.ts';

interface VehicleDetailsModalProps {
  vehicle: InventoryItem | null;
  onClose: () => void;
  onRequestQuote: (vehicle: InventoryItem, inquiryType: QuoteInquiryType) => void;
}

export function VehicleDetailsModal({
  vehicle,
  onClose,
  onRequestQuote,
}: VehicleDetailsModalProps) {
  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
      className="fixed inset-0 z-50 bg-[#101010]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-neutral-200 max-w-2xl w-full overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] bg-neutral-200">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle details"
            className="absolute top-4 right-4 w-10 h-10 bg-[#101010]/80 hover:bg-[#E60012] text-white inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
            <span className="font-semibold text-[#E60012]">{vehicle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.bodyStyle}</span>
          </div>

          <h3
            id="vehicle-modal-title"
            className="font-display text-2xl sm:text-3xl font-bold text-[#101010]"
          >
            {vehicle.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#202124] leading-relaxed">
            {vehicle.overview}
          </p>

          <ul className="mt-5 space-y-2 border-t border-neutral-200 pt-5">
            {vehicle.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-sm text-[#202124]">
                <Check className="w-4 h-4 text-[#E60012] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 p-3.5 bg-[#F4F4F4] border border-neutral-200 text-xs text-neutral-700">
            <strong>Demonstration Lineup Entry:</strong> {vehicle.officialLineupNote}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onRequestQuote(vehicle, 'Vehicle Quote')}
              className="flex-1 bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold tracking-wider py-3.5 px-5 transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            <button
              type="button"
              onClick={() => onRequestQuote(vehicle, 'Test Drive')}
              className="flex-1 border border-[#101010] hover:bg-[#101010] hover:text-white text-[#101010] text-xs font-semibold tracking-wider py-3.5 px-5 transition-colors cursor-pointer"
            >
              Book a Test Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuoteRequestModalProps {
  isOpen: boolean;
  initialModelName: string;
  initialCategory: string;
  initialInquiryType: QuoteInquiryType;
  initialNotes?: string;
  onClose: () => void;
}

export function QuoteRequestModal({
  isOpen,
  initialModelName,
  initialCategory,
  initialInquiryType,
  initialNotes = '',
  onClose,
}: QuoteRequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modelName, setModelName] = useState(initialModelName);
  const [inquiryType, setInquiryType] = useState<QuoteInquiryType>(initialInquiryType);
  const [notes, setNotes] = useState(initialNotes);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionSuccessResponse | null>(null);

  useEffect(() => {
    if (isOpen) {
      setModelName(initialModelName);
      setInquiryType(initialInquiryType);
      setNotes(initialNotes);
      setErrorMsg(null);
      setConfirmation(null);
    }
  }, [isOpen, initialModelName, initialInquiryType, initialNotes]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          modelName: modelName.trim() || 'Mitsubishi Lineup',
          category: initialCategory || 'General',
          inquiryType,
          notes: notes.trim(),
        }),
      });
      const data = (await response.json()) as SubmissionSuccessResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Could not submit request.');
      }
      setConfirmation(data);
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 bg-[#101010]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-neutral-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <p className="text-xs font-semibold text-[#E60012]">{inquiryType}</p>
            <h3 id="quote-modal-title" className="font-display text-xl font-bold text-[#101010]">
              {modelName || 'Vancouver Mitsubishi Inquiry'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 inline-flex items-center justify-center text-neutral-600 hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {confirmation ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[#F4F4F4] border border-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-display text-base font-bold text-[#101010]">Request Confirmed</p>
                <p className="mt-1 text-sm text-[#202124]">{confirmation.message}</p>
                <p className="mt-2 text-xs text-neutral-600 tabular-nums">
                  Reference ID: {confirmation.referenceId}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold py-3.5 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            {errorMsg && (
              <div
                role="alert"
                className="p-3 bg-[#F4F4F4] border border-[#E60012] flex items-start gap-2.5 text-xs text-[#101010]"
              >
                <AlertCircle className="w-4 h-4 text-[#E60012] shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label htmlFor="quote-type" className="block text-xs font-semibold text-[#101010] mb-1">
                Inquiry Type
              </label>
              <select
                id="quote-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value as QuoteInquiryType)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              >
                <option value="Vehicle Quote">Vehicle Quote</option>
                <option value="Test Drive">Test Drive</option>
                <option value="Current Offers">Current Offers</option>
                <option value="Financing Pre-Approval">Financing Pre-Approval</option>
                <option value="Trade-In Valuation">Trade-In Valuation</option>
              </select>
            </div>

            <div>
              <label htmlFor="quote-model" className="block text-xs font-semibold text-[#101010] mb-1">
                Vehicle / Model Interest
              </label>
              <input
                id="quote-model"
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-name" className="block text-xs font-semibold text-[#101010] mb-1">
                  Full Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
              <div>
                <label htmlFor="quote-phone" className="block text-xs font-semibold text-[#101010] mb-1">
                  Phone *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-email" className="block text-xs font-semibold text-[#101010] mb-1">
                Email Address *
              </label>
              <input
                id="quote-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              />
            </div>

            <div>
              <label htmlFor="quote-notes" className="block text-xs font-semibold text-[#101010] mb-1">
                Additional Notes
              </label>
              <textarea
                id="quote-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred trims, trade-in vehicle details, or questions..."
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#E60012] hover:bg-[#C2000F] disabled:opacity-60 text-white text-xs font-semibold tracking-wider py-3.5 transition-colors cursor-pointer"
            >
              {submitting ? 'SUBMITTING REQUEST...' : 'SUBMIT REQUEST'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

interface ServiceAppointmentModalProps {
  isOpen: boolean;
  initialServiceType: string;
  onClose: () => void;
}

export function ServiceAppointmentModal({
  isOpen,
  initialServiceType,
  onClose,
}: ServiceAppointmentModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('Mitsubishi Outlander');
  const [serviceType, setServiceType] = useState(initialServiceType);
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionSuccessResponse | null>(null);

  useEffect(() => {
    if (isOpen) {
      setServiceType(initialServiceType || 'Routine Maintenance');
      setErrorMsg(null);
      setConfirmation(null);
    }
  }, [isOpen, initialServiceType]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please select a preferred appointment date.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/service-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          vehicleModel: vehicleModel.trim(),
          serviceType,
          preferredDate,
          notes: notes.trim(),
        }),
      });
      const data = (await response.json()) as SubmissionSuccessResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Could not book service appointment.');
      }
      setConfirmation(data);
      setName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      setNotes('');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 bg-[#101010]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-neutral-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <p className="text-xs font-semibold text-[#E60012]">
              {DEALERSHIP_INFO.serviceContact.departmentName} ·{' '}
              {DEALERSHIP_INFO.serviceContact.contactName}
            </p>
            <h3 id="service-modal-title" className="font-display text-xl font-bold text-[#101010]">
              Book a Service Appointment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 inline-flex items-center justify-center text-neutral-600 hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {confirmation ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[#F4F4F4] border border-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-display text-base font-bold text-[#101010]">
                  Service Request Logged
                </p>
                <p className="mt-1 text-sm text-[#202124]">{confirmation.message}</p>
                <p className="mt-2 text-xs text-neutral-600 tabular-nums">
                  Reference ID: {confirmation.referenceId}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold py-3.5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            {errorMsg && (
              <div
                role="alert"
                className="p-3 bg-[#F4F4F4] border border-[#E60012] flex items-start gap-2.5 text-xs text-[#101010]"
              >
                <AlertCircle className="w-4 h-4 text-[#E60012] shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-3 bg-[#F4F4F4] border border-neutral-200 flex items-center justify-between gap-2 text-xs text-[#202124]">
              <span>Need immediate service scheduling?</span>
              <a
                href={DEALERSHIP_INFO.serviceContact.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-[#E60012] tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="srv-name" className="block text-xs font-semibold text-[#101010] mb-1">
                  Full Name *
                </label>
                <input
                  id="srv-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
              <div>
                <label htmlFor="srv-phone" className="block text-xs font-semibold text-[#101010] mb-1">
                  Phone *
                </label>
                <input
                  id="srv-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="srv-email" className="block text-xs font-semibold text-[#101010] mb-1">
                Email Address *
              </label>
              <input
                id="srv-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="srv-vehicle" className="block text-xs font-semibold text-[#101010] mb-1">
                  Vehicle Model &amp; Year *
                </label>
                <input
                  id="srv-vehicle"
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
              <div>
                <label htmlFor="srv-date" className="block text-xs font-semibold text-[#101010] mb-1">
                  Preferred Date *
                </label>
                <input
                  id="srv-date"
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="srv-type" className="block text-xs font-semibold text-[#101010] mb-1">
                Service Required *
              </label>
              <select
                id="srv-type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              >
                <option value="Routine Maintenance">Routine Maintenance</option>
                <option value="Vehicle Maintenance & Inspection">
                  Vehicle Maintenance &amp; Inspection
                </option>
                <option value="Tire Services & Changeover">Tire Services &amp; Changeover</option>
                <option value="Genuine Mitsubishi Parts Installation">
                  Genuine Mitsubishi Parts Installation
                </option>
                <option value="Diagnostic / Repair">Diagnostic / Repair</option>
              </select>
            </div>

            <div>
              <label htmlFor="srv-notes" className="block text-xs font-semibold text-[#101010] mb-1">
                Additional Service Notes
              </label>
              <textarea
                id="srv-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe any symptoms, mileage, or preferred time of day..."
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#E60012] hover:bg-[#C2000F] disabled:opacity-60 text-white text-xs font-semibold tracking-wider py-3.5 transition-colors cursor-pointer"
            >
              {submitting ? 'SUBMITTING REQUEST...' : 'REQUEST APPOINTMENT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

interface LegalModalProps {
  doc: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModal({ doc, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 bg-[#101010]/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-neutral-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200">
          <h3 id="legal-modal-title" className="font-display text-xl font-bold text-[#101010]">
            {doc === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal notice"
            className="w-9 h-9 inline-flex items-center justify-center text-neutral-600 hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-[#202124] leading-relaxed">
          {doc === 'privacy' ? (
            <>
              <p>
                Vancouver Mitsubishi ({DEALERSHIP_INFO.address.full}) collects contact, vehicle,
                and service inquiry details solely to respond to your requests for sales,
                financing, parts, or service assistance.
              </p>
              <p>
                For questions regarding personal information submitted through this website, please
                contact {DEALERSHIP_INFO.serviceContact.email} or call{' '}
                {DEALERSHIP_INFO.serviceContact.phoneDisplay}.
              </p>
            </>
          ) : (
            <>
              <p>
                Vehicle showcase entries, payment estimates, and lineup descriptions displayed on
                this site are provided for general informational and demonstration purposes. Final
                vehicle pricing, availability, model specifications, and financing terms are
                confirmed directly by Vancouver Mitsubishi.
              </p>
              <p>
                All inquiries submitted through this site remain subject to verification by our
                dealership team at {DEALERSHIP_INFO.address.full}.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold py-3 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
