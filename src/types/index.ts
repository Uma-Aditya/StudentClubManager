// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  academicYear?: number;
  phone?: string;
  bio?: string;
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  isVerified: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  CLUB_LEADER = 'club_leader',
  CLUB_VICE_LEADER = 'club_vice_leader',
  MEMBER = 'member',
  GUEST = 'guest'
}

// Club Types
export interface Club {
  id: string;
  name: string;
  description: string;
  category: ClubCategory;
  status: ClubStatus;
  logo?: string;
  coverImage?: string;
  leaderId: string;
  viceLeaderId?: string;
  memberCount: number;
  maxMembers?: number;
  meetingFrequency: MeetingFrequency;
  meetingLocation?: string;
  meetingTime?: string;
  tags: string[];
  socialLinks?: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  joiningRequirements?: string[];
  annualFee?: number;
  contactEmail?: string;
  contactPhone?: string;
}

export enum ClubCategory {
  ACADEMIC = 'academic',
  CULTURAL = 'cultural',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology',
  ARTS = 'arts',
  BUSINESS = 'business',
  ENVIRONMENTAL = 'environmental',
  POLITICAL = 'political',
  RELIGIOUS = 'religious',
  OTHER = 'other'
}

export enum ClubStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived'
}

export enum MeetingFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMESTERLY = 'semesterly',
  YEARLY = 'yearly',
  ON_DEMAND = 'on_demand'
}

export interface SocialLinks {
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  discord?: string;
  slack?: string;
}

// Membership Types
export interface Membership {
  id: string;
  userId: string;
  clubId: string;
  role: MembershipRole;
  status: MembershipStatus;
  joinedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  rejectedAt?: Date;
  rejectedBy?: string;
  rejectionReason?: string;
  isActive: boolean;
  lastActivityAt?: Date;
  contributionScore?: number;
  attendanceCount?: number;
}

export enum MembershipRole {
  LEADER = 'leader',
  VICE_LEADER = 'vice_leader',
  OFFICER = 'officer',
  COMMITTEE_MEMBER = 'committee_member',
  MEMBER = 'member'
}

export enum MembershipStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
  LEFT = 'left'
}

// Event Types
export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location: string;
  maxAttendees?: number;
  currentAttendees: number;
  isPublic: boolean;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  coverImage?: string;
  tags: string[];
  budget?: number;
  status: EventStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  MEETING = 'meeting',
  WORKSHOP = 'workshop',
  COMPETITION = 'competition',
  SOCIAL = 'social',
  FUNDRAISER = 'fundraiser',
  CONFERENCE = 'conference',
  TRIP = 'trip',
  OTHER = 'other'
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  endAfterOccurrences?: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
}

// Event Attendance
export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  status: AttendanceStatus;
  registeredAt: Date;
  attendedAt?: Date;
  guestCount?: number;
  notes?: string;
}

export enum AttendanceStatus {
  REGISTERED = 'registered',
  ATTENDED = 'attended',
  NO_SHOW = 'no_show',
  CANCELLED = 'cancelled'
}

// Announcement Types
export interface Announcement {
  id: string;
  clubId: string;
  title: string;
  content: string;
  type: AnnouncementType;
  priority: AnnouncementPriority;
  isPublished: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  readBy: string[];
}

export enum AnnouncementType {
  GENERAL = 'general',
  EVENT = 'event',
  IMPORTANT = 'important',
  URGENT = 'urgent',
  NEWS = 'news'
}

export enum AnnouncementPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  points: number;
  icon: string;
  rarity: AchievementRarity;
  requirements: AchievementRequirement[];
  isActive: boolean;
  createdAt: Date;
}

export enum AchievementCategory {
  PARTICIPATION = 'participation',
  LEADERSHIP = 'leadership',
  CREATIVITY = 'creativity',
  SERVICE = 'service',
  EXCELLENCE = 'excellence',
  MILESTONE = 'milestone'
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface AchievementRequirement {
  type: 'attendance' | 'contribution' | 'time' | 'custom';
  value: number;
  description: string;
}

// User Achievement
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: Date;
  progress?: number;
  isCompleted: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  priority: NotificationPriority;
}

export enum NotificationType {
  MEMBERSHIP_APPROVED = 'membership_approved',
  MEMBERSHIP_REJECTED = 'membership_rejected',
  EVENT_REMINDER = 'event_reminder',
  EVENT_CANCELLED = 'event_cancelled',
  ANNOUNCEMENT = 'announcement',
  ACHIEVEMENT_EARNED = 'achievement_earned',
  SYSTEM_UPDATE = 'system_update'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
  role: UserRole;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  department?: string;
  academicYear?: number;
  interests?: string[];
  termsAccepted: boolean;
}

export interface ClubApplicationForm {
  clubId: string;
  motivation: string;
  experience?: string;
  timeCommitment: string;
  references?: string[];
  documents?: File[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter Types
export interface ClubFilters {
  category?: ClubCategory[];
  status?: ClubStatus[];
  search?: string;
  tags?: string[];
  maxMembers?: number;
  meetingFrequency?: MeetingFrequency[];
}

export interface EventFilters {
  clubId?: string;
  type?: EventType[];
  status?: EventStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
  tags?: string[];
}

export interface MemberFilters {
  clubId?: string;
  role?: MembershipRole[];
  status?: MembershipStatus[];
  search?: string;
  department?: string[];
  academicYear?: number[];
}

// Dashboard Types
export interface DashboardStats {
  totalClubs: number;
  totalMembers: number;
  activeEvents: number;
  pendingApplications: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'membership' | 'event' | 'announcement' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  userId?: string;
  clubId?: string;
  metadata?: Record<string, any>;
}

// Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  privacyLevel: 'public' | 'club_members' | 'private';
  createdAt: Date;
  updatedAt: Date;
}

// Search Types
export interface SearchResult {
  type: 'club' | 'user' | 'event' | 'announcement';
  id: string;
  title: string;
  description: string;
  relevance: number;
  metadata?: Record<string, any>;
}

// Export Types
export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  fields: string[];
  filters?: Record<string, any>;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
