import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import type { QuoteInquiryType } from '../types/dealership.ts';

interface FinancingSectionProps {
  onOpenFinancingModal: (inquiryType: QuoteInquiryType, presetNotes?: string) => void;
}

const LOAN_TERMS = [36, 48, 60, 72, 84] as const;

export function FinancingSection({ onOpenFinancingModal }: FinancingSectionProps) {
  const [vehiclePrice, setVehiclePrice] = useState<number>(38000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(5.99);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);

  const calculation = useMemo(() => {
    const safePrice = Math.max(0, vehiclePrice);
    const safeDown = Math.min(safePrice, Math.max(0, downPayment));
    const principal = Math.max(0, safePrice - safeDown);
    const monthlyRate = Math.max(0, interestRate) / 100 / 12;

    if (principal === 0) {
      return {
        principal: 0,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPaid: 0,
      };
    }

    if (monthlyRate === 0) {
      const monthlyPayment = principal / loanTermMonths;
      return {
        principal,
        monthlyPayment,
        totalInterest: 0,
        totalPaid: principal,
      };
    }

    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    const monthlyPayment = (principal * (monthlyRate * factor)) / (factor - 1);
    const totalPaid = monthlyPayment * loanTermMonths;
    const totalInterest = Math.max(0, totalPaid - principal);

    return {
      principal,
      monthlyPayment,
      totalInterest,
      totalPaid,
    };
  }, [vehiclePrice, downPayment, interestRate, loanTermMonths]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(amount);

  const formatMonthly = (amount: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const financingActions: Array<{
    title: string;
    description: string;
    icon: typeof FileText;
    inquiryType: QuoteInquiryType;
    cta: string;
  }> = [
    {
      title: 'Explore Financing',
      description:
        'Discuss flexible lease and finance structures tailored to your driving habits and budget.',
      icon: FileText,
      inquiryType: 'Financing Pre-Approval',
      cta: 'Review Options',
    },
    {
      title: 'Get Pre-Approved',
      description:
        'Submit a secure inquiry to start pre-approval through Vancouver Mitsubishi’s approved lending partners.',
      icon: CheckCircle2,
      inquiryType: 'Financing Pre-Approval',
      cta: 'Start Pre-Approval',
    },
    {
      title: 'Value Your Trade-In',
      description:
        'Share your current vehicle details with our appraisal team to put its value toward your next Mitsubishi.',
      icon: RefreshCw,
      inquiryType: 'Trade-In Valuation',
      cta: 'Request Appraisal',
    },
  ];

  const handleExploreFinancingOptions = () => {
    const estimateSummary = `Illustrative estimator settings: Vehicle Price ${formatCurrency(
      vehiclePrice
    )}, Down Payment ${formatCurrency(
      downPayment
    )}, Rate ${interestRate.toFixed(2)}%, Term ${loanTermMonths} months (Est. ${formatMonthly(
      calculation.monthlyPayment
    )}/mo).`;
    onOpenFinancingModal('Financing Pre-Approval', estimateSummary);
  };

  return (
    <section id="financing" className="bg-white py-20 lg:py-28 border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Financing & Trade-In Pathways */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
              Financing &amp; Trade-In
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance leading-[1.1]">
              YOUR NEXT VEHICLE. YOUR WAY.
            </h2>
            <p className="mt-4 text-base text-[#202124] leading-relaxed">
              Plan comfortably before stepping into the showroom. Estimate monthly payments below,
              request a trade-in evaluation, or connect directly with our approved dealership
              financing specialists.
            </p>

            <div className="mt-8 space-y-4">
              {financingActions.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 bg-[#F4F4F4] border border-neutral-200 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <Icon
                        className="w-5 h-5 text-[#E60012] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-base font-bold text-[#101010]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#202124] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenFinancingModal(item.inquiryType)}
                      className="text-xs font-semibold text-[#E60012] hover:text-[#101010] whitespace-nowrap shrink-0 mt-1 cursor-pointer underline underline-offset-4"
                    >
                      {item.cta}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleExploreFinancingOptions}
                className="inline-flex items-center justify-center gap-2.5 bg-[#E60012] hover:bg-[#C2000F] text-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-4 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#101010]"
              >
                <span>EXPLORE FINANCING OPTIONS</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Payment Estimator */}
          <div className="lg:col-span-7 bg-[#F4F4F4] border border-neutral-200 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-neutral-300">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-[#E60012]" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-[#101010]">
                  Estimate Your Payments
                </h3>
              </div>
              <span className="text-xs font-medium text-neutral-600">
                Illustrative Calculator · CAD
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {/* Vehicle Price */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label
                    htmlFor="est-price-input"
                    className="text-sm font-semibold text-[#101010]"
                  >
                    Vehicle Price (Illustrative)
                  </label>
                  <div className="flex items-center bg-white border border-neutral-300 px-3 py-1.5">
                    <span className="text-xs text-neutral-500 mr-1">$</span>
                    <input
                      id="est-price-input"
                      type="number"
                      min={10000}
                      max={120000}
                      step={500}
                      value={vehiclePrice}
                      onChange={(e) =>
                        setVehiclePrice(Math.min(120000, Math.max(0, Number(e.target.value) || 0)))
                      }
                      className="w-24 text-right text-sm font-semibold text-[#101010] tabular-nums focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  aria-label="Vehicle price slider"
                  type="range"
                  min={15000}
                  max={85000}
                  step={500}
                  value={Math.min(85000, Math.max(15000, vehiclePrice))}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="vm-slider w-full"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label
                    htmlFor="est-down-input"
                    className="text-sm font-semibold text-[#101010]"
                  >
                    Down Payment / Trade-In Equity
                  </label>
                  <div className="flex items-center bg-white border border-neutral-300 px-3 py-1.5">
                    <span className="text-xs text-neutral-500 mr-1">$</span>
                    <input
                      id="est-down-input"
                      type="number"
                      min={0}
                      max={vehiclePrice}
                      step={500}
                      value={downPayment}
                      onChange={(e) =>
                        setDownPayment(
                          Math.min(vehiclePrice, Math.max(0, Number(e.target.value) || 0))
                        )
                      }
                      className="w-24 text-right text-sm font-semibold text-[#101010] tabular-nums focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  aria-label="Down payment slider"
                  type="range"
                  min={0}
                  max={Math.max(1000, vehiclePrice)}
                  step={500}
                  value={Math.min(vehiclePrice, downPayment)}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="vm-slider w-full"
                />
              </div>

              {/* Interest Rate & Loan Term */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label
                      htmlFor="est-rate-input"
                      className="text-sm font-semibold text-[#101010]"
                    >
                      Estimated Interest Rate
                    </label>
                    <div className="flex items-center bg-white border border-neutral-300 px-3 py-1.5">
                      <input
                        id="est-rate-input"
                        type="number"
                        min={0}
                        max={20}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(
                            Math.min(20, Math.max(0, Number(e.target.value) || 0))
                          )
                        }
                        className="w-14 text-right text-sm font-semibold text-[#101010] tabular-nums focus:outline-none"
                      />
                      <span className="text-xs text-neutral-500 ml-1">%</span>
                    </div>
                  </div>
                  <input
                    aria-label="Interest rate slider"
                    type="range"
                    min={0}
                    max={14}
                    step={0.25}
                    value={Math.min(14, interestRate)}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="vm-slider w-full"
                  />
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[#101010] mb-2">
                    Loan Term (Months)
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {LOAN_TERMS.map((term) => {
                      const active = loanTermMonths === term;
                      return (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setLoanTermMonths(term)}
                          className={`py-2 text-xs font-semibold tabular-nums border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#101010] border-[#101010] text-white'
                              : 'bg-white border-neutral-300 text-[#202124] hover:border-[#101010]'
                          }`}
                        >
                          {term}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Summary */}
            <div className="mt-8 bg-[#101010] text-white p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/15">
                <div>
                  <p className="text-xs font-medium text-neutral-400">
                    Estimated Monthly Payment
                  </p>
                  <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                    {formatMonthly(calculation.monthlyPayment)}
                    <span className="text-sm font-medium text-neutral-400 ml-1.5">/ month</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExploreFinancingOptions}
                  className="inline-flex items-center justify-center bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold px-5 py-3 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Apply With This Estimate
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="block text-neutral-400">Amount Financed</span>
                  <span className="mt-0.5 block font-semibold text-white tabular-nums">
                    {formatCurrency(calculation.principal)}
                  </span>
                </div>
                <div>
                  <span className="block text-neutral-400">Estimated Interest</span>
                  <span className="mt-0.5 block font-semibold text-white tabular-nums">
                    {formatCurrency(calculation.totalInterest)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-neutral-400">Term Length</span>
                  <span className="mt-0.5 block font-semibold text-white tabular-nums">
                    {loanTermMonths} Months
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-neutral-600 leading-relaxed">
              <strong>Estimate Disclaimer:</strong> Calculations shown are illustrative estimates
              only and exclude taxes, licensing, documentation, and applicable fees. Actual interest
              rates, terms, and financing approvals are processed exclusively through Vancouver
              Mitsubishi&apos;s approved financing system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
