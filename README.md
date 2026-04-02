# Coels Thing

Automate HubSpot contact sync, Stripe revenue tracking, and Google Sheets data management for busy marketing executives.

## What This Project Does

Coels Thing is a CRM workflow automation tool designed for busy marketing executives managing high-volume customer communications. The app automatically syncs HubSpot contacts with email categorization, imports Stripe customer data for revenue tracking, and maintains Google Sheets backups - all accessible through a unified dashboard that eliminates tab-switching and manual data entry.

**Built for:** Personal use by marketing executives and their teams

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Supabase Auth with role-based access
- **Integrations:** HubSpot API, Stripe API, Google Sheets API
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI installed globally (`npm install -g supabase`)
- HubSpot developer account with API access
- Stripe account with API keys
- Google Cloud Console project with Sheets API enabled
- Vercel account (for deployment)

## Local Setup

1. **Clone and install dependencies:**
   bash
   git clone <repository-url>
   cd coels-thing
   npm install
   

2. **Set up environment variables:**
   bash
   cp .env.example .env.local
   
   Fill in all required environment variables (see table below).

3. **Start Supabase:**
   bash
   supabase start
   

4. **Run database migrations:**
   bash
   supabase db reset
   

5. **Start development server:**
   bash
   npm run dev
   

The app will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Yes |
| `HUBSPOT_CLIENT_ID` | HubSpot app client ID | Yes |
| `HUBSPOT_CLIENT_SECRET` | HubSpot app client secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret for JWT signing | Yes |
| `NEXTAUTH_URL` | Full URL of your app (for OAuth redirects) | Yes |

## Database Setup

The database schema includes 10 tables for managing users, organizations, integrations, and sync operations:

- `users` - User accounts with role-based access
- `organizations` - Company/team management
- `user_organizations` - User-to-organization relationships
- `api_credentials` - Encrypted integration credentials
- `contacts` - Unified contact records from all sources
- `sync_jobs` - Background sync operation tracking
- `google_sheets_configs` - Google Sheets integration settings
- `revenue_records` - Stripe payment data linked to contacts
- `email_categories` - Email organization and tagging
- `activity_logs` - Audit trail for all system actions

Migrations are automatically applied when running `supabase db reset`.

## Deploy to Vercel

1. **Connect your repository to Vercel:**
   - Import your Git repository in the Vercel dashboard
   - Choose Next.js as the framework

2. **Set environment variables:**
   - Add all environment variables from the table above
   - Update `NEXTAUTH_URL` to your production domain

3. **Deploy:**
   - Vercel will automatically build and deploy on push to main branch
   - Set up production Supabase project and update environment variables

## Project Structure


├── app/                 # Next.js 15 App Router
│   ├── (auth)/         # Authentication routes
│   ├── (dashboard)/    # Protected dashboard routes
│   ├── api/            # API routes and webhooks
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   ├── ui/            # Basic UI primitives
│   └── forms/         # Form components
├── lib/               # Business logic and utilities
│   ├── integrations/  # Third-party API clients
│   └── utils/         # Helper functions
├── db/                # Database access layer
├── actions/           # Server actions
├── types/             # TypeScript type definitions
├── supabase/          # Database migrations and config
└── public/            # Static assets


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Support

For questions or issues, create an issue in this repository or contact the development team.