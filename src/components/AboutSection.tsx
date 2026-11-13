import { ArrowRight } from 'lucide-react';
import { DEALERSHIP_IMAGES, DEALERSHIP_INFO } from '../data/dealership.ts';

interface AboutSectionProps {
  onGetToKnowUs: () => void;
}

export function AboutSection({ onGetToKnowUs }: AboutSectionProps) {
  return (
    <section id="about" className="bg-white py-20 lg:py-28 border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Story Copy */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
              About Vancouver Mitsubishi
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance leading-[1.1]">
              PROUD TO BRING MITSUBISHI BACK TO VANCOUVER.
            </h2>

            <div className="mt-6 space-y-4 text-base text-[#202124] leading-relaxed">
              <p>
                Vancouver Mitsubishi is proud to restore a dedicated Mitsubishi dealership presence
                in the heart of Vancouver at {DEALERSHIP_INFO.address.street}. Built for drivers
                across Vancouver and the surrounding Lower Mainland communities, our focus is
                simple: pair a strong selection of new and pre-owned vehicles with attentive,
                transparent service.
              </p>
              <p>
                Whether you are comparing plug-in hybrid SUVs for daily urban commuting, exploring
                capable all-wheel drive crossovers for British Columbia mountain highways, or
                maintaining your current Mitsubishi with genuine factory parts, our team is ready to
                welcome you.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-6">
              <div>
                <span className="block text-xs text-neutral-500">Dealership Location</span>
                <span className="mt-0.5 block text-sm font-semibold text-[#101010]">
                  1885 Clark Drive, Vancouver, BC
                </span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500">Service Direct</span>
                <a
                  href={DEALERSHIP_INFO.serviceContact.phoneHref}
                  className="mt-0.5 block text-sm font-semibold text-[#101010] hover:text-[#E60012] tabular-nums"
                >
                  {DEALERSHIP_INFO.serviceContact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onGetToKnowUs}
                className="inline-flex items-center gap-2.5 bg-[#101010] hover:bg-[#E60012] text-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-4 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012]"
              >
                <span>GET TO KNOW US</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Dealership Showroom Image */}
          <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden bg-neutral-200 border border-neutral-200">
            <img
              src={DEALERSHIP_IMAGES.showroom}
              alt="Vancouver Mitsubishi architectural dealership showroom with modern SUV display"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
