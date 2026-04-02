import { supabase } from '@/lib/supabase';
import type {
  User,
  Organization,
  UserOrganization,
  ApiCredential,
  Contact,
  SyncJob,
  GoogleSheetsConfig,
  RevenueRecord
} from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Organizations
export async function getAllOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch organizations: ${error.message}`);
  return data || [];
}

export async function getOrganizationById(id: string): Promise<Organization | null> {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch organization: ${error.message}`);
  return data;
}

export async function createOrganization(org: Omit<Organization, 'id' | 'created_at'>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .insert(org)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create organization: ${error.message}`);
  return data;
}

export async function updateOrganization(id: string, updates: Partial<Omit<Organization, 'id' | 'created_at'>>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update organization: ${error.message}`);
  return data;
}

export async function deleteOrganization(id: string): Promise<void> {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete organization: ${error.message}`);
}

// Contacts
export async function getAllContacts(organizationId: string): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch contacts: ${error.message}`);
  return data || [];
}

export async function getContactById(id: string): Promise<Contact | null> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch contact: ${error.message}`);
  return data;
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create contact: ${error.message}`);
  return data;
}

export async function updateContact(id: string, updates: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update contact: ${error.message}`);
  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete contact: ${error.message}`);
}

// Sync Jobs
export async function getAllSyncJobs(organizationId: string): Promise<SyncJob[]> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch sync jobs: ${error.message}`);
  return data || [];
}

export async function getSyncJobById(id: string): Promise<SyncJob | null> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync job: ${error.message}`);
  return data;
}

export async function createSyncJob(job: Omit<SyncJob, 'id' | 'created_at'>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .insert(job)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create sync job: ${error.message}`);
  return data;
}

export async function updateSyncJob(id: string, updates: Partial<Omit<SyncJob, 'id' | 'created_at'>>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update sync job: ${error.message}`);
  return data;
}

// Revenue Records
export async function getAllRevenueRecords(organizationId: string): Promise<RevenueRecord[]> {
  const { data, error } = await supabase
    .from('revenue_records')
    .select('*')
    .eq('organization_id', organizationId)
    .order('transaction_date', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch revenue records: ${error.message}`);
  return data || [];
}

export async function getRevenueRecordById(id: string): Promise<RevenueRecord | null> {
  const { data, error } = await supabase
    .from('revenue_records')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch revenue record: ${error.message}`);
  return data;
}

export async function createRevenueRecord(record: Omit<RevenueRecord, 'id' | 'created_at'>): Promise<RevenueRecord> {
  const { data, error } = await supabase
    .from('revenue_records')
    .insert(record)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create revenue record: ${error.message}`);
  return data;
}

// Google Sheets Configs
export async function getAllGoogleSheetsConfigs(organizationId: string): Promise<GoogleSheetsConfig[]> {
  const { data, error } = await supabase
    .from('google_sheets_configs')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch Google Sheets configs: ${error.message}`);
  return data || [];
}

export async function createGoogleSheetsConfig(config: Omit<GoogleSheetsConfig, 'id' | 'created_at' | 'updated_at'>): Promise<GoogleSheetsConfig> {
  const { data, error } = await supabase
    .from('google_sheets_configs')
    .insert(config)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create Google Sheets config: ${error.message}`);
  return data;
}

export async function updateGoogleSheetsConfig(id: string, updates: Partial<Omit<GoogleSheetsConfig, 'id' | 'created_at' | 'updated_at'>>): Promise<GoogleSheetsConfig> {
  const { data, error } = await supabase
    .from('google_sheets_configs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update Google Sheets config: ${error.message}`);
  return data;
}