export type FundingType = 'fully' | 'partially';
export type LocationType = 'inside' | 'outside';
export type AcademicLevel = 'ثانوي' | 'ليسانس (L3)' | 'ماستر (M1/M2)' | 'دكتوراه' | 'باحث أو خريج';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  wilaya: string;
  academicLevel: AcademicLevel;
  fieldOfStudy: string;
  memberId: string;
  isPremium: boolean;
  registrationDate: string;
  savedOpportunityIds: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  university: string;
  country: string;
  countryFlag: string;
  fundingType: FundingType;
  degreeLevels: string[];
  fields: string[];
  deadline: string;
  coverage: string[];
  description: string;
  eligibility: string[];
  requiredDocuments: string[];
  officialUrl: string;
  badgeText?: string;
}

export interface Volunteering {
  id: string;
  title: string;
  organization: string;
  locationType: LocationType;
  location: string;
  countryFlag: string;
  duration: string;
  category: string;
  coverage: string[];
  description: string;
  benefits: string[];
  requirements: string[];
  deadline: string;
  officialUrl: string;
}

export interface TipGuide {
  id: string;
  category: 'motivation_letter' | 'cv_europass' | 'recommendation' | 'languages' | 'translation_legalization' | 'visa_dz';
  categoryTitle: string;
  title: string;
  readTime: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
  }[];
  sampleTemplate?: string;
  downloadsNote?: string;
}

export interface PaymentInfo {
  ccpNumber: string;
  ccpCle: string;
  ripNumber: string;
  accountHolder: string;
  baridimobPhone: string;
}

export interface PaymentReceipt {
  id: string;
  senderName: string;
  senderPhone: string;
  ccpOrBaridimobNumber: string;
  transactionRef: string;
  amountDzd: number;
  serviceSelected: string;
  receiptDate: string;
  status: 'confirmed' | 'pending';
  receiptImageName?: string;
}

export interface DiscussionReply {
  id: string;
  authorName: string;
  authorWilaya?: string;
  authorLevel?: string;
  isOfficial?: boolean;
  content: string;
  createdAt: string;
  likes: number;
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  category: 'scholarships' | 'volunteering' | 'visa' | 'general';
  authorName: string;
  authorWilaya?: string;
  authorLevel?: string;
  createdAt: string;
  likes: number;
  replies: DiscussionReply[];
}

export interface AppNotification {
  id: string;
  type: 'reply' | 'system_update' | 'legal_warning';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  targetPostId?: string;
}
