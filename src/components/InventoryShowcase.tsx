import { useEffect, useState } from 'react';
import { ArrowUpRight, CarFront, Info, RotateCcw, Search } from 'lucide-react';
import { DEMONSTRATION_INVENTORY } from '../data/dealership.ts';
import type {
  InventoryItem,
  MitsubishiModelName,
  VehicleCategory,
} from '../types/dealership.ts';

interface InventoryShowcaseProps {
  selectedCategory: 'All Vehicles' | VehicleCategory;
  onSelectCategory: (category: 'All Vehicles' | VehicleCategory) => void;
  selectedModel: 'All Models' | MitsubishiModelName;
  onSelectModel: (model: 'All Models' | MitsubishiModelName) => void;
  onViewDetails: (item: InventoryItem) => void;
  onRequestQuote: (item: InventoryItem) => void;
  onOpenOffersInquiry: () => void;
}

const CATEGORIES: Array<'All Vehicles' | VehicleCategory> = [
  'All Vehicles',
  'New Vehicles',
  'Pre-Owned Vehicles',
  'Certified Pre-Owned',
];

const MODELS: Array<'All Models' | MitsubishiModelName> = [
  'All Models',
  'Outlander',
  'Outlander PHEV',
  'Eclipse Cross',
  'RVR',
  'Mirage',
];

export function InventoryShowcase({
  selectedCategory,
  onSelectCategory,
  selectedModel,
  onSelectModel,
  onViewDetails,
  onRequestQuote,
  onOpenOffersInquiry,
}: InventoryShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<InventoryItem[]>(DEMONSTRATION_INVENTORY);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All Vehicles') params.set('category', selectedCategory);
        if (selectedModel !== 'All Models') params.set('model', selectedModel);
        if (searchQuery.trim()) params.set('q', searchQuery.trim());

        const response = await fetch(`/api/inventory?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to load dealership showcase feed.');
        }
        const data = (await response.json()) as { items: InventoryItem[] };
        setItems(data.items);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setErrorMessage('Could not refresh inventory feed. Showing local showcase lineup.');
          const fallback = DEMONSTRATION_INVENTORY.filter((item) => {
            const matchesCategory =
              selectedCategory === 'All Vehicles' || item.category === selectedCategory;
            const matchesModel = selectedModel === 'All Models' || item.model === selectedModel;
            const q = searchQuery.trim().toLowerCase();
            const matchesQuery =
              !q ||
              item.title.toLowerCase().includes(q) ||
              item.bodyStyle.toLowerCase().includes(q) ||
              item.shortDescription.toLowerCase().includes(q);
            return matchesCategory && matchesModel && matchesQuery;
          });
          setItems(fallback);
        }
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [selectedCategory, selectedModel, searchQuery]);

  const handleResetFilters = () => {
    onSelectCategory('All Vehicles');
    onSelectModel('All Models');
    setSearchQuery('');
  };

  return (
    <section id="inventory" className="bg-white py-20 lg:py-28 border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Offers Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-2">
              Vancouver Mitsubishi Lineup &amp; Showroom Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance">
              FIND YOUR NEXT MITSUBISHI
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#202124]">
              Explore a lineup designed for every journey.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenOffersInquiry}
            className="self-start lg:self-auto inline-flex items-center gap-2 border border-[#101010] hover:bg-[#101010] hover:text-white text-[#101010] text-xs font-semibold tracking-wider px-5 py-3 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012]"
          >
            <span>Inquire About Current Offers</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Transparent Demonstration Data Notice */}
        <div className="mb-8 p-4 sm:p-5 bg-[#F4F4F4] border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#E60012] mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
              <strong className="font-semibold text-[#101010]">Demonstration Showcase:</strong>{' '}
              Entries below preview the Mitsubishi model lineup and are structured to connect to the
              dealership&apos;s live inventory feed. Current model years, pricing, and trim
              availability are confirmed directly by our sales advisors.
            </p>
          </div>
          <span className="text-xs font-medium text-neutral-600 tabular-nums whitespace-nowrap shrink-0">
            {items.length} {items.length === 1 ? 'entry' : 'entries'} shown
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-4 mb-10 pb-8 border-b border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Segmented Tabs */}
            <div
              role="tablist"
              aria-label="Vehicle inventory categories"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F4F4] border border-neutral-200"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectCategory(category)}
                    className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012] ${
                      active
                        ? 'bg-[#101010] text-white'
                        : 'text-[#202124] hover:text-[#101010] hover:bg-white/70'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Field */}
            <div className="relative w-full lg:w-80">
              <Search
                className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="inventory-search" className="sr-only">
                Search Mitsubishi models or categories
              </label>
              <input
                id="inventory-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Outlander, PHEV, SUV..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-300 text-[#101010] placeholder:text-neutral-500 focus:outline-none focus:border-[#101010]"
              />
            </div>
          </div>

          {/* Model Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 mr-1">Model:</span>
            {MODELS.map((model) => {
              const active = selectedModel === model;
              return (
                <button
                  key={model}
                  type="button"
                  onClick={() => onSelectModel(model)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012] ${
                    active
                      ? 'border-[#E60012] bg-[#E60012] text-white'
                      : 'border-neutral-300 bg-white text-[#202124] hover:border-[#101010]'
                  }`}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>

        {/* Non-blocking API Notice */}
        {errorMessage && (
          <div className="mb-6 p-3 border border-neutral-300 bg-[#F4F4F4] text-xs text-[#202124]">
            {errorMessage}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-[#F4F4F4] border border-neutral-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-neutral-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-32 bg-neutral-200" />
                  <div className="h-5 w-48 bg-neutral-300" />
                  <div className="h-10 w-full bg-neutral-200" />
                  <div className="h-10 w-full bg-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-6 text-center bg-[#F4F4F4] border border-neutral-200">
            <CarFront className="w-10 h-10 text-neutral-400 mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-[#101010]">
              No matching vehicles in the current filter
            </h3>
            <p className="mt-2 text-sm text-[#202124] max-w-md mx-auto">
              Try clearing your filters or contact our Vancouver Mitsubishi advisors to inquire about
              specific incoming models and pre-owned arrivals.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold px-5 py-3 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          /* Vehicle Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((item) => {
              const imgFailed = Boolean(failedImages[item.id]);
              return (
                <article
                  key={item.id}
                  className="group bg-[#F4F4F4] border border-neutral-200 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    {/* 4:3 Studio Vehicle Photo with Fallback Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                      {!imgFailed ? (
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex flex-col items-center justify-center p-6 text-center">
                          <CarFront
                            className="w-10 h-10 text-neutral-600 mb-2"
                            aria-hidden="true"
                          />
                          <span className="font-display text-sm font-semibold text-[#101010]">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Metadata & Copy */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
                        <span className="font-semibold text-[#E60012]">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.bodyStyle}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#101010] tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-[#202124] leading-relaxed">
                        {item.shortDescription}
                      </p>

                      <p className="mt-3 text-xs text-neutral-500">
                        Demonstration Entry · Contact for Current Pricing &amp; Availability
                      </p>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onViewDetails(item)}
                      className="flex-1 inline-flex items-center justify-center border border-neutral-300 bg-white hover:border-[#101010] text-[#101010] text-xs font-semibold py-3 px-3 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E60012]"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestQuote(item)}
                      className="flex-1 inline-flex items-center justify-center bg-[#E60012] hover:bg-[#C2000F] text-white text-xs font-semibold py-3 px-3 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#101010]"
                    >
                      Request a Quote
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
