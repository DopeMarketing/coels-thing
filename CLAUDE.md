# Coels Thing — Claude Development Guide

Coels Thing automates CRM workflows by syncing HubSpot contacts with email organization, importing Stripe customer data for revenue tracking, and managing Google Sheets exports through a unified dashboard. Built for busy marketing executives who need automated customer communication workflows without manual data entry.

## Tech Stack
- Next.js 15 (App Router, Server Components)
- Supabase (PostgreSQL + Auth + RLS)
- TypeScript (strict mode)
- Tailwind CSS
- HubSpot API, Stripe API, Google Sheets API
- Vercel deployment

## Project Structure


app/
├── (auth)/              # Public auth routes (/login, /signup, etc.)
├── (dashboard)/         # Protected routes (/dashboard, /contacts, etc.)
├── api/                 # API routes and webhooks
│   ├── sync/           # Integration sync endpoints
│   └── webhooks/       # External webhook handlers
components/
├── ui/                  # Reusable UI primitives (buttons, forms, etc.)
├── dashboard/           # Dashboard-specific components
└── integrations/        # Integration setup and status components
lib/
├── integrations/        # API clients for HubSpot, Stripe, Google Sheets
├── auth/               # Authentication helpers
├── validations/        # Zod schemas for form/API validation
└── utils/              # General utilities
db/
├── queries/            # Database query functions (SELECT only)
├── mutations/          # Database mutation functions (INSERT/UPDATE/DELETE)
└── types/              # Database-generated TypeScript types
actions/                 # Server actions for form submissions and user interactions
types/                   # Global TypeScript type definitions
supabase/
├── migrations/         # SQL migration files
└── config/             # Supabase configuration


## Coding Conventions

### TypeScript
- Strict mode enabled - handle all null/undefined cases
- Export types and interfaces from dedicated files
- Use Zod for runtime validation
- Generate database types from Supabase schema

### React/Next.js
- Server Components by default - add 'use client' only when needed
- Async Server Components for data fetching
- Server Actions for form submissions
- No useState for data that comes from database

### Data Access
- Database queries ONLY in `/db` directory
- Business logic ONLY in `/lib` and `/actions`
- No database calls in components
- No secrets or API keys in client components

### File Organization
- One component per file
- Co-locate related components in feature folders
- Export default for components, named exports for utilities

## Current State

This is a fresh scaffold with:
- ✅ Complete database schema (10 tables) with RLS policies
- ✅ Authentication system with role-based access (Owner, Analyst, Manager)
- ✅ Route structure for all 19 pages from sitemap
- ✅ Basic UI component library with Tailwind
- ✅ Integration credential management system
- ✅ Supabase configuration and environment setup
- ✅ TypeScript configuration with strict mode
- ⚠️ Route handlers are stubs - need implementation
- ⚠️ Integration APIs are placeholder - need real implementations
- ⚠️ UI components exist but pages are minimal

## What to Build Next (v1 Features)

1. **Automated HubSpot contact sync with email categorization and tagging system**
   - Build HubSpot API client with OAuth flow
   - Implement contact import and sync workflows
   - Create email categorization logic based on contact properties
   - Build tagging system for automatic contact organization

2. **Stripe customer data import with automatic contact creation and revenue tracking in HubSpot**
   - Build Stripe API client and webhook handlers
   - Implement customer data import workflows
   - Create automatic contact creation when Stripe customers don't exist in HubSpot
   - Build revenue tracking system linking Stripe payments to HubSpot contacts

3. **Google Sheets bi-directional sync for contact lists and custom field mapping**
   - Build Google Sheets API client with OAuth flow
   - Implement bi-directional sync workflows
   - Create custom field mapping interface
   - Build contact list export/import functionality

4. **Unified dashboard showing contact activity across HubSpot, Stripe payments, and spreadsheet data**
   - Design and build main dashboard interface
   - Create contact activity aggregation system
   - Implement real-time sync status indicators
   - Build cross-platform contact matching logic

## Never Touch Without Permission

- `.env` files - environment variables require explicit discussion
- Migration files in `supabase/migrations/` - database changes need review
- RLS policies - security implications require careful review
- Authentication configuration - impacts user access and security

## How to Work on This Project

### Before Starting Any Work
1. Read this CLAUDE.md file completely
2. Check TECHNICAL_DEBT.md for known issues
3. Review current ROADMAP.md priorities

### Development Workflow
1. Always run `npm run type-check` before committing
2. Run `npm run build` to verify production build works
3. Commit small, focused changes with conventional commit messages
4. Document any technical debt explicitly in TECHNICAL_DEBT.md
5. Update CHANGELOG.md for user-facing changes

### When Building Features
1. Start with data model and database queries in `/db`
2. Build business logic in `/lib` and server actions in `/actions`
3. Create UI components in `/components`
4. Wire up with Server Components in `/app`
5. Add proper error handling and loading states
6. Test integration flows end-to-end

### Integration Development
- Store all credentials in `api_credentials` table with encryption
- Build OAuth flows for user authorization
- Implement webhook handlers for real-time updates
- Create sync job tracking for background operations
- Handle rate limiting and API errors gracefully

### Common Patterns
- Use Server Actions for all form submissions
- Implement optimistic updates where appropriate
- Create loading and error states for all async operations
- Use Supabase RLS for data security
- Validate all inputs with Zod schemas

Remember: This tool needs to "just work" for a busy executive managing a $10M+ company. Focus on automation, reliability, and speed over complex features.