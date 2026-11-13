export type VehicleCategory =
  | 'New Vehicles'
  | 'Pre-Owned Vehicles'
  | 'Certified Pre-Owned';

export type MitsubishiModelName =
  | 'Outlander'
  | 'Outlander PHEV'
  | 'Eclipse Cross'
  | 'RVR'
  | 'Mirage';

export interface InventoryItem {
  id: string;
  model: MitsubishiModelName;
  title: string;
  category: VehicleCategory;
  bodyStyle: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  imageUrl: string;
  imageAlt: string;
  officialLineupNote: string;
  isDemonstration: boolean;
}

export interface ReviewFeedItem {
  id: string;
  isPlaceholder: boolean;
  label: string;
  quote: string;
  attribution: string;
}

export interface ReviewsResponse {
  connected: boolean;
  isPlaceholder: boolean;
  googleReviewsUrl: string;
  items: ReviewFeedItem[];
}

export type InquiryDepartment = 'Sales' | 'Service' | 'Parts';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone: string;
  department: InquiryDepartment;
  subject: string;
  message: string;
}

export interface ServiceAppointmentPayload {
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  serviceType: string;
  preferredDate: string;
  notes: string;
}

export type QuoteInquiryType =
  | 'Vehicle Quote'
  | 'Test Drive'
  | 'Current Offers'
  | 'Financing Pre-Approval'
  | 'Trade-In Valuation';

export interface QuoteRequestPayload {
  name: string;
  email: string;
  phone: string;
  modelName: string;
  category: string;
  inquiryType: QuoteInquiryType;
  notes: string;
}

export interface SubmissionSuccessResponse {
  success: boolean;
  referenceId: string;
  submittedAt: string;
  message: string;
}
