import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership.ts';
import type { InquiryDepartment, SubmissionSuccessResponse } from '../types/dealership.ts';
import { SocialIcons } from './SocialIcons.tsx';

interface ContactSectionProps {
  preferredDepartment: InquiryDepartment;
  preferredSubject: string;
}

export function ContactSection({
  preferredDepartment,
  preferredSubject,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<InquiryDepartment>(preferredDepartment);
  const [subject, setSubject] = useState(preferredSubject);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionSuccessResponse | null>(null);

  useEffect(() => {
    setDepartment(preferredDepartment);
  }, [preferredDepartment]);

  useEffect(() => {
    if (preferredSubject) {
      setSubject(preferredSubject);
    }
  }, [preferredSubject]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    if (subject.trim().length < 2) {
      setErrorMsg('Please enter a subject for your message.');
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg('Please provide a message of at least 10 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          department,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as SubmissionSuccessResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit inquiry at this time.');
      }

      setConfirmation(data);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Network error while submitting inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
            Contact &amp; Location
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance">
            VISIT VANCOUVER MITSUBISHI.
          </h2>
          <p className="mt-3 text-base text-[#202124]">
            Connect with our Sales, Service, or Parts teams at our Clark Drive dealership in
            Vancouver, BC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Dealership Details, Service Contact, Map Embed */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F4F4F4] border border-neutral-200 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-[#101010]">
                  {DEALERSHIP_INFO.name}
                </h3>
                <div className="mt-3 flex items-start gap-3 text-sm text-[#202124]">
                  <MapPin className="w-4 h-4 text-[#E60012] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p>{DEALERSHIP_INFO.address.street}</p>
                    <p>
                      {DEALERSHIP_INFO.address.city}, {DEALERSHIP_INFO.address.province},{' '}
                      {DEALERSHIP_INFO.address.postalCode}
                    </p>
                    <p>{DEALERSHIP_INFO.address.country}</p>
                  </div>
                </div>
                <a
                  href={DEALERSHIP_INFO.address.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E60012] hover:text-[#101010] underline underline-offset-4"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-5 border-t border-neutral-300">
                <h4 className="font-display text-sm font-bold text-[#101010]">
                  Service Department
                </h4>
                <p className="mt-1 text-sm text-[#202124]">
                  {DEALERSHIP_INFO.serviceContact.contactName}
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={DEALERSHIP_INFO.serviceContact.phoneHref}
                    className="flex items-center gap-2.5 text-sm font-semibold text-[#101010] hover:text-[#E60012] tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#E60012]" aria-hidden="true" />
                    <span>{DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
                  </a>
                  <a
                    href={DEALERSHIP_INFO.serviceContact.emailHref}
                    className="flex items-center gap-2.5 text-sm text-[#202124] hover:text-[#E60012] break-all"
                  >
                    <Mail className="w-4 h-4 text-[#E60012]" aria-hidden="true" />
                    <span>{DEALERSHIP_INFO.serviceContact.email}</span>
                  </a>
                </div>
              </div>

              <div className="pt-5 border-t border-neutral-300">
                <span className="block text-xs font-semibold text-neutral-600 mb-3">
                  Follow Vancouver Mitsubishi
                </span>
                <SocialIcons variant="light" />
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="border border-neutral-200 bg-[#F4F4F4] overflow-hidden">
              <iframe
                title="Vancouver Mitsubishi Location Map — 1885 Clark Drive, Vancouver, BC"
                src={DEALERSHIP_INFO.address.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 border-0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Column: Validated Backend Contact Form */}
          <div className="lg:col-span-7 bg-[#F4F4F4] border border-neutral-200 p-6 sm:p-8 lg:p-10">
            <h3 className="font-display text-xl font-bold text-[#101010]">
              Send Us a Message
            </h3>
            <p className="mt-1.5 text-sm text-[#202124]">
              Select your department below and our team will respond promptly.
            </p>

            {confirmation ? (
              <div
                role="status"
                className="mt-6 bg-white border border-neutral-300 p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-lg font-bold text-[#101010]">
                      Inquiry Received
                    </p>
                    <p className="mt-1 text-sm text-[#202124] leading-relaxed">
                      {confirmation.message}
                    </p>
                    <p className="mt-3 text-xs font-medium text-neutral-600 tabular-nums">
                      Reference ID: {confirmation.referenceId}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="inline-flex items-center justify-center bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold px-5 py-3 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {errorMsg && (
                  <div
                    role="alert"
                    className="p-4 bg-white border border-[#E60012] flex items-start gap-3 text-sm text-[#101010]"
                  >
                    <AlertCircle
                      className="w-4 h-4 text-[#E60012] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Department Selector */}
                <div>
                  <span className="block text-xs font-semibold text-[#101010] mb-2">
                    Department
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Sales', 'Service', 'Parts'] as InquiryDepartment[]).map((dept) => {
                      const active = department === dept;
                      return (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => setDepartment(dept)}
                          aria-pressed={active}
                          className={`py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#101010] border-[#101010] text-white'
                              : 'bg-white border-neutral-300 text-[#202124] hover:border-[#101010]'
                          }`}
                        >
                          {dept}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Full Name <span className="text-[#E60012]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Phone Number <span className="text-[#E60012]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="604-555-0199"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Email Address <span className="text-[#E60012]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Subject <span className="text-[#E60012]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Vehicle or service inquiry"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#101010] mb-1.5"
                  >
                    Message <span className="text-[#E60012]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our Vancouver Mitsubishi team help you?"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] focus:outline-none focus:border-[#101010]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#E60012] hover:bg-[#C2000F] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold tracking-wider px-8 py-4 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{submitting ? 'SENDING MESSAGE...' : 'SUBMIT INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
