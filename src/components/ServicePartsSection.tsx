import { CalendarCheck, Disc, Mail, Package, Phone, Settings, Sparkles, Wrench } from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership.ts';

interface ServicePartsSectionProps {
  onBookService: (defaultServiceType?: string) => void;
  onContactServiceTeam: (department?: 'Service' | 'Parts') => void;
}

const SERVICE_OFFERINGS = [
  {
    title: 'Schedule a Service Appointment',
    description:
      'Request an appointment window online or directly with our Mitsubishi Service desk on Clark Drive.',
    icon: CalendarCheck,
    actionType: 'book' as const,
    preset: 'Routine Maintenance',
  },
  {
    title: 'Genuine Mitsubishi Parts',
    description:
      'Factory-engineered replacement components designed specifically for your Mitsubishi vehicle.',
    icon: Settings,
    actionType: 'parts' as const,
    preset: 'Genuine Mitsubishi Parts Inquiry',
  },
  {
    title: 'Vehicle Maintenance',
    description:
      'Scheduled inspections, fluid checks, brake care, and seasonal diagnostics to protect every kilometre.',
    icon: Wrench,
    actionType: 'book' as const,
    preset: 'Vehicle Maintenance & Inspection',
  },
  {
    title: 'Tire Services',
    description:
      'Seasonal tire changeovers, rotations, balancing, and tire storage inquiries for West Coast conditions.',
    icon: Disc,
    actionType: 'book' as const,
    preset: 'Tire Services & Changeover',
  },
  {
    title: 'Service Specials',
    description:
      'Connect with our service team to check current seasonal maintenance specials available at our facility.',
    icon: Sparkles,
    actionType: 'service' as const,
    preset: 'Service Specials Inquiry',
  },
  {
    title: 'Parts & Accessories',
    description:
      'All-weather cargo liners, roof racks, and OEM accessories tailored to your lifestyle.',
    icon: Package,
    actionType: 'parts' as const,
    preset: 'Parts & Accessories Inquiry',
  },
];

export function ServicePartsSection({
  onBookService,
  onContactServiceTeam,
}: ServicePartsSectionProps) {
  return (
    <section id="service" className="bg-[#101010] text-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Service Header & Dedicated Carson Leung Contact Card */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
              Service &amp; Parts Department
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance leading-[1.1]">
              KEEP YOUR MITSUBISHI RUNNING AT ITS BEST.
            </h2>
            <p className="mt-4 text-base text-neutral-300 leading-relaxed">
              From routine maintenance to professional vehicle care, our service team is here to
              help you enjoy every kilometre.
            </p>

            {/* Direct Mitsubishi Service Contact Panel */}
            <div className="mt-8 bg-[#202124] border border-white/15 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider text-[#E60012]">
                {DEALERSHIP_INFO.serviceContact.departmentName}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Contact: {DEALERSHIP_INFO.serviceContact.contactName}
              </h3>
              <p className="mt-1 text-sm text-neutral-300">
                {DEALERSHIP_INFO.address.full}
              </p>

              <div className="mt-6 space-y-3 pt-5 border-t border-white/10">
                <a
                  href={DEALERSHIP_INFO.serviceContact.phoneHref}
                  className="flex items-center gap-3 text-base font-semibold text-white hover:text-[#E60012] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#E60012] shrink-0" aria-hidden="true" />
                  <span>{DEALERSHIP_INFO.serviceContact.phoneDisplay}</span>
                </a>

                <a
                  href={DEALERSHIP_INFO.serviceContact.emailHref}
                  className="flex items-center gap-3 text-sm sm:text-base font-medium text-neutral-200 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#E60012] shrink-0" aria-hidden="true" />
                  <span>{DEALERSHIP_INFO.serviceContact.email}</span>
                </a>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onBookService('Routine Maintenance')}
                  className="w-full inline-flex items-center justify-center bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold tracking-wider px-6 py-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  BOOK A SERVICE APPOINTMENT
                </button>
                <button
                  type="button"
                  onClick={() => onContactServiceTeam('Service')}
                  className="w-full inline-flex items-center justify-center border border-white/35 hover:border-white text-white text-xs font-semibold tracking-wider px-6 py-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  CONTACT OUR SERVICE TEAM
                </button>
              </div>
            </div>
          </div>

          {/* Right: 6 Interactive Service & Parts Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {SERVICE_OFFERINGS.map((offering) => {
              const Icon = offering.icon;
              return (
                <button
                  key={offering.title}
                  type="button"
                  onClick={() => {
                    if (offering.actionType === 'book') {
                      onBookService(offering.preset);
                    } else if (offering.actionType === 'parts') {
                      onContactServiceTeam('Parts');
                    } else {
                      onContactServiceTeam('Service');
                    }
                  }}
                  className="group text-left bg-[#1A1B1E] hover:bg-[#202124] border border-white/10 hover:border-white/30 p-6 transition-colors flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012]"
                >
                  <div>
                    <Icon className="w-5 h-5 text-[#E60012] mb-4" aria-hidden="true" />
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-white">
                      {offering.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                  <span className="mt-5 inline-block text-xs font-semibold text-[#E60012] group-hover:underline underline-offset-4">
                    {offering.actionType === 'book'
                      ? 'Schedule Now'
                      : offering.actionType === 'parts'
                      ? 'Inquire with Parts'
                      : 'Ask Service Team'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
