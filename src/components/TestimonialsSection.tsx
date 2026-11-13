import { useEffect, useState } from 'react';
import { ExternalLink, Quote } from 'lucide-react';
import { DEALERSHIP_INFO, PLACEHOLDER_REVIEWS } from '../data/dealership.ts';
import type { ReviewFeedItem, ReviewsResponse } from '../types/dealership.ts';

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewFeedItem[]>(PLACEHOLDER_REVIEWS);
  const [googleUrl, setGoogleUrl] = useState<string>(DEALERSHIP_INFO.googleReviewsUrl);

  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ReviewsResponse | null) => {
        if (active && data?.items?.length) {
          setReviews(data.items);
          if (data.googleReviewsUrl) {
            setGoogleUrl(data.googleReviewsUrl);
          }
        }
      })
      .catch(() => {
        // Keep structured placeholder reviews
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-[#F4F4F4] py-20 lg:py-28 border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#E60012] mb-3">
              Customer Experience
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010] text-balance">
              DRIVEN BY CUSTOMER EXPERIENCE.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#202124]">
              Review cards below are clearly designated placeholder slots ready for our verified
              Google Reviews integration—no synthetic ratings or fabricated customer quotes are
              displayed.
            </p>
          </div>

          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2.5 bg-[#101010] hover:bg-[#E60012] text-white text-xs font-semibold tracking-wider px-6 py-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E60012]"
          >
            <span>READ OUR GOOGLE REVIEWS</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="bg-white border border-neutral-200 p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <Quote className="w-6 h-6 text-[#E60012]" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-neutral-500">
                    {review.label}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#202124] leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <footer className="mt-6 pt-4 border-t border-neutral-200 text-xs font-semibold text-[#101010]">
                {review.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
