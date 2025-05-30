# 🛠️ ডিজিটাল মেস ম্যানেজমেন্ট সিস্টেম V2.0 - Setup Guide

**Professional Development Environment Setup for 7-Day Sprint**

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 🎯 Development Environment Requirements

### 💻 System Requirements

```
Node.js:        18.x or 20.x LTS
npm/yarn:       npm 9+ or yarn 3+
Git:            Latest version
VS Code:        Recommended IDE
RAM:            8GB minimum, 16GB recommended
Storage:        5GB free space
Internet:       Stable connection for cloud services
```

### 🔧 Required Tools & Extensions

#### VS Code Extensions

```
1. ES7+ React/Redux/React-Native snippets
2. TypeScript Importer
3. Prisma
4. Tailwind CSS IntelliSense
5. MongoDB for VS Code
6. GitLens
7. Auto Rename Tag
8. Bracket Pair Colorizer
9. Thunder Client (API testing)
10. Error Lens
```

---

## 🚀 Quick Setup (30 Minutes)

### 📦 Step 1: Project Initialization

```bash
# Clone repository (if exists) or create new project
npx create-next-app@latest mess-management-v2 --typescript --tailwind --eslint --app
cd mess-management-v2

# Install additional dependencies
npm install @prisma/client prisma @clerk/nextjs
npm install @radix-ui/react-slot @radix-ui/react-dialog
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react recharts date-fns
npm install @hookform/resolvers react-hook-form zod
npm install sonner @next/bundle-analyzer

# Install development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prisma @typescript-eslint/eslint-plugin
```

### 🏗️ Step 2: Project Structure Setup

```bash
# Create project structure
mkdir -p src/{app,components,lib,types,hooks,utils,constants}
mkdir -p src/components/{ui,forms,layout,features}
mkdir -p src/app/{(auth),dashboard,api}
mkdir -p prisma/{schema,migrations}
mkdir -p public/{images,icons}

# Create essential files
touch src/lib/{auth.ts,db.ts,utils.ts,validations.ts}
touch src/types/{global.d.ts,auth.ts,mess.ts}
touch src/constants/{routes.ts,permissions.ts}
touch .env.local .env.example
```

### 📁 Final Project Structure

```
mess-management-v2/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (auth)/                   # Authentication routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── dashboard/                # Main application
│   │   │   ├── admin/
│   │   │   ├── meals/
│   │   │   ├── bazaar/
│   │   │   ├── bills/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   ├── api/                      # API routes
│   │   │   ├── mess/
│   │   │   ├── meals/
│   │   │   ├── bazaar/
│   │   │   ├── bills/
│   │   │   └── payments/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Shadcn UI components
│   │   ├── forms/                    # Form components
│   │   ├── layout/                   # Layout components
│   │   └── features/                 # Feature-specific components
│   ├── lib/                          # Utility libraries
│   │   ├── auth.ts                   # Clerk configuration
│   │   ├── db.ts                     # Prisma client
│   │   ├── utils.ts                  # General utilities
│   │   └── validations.ts            # Zod schemas
│   ├── types/                        # TypeScript definitions
│   ├── hooks/                        # Custom React hooks
│   ├── constants/                    # Application constants
│   └── utils/                        # Helper functions
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
├── public/                           # Static assets
├── .env.local                        # Environment variables
└── package.json
```

---

## 🔐 Environment Variables Setup

### 📝 Create .env.local

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mess_management_v2"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# MongoDB (for development)
MONGODB_URI="mongodb://localhost:27017/mess_management_v2"

# Optional: Payment gateways (for future)
BKASH_API_KEY=""
NAGAD_API_KEY=""
```

### 📄 Create .env.example

```env
# Copy .env.local and replace with placeholder values
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database_name"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🗄️ Database Setup

### 🍃 MongoDB Atlas Setup (Cloud Database)

#### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Free tier)
4. Choose region closest to Bangladesh (Singapore/Mumbai)

#### Step 2: Database Configuration

```bash
# 1. Create database user
Username: mess_admin
Password: [Generate strong password]
Roles: Atlas Admin

# 2. Configure network access
IP Whitelist: 0.0.0.0/0 (for development)
             Your specific IPs (for production)

# 3. Get connection string
mongodb+srv://mess_admin:<password>@cluster0.xxxxx.mongodb.net/mess_management_v2
```

### 🔧 Prisma Setup

#### Step 1: Initialize Prisma

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma Client
npx prisma generate

# Create initial migration
npx prisma db push

# Open Prisma Studio (database browser)
npx prisma studio
```

#### Step 2: Complete Schema File

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// [Complete schema from requirements document]
```

---

## 🔐 Clerk Authentication Setup

### 📱 Clerk Dashboard Configuration

#### Step 1: Create Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create new application
3. Choose authentication providers:
   - Email/Password ✅
   - Google OAuth ✅
   - Facebook OAuth (optional)

#### Step 2: Configure Settings

```typescript
// Authentication Settings
- Email verification: Required
- Password requirements: Strong
- Session duration: 7 days
- Multi-factor: Optional

// User Profile Fields
- Name: Required
- Email: Required
- Phone: Optional
- Avatar: Optional
```

#### Step 3: Webhook Setup (for user sync)

```typescript
// Webhook endpoint: /api/webhooks/clerk
// Events to listen:
-user.created - user.updated - user.deleted;
```

---

## 🎨 Shadcn UI Setup

### 🎯 Install Shadcn Components

```bash
# Initialize shadcn-ui
npx shadcn-ui@latest init

# Install essential components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add form
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
```

### 🔧 Configure Tailwind Theme

```typescript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bangladesh theme colors
        primary: {
          50: "#f0f9f0",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        secondary: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        bengali: ["Kalpurush", "SolaimanLipi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

---

## 🔧 Development Tools Configuration

### 📝 TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 🔍 ESLint Configuration

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

### 💄 Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

## 🏃‍♂️ Running the Development Server

### 🚀 Start Development

```bash
# Install all dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### 🔧 Development Scripts

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## 👥 Team Development Workflow

### 🌿 Git Workflow

```bash
# Initial setup
git clone <repository-url>
cd mess-management-v2
git checkout -b feature/your-feature-name

# Daily workflow
git pull origin main
git add .
git commit -m "feat: add meal management feature"
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### 📋 Branch Naming Convention

```
main                    # Production branch
develop                 # Development branch
feature/meal-management # New features
fix/auth-bug           # Bug fixes
hotfix/critical-issue  # Critical fixes
release/v2.0.0         # Release preparation
```

### 💬 Commit Message Format

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks

Examples:
feat: add meal entry form
fix: resolve authentication issue
docs: update API documentation
```

---

## 🧪 Testing Setup

### 🔬 Testing Tools Installation

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jest jest-environment-jsdom
npm install -D @types/jest

# Install Playwright for E2E testing
npm install -D @playwright/test
npx playwright install
```

### ⚙️ Jest Configuration

```javascript
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

---

## 📊 Monitoring & Analytics

### 🔍 Development Monitoring

```bash
# Install monitoring tools
npm install @vercel/analytics @vercel/speed-insights
npm install @sentry/nextjs

# Bundle analyzer
npm install -D @next/bundle-analyzer
```

### 📈 Performance Monitoring

```typescript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    domains: ["images.clerk.dev"],
  },
});
```

---

## 🚢 Deployment Preparation

### 🌐 Vercel Deployment Setup

#### Step 1: Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "CLERK_SECRET_KEY": "@clerk-secret",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "@clerk-publishable"
  }
}
```

#### Step 2: Environment Variables in Vercel

```bash
# Production environment variables
DATABASE_URL=mongodb+srv://...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 🔐 Production Security Checklist

- [ ] Environment variables secured
- [ ] Database connection string updated
- [ ] Clerk production keys configured
- [ ] CORS settings configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Error handling complete
- [ ] Logging configured

---

## 📚 Development Resources

### 🔗 Essential Documentation Links

```
Next.js 14:        https://nextjs.org/docs
Prisma:           https://www.prisma.io/docs
Clerk:            https://clerk.com/docs
Shadcn UI:        https://ui.shadcn.com
Tailwind CSS:     https://tailwindcss.com/docs
MongoDB:          https://docs.mongodb.com
TypeScript:       https://www.typescriptlang.org/docs
```

### 🎓 Learning Resources

```
Next.js Tutorial:     https://nextjs.org/learn
Prisma Quickstart:    https://www.prisma.io/docs/getting-started
Clerk Quickstart:     https://clerk.com/docs/quickstarts/nextjs
React Hook Form:      https://react-hook-form.com/get-started
Tailwind Components:  https://tailwindui.com/components
```

---

## 🆘 Troubleshooting Guide

### 🐛 Common Issues & Solutions

#### Database Connection Issues

```bash
# Check MongoDB connection
npx prisma db push

# Reset database
npx prisma migrate reset

# Generate new client
npx prisma generavte
```

#### Clerk Authentication Issues

```bash
# Clear browser cache and cookies
# Check environment variables
# Verify Clerk dashboard settings
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

#### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

---

## ✅ Setup Verification Checklist

### 🔍 Before Starting Development

- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas cluster created
- [ ] Database connection successful
- [ ] Clerk application configured
- [ ] All environment variables set
- [ ] Dependencies installed successfully
- [ ] Prisma client generated
- [ ] Development server starts without errors
- [ ] Tailwind CSS working
- [ ] TypeScript compilation successful
- [ ] Git repository initialized
- [ ] VS Code extensions installed

### 🚀 Ready for Development

Once all checkboxes are completed, your development environment is ready for the 7-day sprint!

---

## 👥 Team Coordination

### 📅 Daily Standup Format

```
Yesterday: What did you complete?
Today: What will you work on?
Blockers: Any issues or dependencies?
Help needed: What support do you need?
```

### 🔄 Code Review Process

```
1. Create feature branch
2. Implement feature
3. Write tests
4. Create pull request
5. Code review by lead
6. Address feedback
7. Merge to develop
8. Deploy to staging
```

---

**🎯 With this setup complete, your team is ready to build the professional Mess Management System V2.0 in 7 days!**

---

_Setup Guide Version: 2.0.0_
_Last Updated: May 29, 2025_
_Estimated Setup Time: 30-60 minutes_
