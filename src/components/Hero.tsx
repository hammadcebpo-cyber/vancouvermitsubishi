import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { DEALERSHIP_IMAGES, DEALERSHIP_INFO } from '../data/dealership.ts';
import type { VehicleCategory } from '../types/dealership.ts';

interface HeroProps {
  onSelectInventoryCategory: (category: 'All Vehicles' | VehicleCategory) => void;
}

export function Hero({ onSelectInventoryCategory }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.09]);

  const handleExplore = (category: VehicleCategory) => {
    onSelectInventoryCategory(category);
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[620px] lg:min-h-[88vh] w-full overflow-hidden bg-[#101010] flex items-center"
    >
      {/* Full-bleed Vancouver Automotive Photography with Parallax */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={DEALERSHIP_IMAGES.hero}
          alt="Modern white Mitsubishi SUV parked along the Vancouver waterfront with coastal mountains and skyline at twilight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Measured Contrast Scrim for WCAG AA+ Readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#101010]/92 via-[#101010]/65 to-[#101010]/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 via-transparent to-[#101010]/35"
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium tracking-wider text-neutral-300 mb-5">
            <span>{DEALERSHIP_INFO.address.street}</span>
            <span className="mx-2 text-neutral-500" aria-hidden="true">
              ·
            </span>
            <span>Vancouver, BC</span>
          </p>

          <h1 className="font-display text-white font-extrabold tracking-tight leading-[1.06] text-[clamp(2.25rem,4.5vw,4rem)] text-balance mb-6">
            THE DRIVE IS BACK IN VANCOUVER.
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl mb-10">
            Discover the Mitsubishi lineup at Vancouver Mitsubishi. Explore a huge selection of
            vehicles and experience a dealership that puts you first.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleExplore('New Vehicles')}
              className="inline-flex items-center justify-center gap-2.5 bg-[#E60012] hover:bg-[#C2000F] text-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>EXPLORE NEW VEHICLES</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleExplore('Pre-Owned Vehicles')}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/45 hover:border-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>BROWSE PRE-OWNED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        type="button"
        onClick={handleScrollDown}
        aria-label="Scroll to vehicle inventory"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:inline-flex flex-col items-center gap-1.5 text-white/75 hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white p-2"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase">Explore Lineup</span>
        <ArrowDown className="w-4 h-4" aria-hidden="true" />
      </button>
    </section>
  );
}
