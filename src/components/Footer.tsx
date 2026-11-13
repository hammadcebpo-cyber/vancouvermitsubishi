import { Mail, Phone } from 'lucide-react';
import { DEALERSHIP_IMAGES, DEALERSHIP_INFO } from '../data/dealership.ts';
import type { VehicleCategory } from '../types/dealership.ts';
import { SocialIcons } from './SocialIcons.tsx';

interface FooterProps {
  onSelectInventoryCategory: (category: 'All Vehicles' | VehicleCategory) => void;
  onContactDepartment: (department: 'Sales' | 'Service' | 'Parts', subject?: string) => void;
  onOpenLegalModal: (doc: 'privacy' | 'terms') => void;
}

export function Footer({
  onSelectInventoryCategory,
  onContactDepartment,
  onOpenLegalModal,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navActions: Array<{ label: string; onClick: () => void }> = [
    { label: 'Home', onClick: () => scrollTo('hero') },
    {
      label: 'New Vehicles',
      onClick: () => {
        onSelectInventoryCategory('New Vehicles');
        scrollTo('inventory');
      },
    },
    {
      label: 'Used Vehicles',
      onClick: () => {
        onSelectInventoryCategory('Pre-Owned Vehicles');
        scrollTo('inventory');
      },
    },
    { label: 'Financing', onClick: () => scrollTo('financing') },
    { label: 'Service', onClick: () => scrollTo('service') },
    {
      label: 'Parts',
      onClick: () => {
        onContactDepartment('Parts', 'Genuine Mitsubishi Parts Inquiry');
        scrollTo('contact');
      },
    },
    { label: 'About', onClick: () => scrollTo('about') },
    { label: 'Contact', onClick: () => scrollTo('contact') },
  ];

  return (
    <footer className="bg-[#101010] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Dealership Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={DEALERSHIP_IMAGES.logo}
                alt="Mitsubishi three-diamond symbol"
                referrerPolicy="no-referrer"
                className="h-7 w-7 object-contain"
              />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {DEALERSHIP_INFO.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed max-w-sm">
              {DEALERSHIP_INFO.address.full}
            </p>
            <div className="mt-5">
              <SocialIcons variant="dark" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {navActions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="text-left text-sm text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Contact */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
              Service Contact
            </h3>
            <p className="text-sm font-semibold text-white">
              {DEALERSHIP_INFO.serviceContact.contactName}
            </p>
            <div className="mt-3 space-y-2.5">
              <a
                href={DEALERSHIP_INFO.serviceContact.phoneHref}
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#E60012] shrink-0" aria-hidden="true" />
                <span>{DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
              </a>
              <a
                href={DEALERSHIP_INFO.serviceContact.emailHref}
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#E60012] shrink-0" aria-hidden="true" />
                <span>{DEALERSHIP_INFO.serviceContact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>&copy; {currentYear} {DEALERSHIP_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
