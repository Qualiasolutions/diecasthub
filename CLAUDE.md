# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Diecast Hub is a premium e-commerce website for 1:18 scale diecast model cars, built with Next.js 15, TypeScript, Tailwind CSS, Shadcn/UI, and Supabase. The project is designed as a luxury collectibles platform targeting serious collectors and enthusiasts worldwide.

**Live Website**: https://diecast-kbiuytlw9-qualiasolutions-glluztech.vercel.app  
**GitHub Repository**: https://github.com/Qualiasolutions/diecasthub

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS with custom brand colors
- **UI Components**: Shadcn/UI component library
- **Icons**: Lucide React icons

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase client with TypeScript types
- **Authentication**: Supabase Auth (configured, not yet implemented)
- **API**: Next.js API Routes

### Development Tools
- **Testing**: Playwright for E2E testing
- **Linting**: ESLint (disabled for production builds)
- **Deployment**: Vercel with GitHub integration
- **Version Control**: Git with GitHub

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting (currently disabled for builds)
npm run lint

# Run Playwright tests
npx playwright test

# Run tests with visible browser
npx playwright test --headed

# Deploy to Vercel
npx vercel --prod
```

## Project Structure

```
diecast-hub/
├── app/                          # Next.js App Router
│   ├── api/setup-db/            # Database setup API route
│   ├── globals.css              # Global styles with brand colors
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Homepage
├── components/
│   ├── homepage/                # Homepage-specific components
│   │   ├── hero-section.tsx
│   │   ├── featured-products.tsx
│   │   └── categories-showcase.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── ui/                      # Shadcn/UI components
├── lib/
│   ├── supabase/               # Supabase client configuration
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── admin.ts            # Admin client
│   ├── types/
│   │   └── database.ts         # TypeScript database types
│   └── utils.ts                # Utility functions
├── tests/                      # Playwright E2E tests
├── supabase/
│   └── migrations/             # Database migration files
└── scripts/                    # Utility scripts
```

## Database Schema

### Core Tables
- **brands**: Manufacturer information (Ferrari, Lamborghini, etc.)
- **categories**: Product categories (Sports Cars, Classic Cars, etc.)
- **products**: Product catalog with pricing, descriptions, features
- **cart_items**: Shopping cart functionality
- **orders**: Order management system
- **order_items**: Order line items

### Sample Data
The database is seeded with:
- 6 premium brands (Ferrari, Lamborghini, Porsche, McLaren, Bugatti, Aston Martin)
- 6 product categories (Sports Cars, Classic Cars, Formula 1, etc.)
- 4 sample products with detailed specifications

## Design System

### Brand Colors
```css
--color-brand-primary: #051726;  /* Navy Blue */
--color-brand-blue: #3b82f6;     /* Modern Blue */
--color-brand-gold: #d4af37;     /* Premium Gold */
```

### Component Patterns
- **Glass effects**: Backdrop-blur with transparent backgrounds
- **Smooth animations**: 60fps performance with CSS transforms
- **Responsive design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

## Environment Variables

### Required for Production
```
NEXT_PUBLIC_SUPABASE_URL=https://tjijmtbyovmsebtxouee.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=sbp_810e9efed3ce37c52b57...
```

### Local Development
Copy `.env.local.example` to `.env.local` and configure the variables above.

## Supabase Configuration

### Database Access
- **Project ID**: tjijmtbyovmsebtxouee
- **Region**: eu-north-1
- **Database**: PostgreSQL 17.6.1.003

### MCP Integration
The project supports Supabase MCP for direct database operations:
```bash
# Apply migrations via MCP
mcp__supabase__apply_migration

# Execute SQL via MCP  
mcp__supabase__execute_sql
```

## Testing

### Playwright E2E Tests
Located in `tests/` directory with comprehensive coverage:
- Homepage rendering and navigation
- Responsive design testing
- Component interaction testing
- Cross-browser compatibility (Chrome, Firefox, Safari)

### Running Tests
```bash
# Run all tests
npx playwright test

# Run tests with browser visible
npx playwright test --headed

# Run specific test file
npx playwright test tests/homepage.spec.ts
```

## Deployment

### Vercel Deployment
- **Production URL**: https://diecast-kbiuytlw9-qualiasolutions-glluztech.vercel.app
- **Preview deployments**: Automatic on PR creation
- **Environment variables**: Configured via Vercel CLI

### Deployment Commands
```bash
# Deploy to production
npx vercel --prod

# Set environment variables
npx vercel env add VARIABLE_NAME production
```

## Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow existing component patterns
- Maintain responsive design principles
- Preserve luxury aesthetic and brand consistency

### Component Development
- All components are self-contained with proper TypeScript types
- Use Shadcn/UI components as base, customize as needed
- Maintain accessibility standards
- Include hover states and smooth transitions

### Performance Optimization
- Use Next.js Image component for all images
- Implement lazy loading where appropriate
- Maintain 60fps animations with CSS transforms
- Use `will-change` for animated elements

## Known Configuration

### Build Configuration
- ESLint errors are ignored during production builds (`next.config.ts`)
- TypeScript errors are ignored for deployment
- Turbopack is enabled for faster builds

### Styling
- Custom CSS variables for brand colors
- Tailwind CSS with custom animations
- Glass effects and modern visual patterns
- Mobile-first responsive design

## Future Development

### Planned Features
- Product listing and detail pages
- Shopping cart functionality
- User authentication and accounts
- Payment processing integration
- Admin dashboard for inventory management
- Advanced search and filtering
- Customer reviews and ratings

### Extension Points
- API routes in `app/api/` for backend functionality
- Component library in `components/ui/` for consistent design
- Database types in `lib/types/` for type safety
- Supabase integration for data management

## Support

For development questions or issues:
1. Check existing components for patterns
2. Review Supabase documentation for database operations
3. Test responsiveness across device sizes
4. Maintain brand consistency with design system
5. Follow TypeScript best practices for type safety