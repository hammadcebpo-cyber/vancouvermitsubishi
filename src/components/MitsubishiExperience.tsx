import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { DEALERSHIP_IMAGES } from '../data/dealership.ts';
import type { MitsubishiModelName } from '../types/dealership.ts';

interface ExperiencePillar {
  id: string;
  index: string;
  title: string;
  summary: string;
  details: string[];
  recommendedModel: MitsubishiModelName;
  ctaLabel: string;
}

const EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'family-suvs',
    index: '01',
    title: 'Family SUVs',
    summary:
      'Adaptable passenger space and thoughtful cargo versatility designed for busy Vancouver families and coastal road trips.',
    details: [
      'Flexible seating configurations across the Mitsubishi SUV lineup',
      'Wide-opening cargo access for strollers, sports gear, and luggage',
      'Elevated seating visibility for confident city driving',
    ],
    recommendedModel: 'Outlander',
    ctaLabel: 'Explore Outlander',
  },
  {
    id: 'phev-tech',
    index: '02',
    title: 'Plug-in Hybrid Technology',
    summary:
      'Dual-mode electrified driving that pairs quiet daily electric commutes with hybrid range freedom across British Columbia.',
    details: [
      'Everyday electric capability with seamless gasoline-hybrid support',
      'Regenerative braking tailored for urban stop-and-go routes',
      'Practical charging flexibility at home or public stations',
    ],
    recommendedModel: 'Outlander PHEV',
    ctaLabel: 'Explore Outlander PHEV',
  },
  {
    id: 'awd-capability',
    index: '03',
    title: 'All-Wheel Drive Capability',
    summary:
      'Poised traction engineered for coastal downpours, Sea-to-Sky highway climbs, and winter weekend mountain passes.',
    details: [
      'Available Super All-Wheel Control (S-AWC) across select models',
      'Balanced cornering stability on wet Pacific Northwest pavement',
      'Selectable drive modes for changing road conditions',
    ],
    recommendedModel: 'Eclipse Cross',
    ctaLabel: 'Explore Eclipse Cross',
  },
  {
    id: 'comfort-tech',
    index: '04',
    title: 'Modern Comfort and Technology',
    summary:
      'Clean cabin ergonomics, intuitive smartphone connectivity, and available driver assistance features focused on peace of mind.',
    details: [
      'Clean cockpit layout with accessible climate and media controls',
      'Smartphone integration for navigation, calls, and audio',
      'Available active driver-assistance systems—ask our advisors for trim details',
    ],
    recommendedModel: 'RVR',
    ctaLabel: 'Explore RVR',
  },
];

interface MitsubishiExperienceProps {
  onSelectModelInInventory: (model: MitsubishiModelName) => void;
  onRequestModelInfo: (modelName: string) => void;
}

export function MitsubishiExperience({
  onSelectModelInInventory,
  onRequestModelInfo,
}: MitsubishiExperienceProps) {
  const [activeId, setActiveId] = useState<string>(EXPERIENCE_PILLARS[0].id);
  const activePillar =
    EXPERIENCE_PILLARS.find((item) => item.id === activeId) ?? EXPERIENCE_PILLARS[0];

  const handleJumpToModel = (model: MitsubishiModelName) => {
    onSelectModelInInventory(model);
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="relative bg-[#101010] text-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Headline & Coastal Highway Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12 lg:mb-14">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
              The Mitsubishi Experience
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white text-balance leading-[1.08]">
              BUILT FOR EVERY JOURNEY.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              From everyday city drives to weekend adventures, discover vehicles designed to make
              every journey memorable.
            </p>
          </div>

          <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden bg-[#202124] border border-white/10">
            <img
              src={DEALERSHIP_IMAGES.experience}
              alt="Dark graphite Mitsubishi SUV travelling along the Sea-to-Sky coastal mountain highway in British Columbia"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 via-transparent to-transparent"
            />
            <p className="absolute bottom-4 left-5 right-5 text-xs text-neutral-200 tracking-wide">
              Engineered for British Columbia roads · Confirm trim-specific features with our team
            </p>
          </div>
        </div>

        {/* Interactive Feature Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {EXPERIENCE_PILLARS.map((pillar) => {
            const isActive = pillar.id === activeId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveId(pillar.id)}
                aria-pressed={isActive}
                className={`text-left p-6 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012] ${
                  isActive
                    ? 'bg-[#202124] border-[#E60012]'
                    : 'bg-[#17181A] border-white/10 hover:border-white/30'
                }`}
              >
                <span
                  className={`font-display text-xs font-bold tracking-wider ${
                    isActive ? 'text-[#E60012]' : 'text-neutral-400'
                  }`}
                >
                  {pillar.index}.
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{pillar.title}</h3>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {pillar.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail Panel */}
        <div className="bg-[#202124] border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-display text-xl font-bold text-white">{activePillar.title}</h4>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{activePillar.summary}</p>
            <ul className="mt-4 space-y-2">
              {activePillar.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <Check className="w-4 h-4 text-[#E60012] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleJumpToModel(activePillar.recommendedModel)}
              className="inline-flex items-center justify-center gap-2 bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold tracking-wider px-6 py-3.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{activePillar.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onRequestModelInfo(activePillar.recommendedModel)}
              className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white text-xs font-semibold tracking-wider px-6 py-3.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              Request Verified Model Information
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
