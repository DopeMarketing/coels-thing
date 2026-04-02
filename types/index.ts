export interface User {
  id: string;
  email: string;
  role: 'Owner' | 'Analyst' | 'Manager';
  first_name: string | null;
  last_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  hubspot_portal_id: string | null;
  stripe_account_id: string | null;
  created_at: Date;
}

export interface UserOrganization {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  created_at: Date;
}

export interface ApiCredential {
  id: string;
  organization_id: string;
  service: 'hubspot' | 'stripe' | 'google_sheets';
  encrypted_credentials: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Contact {
  id: string;
  organization_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  hubspot_contact_id: string | null;
  stripe_customer_id: string | null;
  email_category: string | null;
  tags: any | null;
  custom_fields: any | null;
  last_synced_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SyncJob {
  id: string;
  organization_id: string;
  service: 'hubspot' | 'stripe' | 'google_sheets';
  job_type: 'import' | 'export' | 'sync';
  status: 'pending' | 'running' | 'completed' | 'failed';
  started_at: Date | null;
  completed_at: Date | null;
  records_processed: number;
  errors: any | null;
  metadata: any | null;
  created_at: Date;
}

export interface GoogleSheetsConfig {
  id: string;
  organization_id: string;
  sheet_id: string;
  sheet_name: string;
  range: string | null;
  field_mappings: any;
  sync_direction: 'import' | 'export' | 'bidirectional';
  auto_sync: boolean;
  sync_frequency: 'hourly' | 'daily' | 'weekly' | null;
  last_synced_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface RevenueRecord {
  id: string;
  organization_id: string;
  contact_id: string;
  stripe_payment_intent_id: string | null;
  stripe_subscription_id: string | null;
  amount_cents: number;
  currency: string;
  transaction_type: 'payment' | 'refund' | 'subscription';
  status: 'succeeded' | 'pending' | 'failed';
  transaction_date: Date;
  metadata: any | null;
  created_at: Date;
}

export type Database = {
  users: User;
  organizations: Organization;
  user_organizations: UserOrganization;
  api_credentials: ApiCredential;
  contacts: Contact;
  sync_jobs: SyncJob;
  google_sheets_configs: GoogleSheetsConfig;
  revenue_records: RevenueRecord;
};