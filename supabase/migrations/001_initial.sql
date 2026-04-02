BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('Owner', 'Analyst', 'Manager')),
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id),
  hubspot_portal_id TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE api_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  service TEXT NOT NULL CHECK (service IN ('hubspot', 'stripe', 'google_sheets')),
  encrypted_credentials TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  hubspot_contact_id TEXT,
  stripe_customer_id TEXT,
  email_category TEXT,
  tags JSONB,
  custom_fields JSONB,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  service TEXT NOT NULL CHECK (service IN ('hubspot', 'stripe', 'google_sheets')),
  job_type TEXT NOT NULL CHECK (job_type IN ('import', 'export', 'sync')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  records_processed INTEGER NOT NULL DEFAULT 0,
  errors JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE google_sheets_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  sheet_id TEXT NOT NULL,
  sheet_name TEXT NOT NULL,
  range TEXT,
  field_mappings JSONB NOT NULL,
  sync_direction TEXT NOT NULL CHECK (sync_direction IN ('import', 'export', 'bidirectional')),
  auto_sync BOOLEAN NOT NULL DEFAULT FALSE,
  sync_frequency TEXT CHECK (sync_frequency IN ('hourly', 'daily', 'weekly')),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE revenue_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  contact_id UUID NOT NULL REFERENCES contacts(id),
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('payment', 'refund', 'subscription')),
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed')),
  transaction_date TIMESTAMPTZ NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_organizations_owner_id ON organizations(owner_id);
CREATE INDEX idx_organizations_created_at ON organizations(created_at);

CREATE UNIQUE INDEX idx_user_organizations_user_org ON user_organizations(user_id, organization_id);
CREATE INDEX idx_user_organizations_org_id ON user_organizations(organization_id);
CREATE INDEX idx_user_organizations_created_at ON user_organizations(created_at);

CREATE UNIQUE INDEX idx_api_credentials_org_service ON api_credentials(organization_id, service);
CREATE INDEX idx_api_credentials_service ON api_credentials(service);
CREATE INDEX idx_api_credentials_created_at ON api_credentials(created_at);

CREATE UNIQUE INDEX idx_contacts_org_email ON contacts(organization_id, email);
CREATE INDEX idx_contacts_hubspot_contact_id ON contacts(hubspot_contact_id);
CREATE INDEX idx_contacts_stripe_customer_id ON contacts(stripe_customer_id);
CREATE INDEX idx_contacts_email_category ON contacts(email_category);
CREATE INDEX idx_contacts_tags ON contacts USING GIN(tags);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

CREATE INDEX idx_sync_jobs_org_service ON sync_jobs(organization_id, service);
CREATE INDEX idx_sync_jobs_status ON sync_jobs(status);
CREATE INDEX idx_sync_jobs_created_at ON sync_jobs(created_at);

CREATE INDEX idx_google_sheets_configs_org_id ON google_sheets_configs(organization_id);
CREATE UNIQUE INDEX idx_google_sheets_configs_org_sheet ON google_sheets_configs(organization_id, sheet_id, sheet_name);
CREATE INDEX idx_google_sheets_configs_created_at ON google_sheets_configs(created_at);

CREATE INDEX idx_revenue_records_org_id ON revenue_records(organization_id);
CREATE INDEX idx_revenue_records_contact_id ON revenue_records(contact_id);
CREATE INDEX idx_revenue_records_payment_intent ON revenue_records(stripe_payment_intent_id);
CREATE INDEX idx_revenue_records_transaction_date ON revenue_records(transaction_date);
CREATE INDEX idx_revenue_records_created_at ON revenue_records(created_at);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_sheets_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON organizations FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON user_organizations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON api_credentials FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON contacts FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sync_jobs FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON google_sheets_configs FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON revenue_records FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;