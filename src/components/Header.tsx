import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { DEALERSHIP_IMAGES, DEALERSHIP_INFO } from '../data/dealership.ts';
import type { VehicleCategory } from '../types/dealership.ts';

interface HeaderProps {
  onSelectInventoryCategory: (category: 'All Vehicles' | VehicleCategory) => void;
  onOpenOffersInquiry: () => void;
}

export function Header({ onSelectInventoryCategory, onOpenOffersInquiry }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInventoryRoute = (category: 'All Vehicles' | VehicleCategory) => {
    onSelectInventoryCategory(category);
    scrollToSection('inventory');
  };

  const navItems: Array<{ label: string; action: () => void }> = [
    { label: 'Home', action: () => scrollToSection('hero') },
    { label: 'New Vehicles', action: () => handleInventoryRoute('New Vehicles') },
    { label: 'Used Vehicles', action: () => handleInventoryRoute('Pre-Owned Vehicles') },
    { label: 'Mitsubishi Lineup', action: () => handleInventoryRoute('All Vehicles') },
    {
      label: 'Offers',
      action: () => {
        setMobileMenuOpen(false);
        onOpenOffersInquiry();
      },
    },
    { label: 'Financing', action: () => scrollToSection('financing') },
    { label: 'Service & Parts', action: () => scrollToSection('service') },
    { label: 'About Us', action: () => scrollToSection('about') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs'
          : 'bg-[#101010]/80 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-200 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Left: Official Mitsubishi Three-Diamond Emblem + Vancouver Mitsubishi Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012]"
          aria-label="Vancouver Mitsubishi Home"
        >
          <img
            src={DEALERSHIP_IMAGES.logo}
            alt="Mitsubishi three-diamond symbol"
            referrerPolicy="no-referrer"
            className="h-7 w-7 object-contain shrink-0"
          />
          <span
            className={`font-display text-base sm:text-lg font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-[#101010]' : 'text-white'
            }`}
          >
            Vancouver Mitsubishi
          </span>
        </a>

        {/* Center: Desktop Single-Line Navigation */}
        <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`relative py-1 text-[13px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E60012] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012] ${
                isScrolled
                  ? 'text-[#202124] hover:text-[#E60012]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Click-to-call + Primary Explore Inventory CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={DEALERSHIP_INFO.serviceContact.phoneHref}
            className={`hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold tabular-nums whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012] ${
              isScrolled
                ? 'text-[#101010] hover:text-[#E60012]'
                : 'text-white hover:text-white/80'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#E60012]" aria-hidden="true" />
            <span>{DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => handleInventoryRoute('All Vehicles')}
            className="hidden sm:inline-flex items-center justify-center bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold tracking-wide px-4 py-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E60012]"
          >
            Explore Inventory
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`xl:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012] ${
              isScrolled ? 'text-[#101010]' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-neutral-200 shadow-lg">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="w-full text-left px-3 py-3 text-sm font-medium text-[#101010] hover:bg-[#F4F4F4] hover:text-[#E60012] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
              <a
                href={DEALERSHIP_INFO.serviceContact.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 text-sm font-semibold text-[#101010] hover:border-[#101010] tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#E60012]" aria-hidden="true" />
                <span>Call {DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => handleInventoryRoute('All Vehicles')}
                className="inline-flex items-center justify-center bg-[#E60012] hover:bg-[#C2000F] text-white text-sm font-semibold px-5 py-3 transition-colors cursor-pointer"
              >
                Explore Inventory
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
