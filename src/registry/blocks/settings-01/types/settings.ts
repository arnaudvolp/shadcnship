// =============================================================================
// Settings Types
// =============================================================================

export type SettingsTab = "profile" | "notifications" | "security" | "billing" | "appearance";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  username?: string;
  phone?: string;
  website?: string;
  company?: string;
  location?: string;
}

export interface NotificationPreferences {
  emailMarketing: boolean;
  emailProduct: boolean;
  emailSecurity: boolean;
  pushEnabled: boolean;
  pushMentions: boolean;
  pushComments: boolean;
  pushUpdates: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessions: Session[];
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface BillingInfo {
  plan: "free" | "pro" | "enterprise";
  billingCycle: "monthly" | "yearly";
  nextBillingDate?: string;
  paymentMethod?: {
    type: "card" | "paypal";
    last4?: string;
    brand?: string;
    expiresAt?: string;
  };
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
}

export interface SettingsState {
  profile: UserProfile;
  notifications: NotificationPreferences;
  security: SecuritySettings;
  billing: BillingInfo;
  appearance: AppearanceSettings;
}

export interface SettingsProps {
  defaultTab?: SettingsTab;
  settings?: Partial<SettingsState>;
  onUpdateProfile?: (data: Partial<UserProfile>) => Promise<void>;
  onUpdateNotifications?: (data: Partial<NotificationPreferences>) => Promise<void>;
  onUpdatePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
  onToggle2FA?: (enabled: boolean) => Promise<void>;
  onRevokeSession?: (sessionId: string) => Promise<void>;
  onUpdateAppearance?: (data: Partial<AppearanceSettings>) => Promise<void>;
  className?: string;
}
