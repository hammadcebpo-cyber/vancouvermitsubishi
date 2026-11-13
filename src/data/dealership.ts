import type { InventoryItem, ReviewFeedItem } from '../types/dealership.ts';

export const DEALERSHIP_INFO = {
  name: 'Vancouver Mitsubishi',
  officialWebsite: 'https://www.vancouvermitsubishi.com/',
  address: {
    street: '1885 Clark Drive',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V5N 3G5',
    country: 'Canada',
    full: '1885 Clark Drive, Vancouver, BC, V5N 3G5, Canada',
    mapsQueryUrl:
      'https://www.google.com/maps/search/?api=1&query=1885+Clark+Drive+Vancouver+BC+V5N+3G5+Canada',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=1885%20Clark%20Drive,%20Vancouver,%20BC%20V5N%203G5,%20Canada&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  serviceContact: {
    departmentName: 'Mitsubishi Service',
    contactName: 'Carson Leung',
    phoneDisplay: '604-249-3881',
    phoneHref: 'tel:+16042493881',
    email: 'reception@mitsubishiservice.com',
    emailHref: 'mailto:reception@mitsubishiservice.com',
  },
  social: {
    facebook: 'https://www.facebook.com/vancouvermitsubishi.ca',
    instagram: 'https://www.instagram.com/vancouver_mitsubishi/',
    youtube: 'https://www.youtube.com/@vancouvermitsubishi9072',
  },
  googleReviewsUrl:
    'https://www.google.com/search?q=Vancouver+Mitsubishi+1885+Clark+Drive+Vancouver+reviews',
} as const;

export const DEALERSHIP_IMAGES = {
  logo: '/assets/aistudio/mitsubishi_310e00c9.png',
  hero: '/src/assets/images/hero_vancouver_suv_1794603121908.jpg',
  outlander: '/src/assets/images/model_outlander_phev_1794603122238.jpg',
  eclipseCross: '/src/assets/images/model_eclipse_cross_1794603121962.jpg',
  rvr: '/src/assets/images/model_rvr_compact_1794603124002.jpg',
  mirage: '/src/assets/images/model_mirage_hatchback_1794603124090.jpg',
  showroom: '/src/assets/images/showroom_vancouver_clean_1794603143915.jpg',
  experience: '/src/assets/images/experience_coastal_drive_1794603124398.jpg',
} as const;

export const DEMONSTRATION_INVENTORY: InventoryItem[] = [
  {
    id: 'demo-outlander-new',
    model: 'Outlander',
    title: 'Mitsubishi Outlander',
    category: 'New Vehicles',
    bodyStyle: 'Three-Row Family SUV',
    shortDescription:
      'Flagship three-row SUV presence engineered for Vancouver city streets and coastal mountain getaways.',
    overview:
      'Demonstration showcase entry. Contact Vancouver Mitsubishi for live showroom stock, current model year configurations, trim options, and transparent pricing.',
    highlights: [
      'Three-row versatile passenger seating',
      'Available all-wheel control capability',
      'Modern cabin connectivity & driver assistance',
    ],
    imageUrl: DEALERSHIP_IMAGES.outlander,
    imageAlt: 'Mitsubishi Outlander three-row SUV in studio lighting at Vancouver Mitsubishi',
    officialLineupNote: 'Live model year, trims, and availability confirmed by our sales team.',
    isDemonstration: true,
  },
  {
    id: 'demo-outlander-phev-new',
    model: 'Outlander PHEV',
    title: 'Mitsubishi Outlander PHEV',
    category: 'New Vehicles',
    bodyStyle: 'Plug-In Hybrid Electric SUV',
    shortDescription:
      'Dual-motor plug-in hybrid capability combining quiet urban commuting with long-range British Columbia touring.',
    overview:
      'Demonstration showcase entry. Connect with our Vancouver Mitsubishi team to review current Outlander PHEV incoming allocations, charging overview, and personalized quotes.',
    highlights: [
      'Plug-in hybrid electric SUV architecture',
      'Seamless transition between electric and hybrid driving',
      'Designed for daily Metro Vancouver commutes and weekend trips',
    ],
    imageUrl: DEALERSHIP_IMAGES.outlander,
    imageAlt: 'Mitsubishi Outlander PHEV plug-in hybrid SUV at Vancouver Mitsubishi',
    officialLineupNote: 'Live model year, trims, and availability confirmed by our sales team.',
    isDemonstration: true,
  },
  {
    id: 'demo-eclipse-cross-new',
    model: 'Eclipse Cross',
    title: 'Mitsubishi Eclipse Cross',
    category: 'New Vehicles',
    bodyStyle: 'Compact Coupe-Inspired SUV',
    shortDescription:
      'Sculpted athletic proportions and confident all-weather poise tailored for urban and highway driving.',
    overview:
      'Demonstration showcase entry. Reach out to Vancouver Mitsubishi for current Eclipse Cross showroom availability, colour options, and tailored financing inquiries.',
    highlights: [
      'Distinctive sculpted crossover silhouette',
      'Confident all-weather traction for coastal rain and snow',
      'Driver-centric cockpit and smartphone integration',
    ],
    imageUrl: DEALERSHIP_IMAGES.eclipseCross,
    imageAlt: 'Crimson red Mitsubishi Eclipse Cross crossover SUV in studio lighting',
    officialLineupNote: 'Live model year, trims, and availability confirmed by our sales team.',
    isDemonstration: true,
  },
  {
    id: 'demo-rvr-new',
    model: 'RVR',
    title: 'Mitsubishi RVR',
    category: 'New Vehicles',
    bodyStyle: 'Compact Crossover',
    shortDescription:
      'Right-sized versatility with nimble urban manoeuvrability and generous cargo utility for active lifestyles.',
    overview:
      'Demonstration showcase entry. Contact our Clark Drive dealership to check current RVR trims, incoming inventory, and test-drive scheduling.',
    highlights: [
      'Easy urban parking footprint with SUV ride height',
      'Flexible rear cargo space for weekend gear',
      'Available all-wheel control for year-round confidence',
    ],
    imageUrl: DEALERSHIP_IMAGES.rvr,
    imageAlt: 'Metallic grey Mitsubishi RVR compact crossover SUV',
    officialLineupNote: 'Live model year, trims, and availability confirmed by our sales team.',
    isDemonstration: true,
  },
  {
    id: 'demo-outlander-cpo',
    model: 'Outlander',
    title: 'Mitsubishi Outlander (Certified Pre-Owned)',
    category: 'Certified Pre-Owned',
    bodyStyle: 'Pre-Owned Family SUV',
    shortDescription:
      'Carefully inspected pre-owned Outlander options selected for quality, comfort, and dependable value.',
    overview:
      'Demonstration pre-owned entry. Pre-owned vehicle inventory updates continuously; inquire directly with Vancouver Mitsubishi for current VIN-verified stock and vehicle history reports.',
    highlights: [
      'Inspected by our Vancouver Mitsubishi service team',
      'Vehicle history documentation available upon request',
      'Flexible financing terms available',
    ],
    imageUrl: DEALERSHIP_IMAGES.outlander,
    imageAlt: 'Certified Pre-Owned Mitsubishi Outlander SUV at Vancouver Mitsubishi',
    officialLineupNote: 'Pre-owned stock, mileage, and pricing vary by unit—contact us for current arrivals.',
    isDemonstration: true,
  },
  {
    id: 'demo-mirage-preowned',
    model: 'Mirage',
    title: 'Mitsubishi Mirage (Where Applicable)',
    category: 'Pre-Owned Vehicles',
    bodyStyle: 'Compact City Hatchback',
    shortDescription:
      'Efficient, agile compact transportation ideal for city commuting—available based on model year and pre-owned arrivals.',
    overview:
      'Demonstration catalog entry. Mirage availability depends on applicable model years and pre-owned trade-in stock; contact our sales advisors for current compact inventory.',
    highlights: [
      'Compact footprint built for tight Vancouver streets',
      'Practical hatchback versatility',
      'Subject to applicable model year and inventory availability',
    ],
    imageUrl: DEALERSHIP_IMAGES.mirage,
    imageAlt: 'Silver Mitsubishi Mirage compact hatchback in studio',
    officialLineupNote: 'Availability subject to applicable model years and current pre-owned arrivals.',
    isDemonstration: true,
  },
];

export const PLACEHOLDER_REVIEWS: ReviewFeedItem[] = [
  {
    id: 'placeholder-review-1',
    isPlaceholder: true,
    label: 'Placeholder Review · Live Google Feed Pending',
    quote:
      'Verified customer experiences from Vancouver Mitsubishi guests will appear here once our live Google Reviews feed is connected.',
    attribution: 'Placeholder Entry — Sales Experience',
  },
  {
    id: 'placeholder-review-2',
    isPlaceholder: true,
    label: 'Placeholder Review · Live Google Feed Pending',
    quote:
      'Genuine feedback from Lower Mainland drivers regarding vehicle selection, transparent financing, and delivery will populate automatically via the connected review feed.',
    attribution: 'Placeholder Entry — Ownership Experience',
  },
  {
    id: 'placeholder-review-3',
    isPlaceholder: true,
    label: 'Placeholder Review · Live Google Feed Pending',
    quote:
      'Service and maintenance reviews for our Clark Drive Mitsubishi Service team will display here when linked to our verified Google Business Profile.',
    attribution: 'Placeholder Entry — Service & Parts',
  },
];
