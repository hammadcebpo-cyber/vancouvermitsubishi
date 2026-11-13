import { DEALERSHIP_IMAGES } from '../data/dealership.ts';

interface BenefitItem {
  index: string;
  title: string;
  description: string;
}

const BENEFITS: BenefitItem[] = [
  {
    index: '01.',
    title: 'Huge Vehicle Selection',
    description:
      'Browse new Mitsubishi SUVs alongside carefully inspected pre-owned and certified vehicles tailored to Lower Mainland driving.',
  },
  {
    index: '02.',
    title: 'Customer-Focused Experience',
    description:
      'From your initial visit on Clark Drive to vehicle delivery, our advisors focus on clear communication and zero-pressure guidance.',
  },
  {
    index: '03.',
    title: 'Flexible Financing Options',
    description:
      'Explore personalized finance and trade-in pathways structured with our approved dealership lending partners.',
  },
  {
    index: '04.',
    title: 'Dedicated Service & Parts Department',
    description:
      'Keep your vehicle performing smoothly with routine maintenance, tire services, and genuine Mitsubishi parts and accessories.',
  },
];

export function WhyVancouverMitsubishi() {
  return (
    <section className="bg-[#F4F4F4] py-20 lg:py-28 border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left: Architectural Showroom Photography */}
          <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[540px] overflow-hidden bg-neutral-200 border border-neutral-200">
            <img
              src={DEALERSHIP_IMAGES.showroom}
              alt="Vancouver Mitsubishi contemporary showroom interior with timber ceiling and Pacific Northwest evergreen views"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full lg:h-full object-cover object-center"
            />
          </div>

          {/* Right: Editorial Value Proposition & 4 Numbered Blocks */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
                Why Vancouver Mitsubishi
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance leading-[1.12]">
                MORE THAN A DEALERSHIP. YOUR AUTOMOTIVE PARTNER.
              </h2>
              <p className="mt-4 text-base text-[#202124] leading-relaxed max-w-xl">
                Bringing Mitsubishi back to the Vancouver area with a complete ownership
                experience—built around selection, transparency, and ongoing care.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-neutral-300">
              {BENEFITS.map((benefit) => (
                <div key={benefit.index} className="bg-white p-6 border border-neutral-200">
                  <span className="font-display text-xs font-bold text-[#E60012] tracking-wider">
                    {benefit.index}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#101010]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#202124] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
