# Template Architecture Guide

This document explains the internal structure and design patterns used in the Template Engine Core templates.

## Template Design Philosophy

Each template is designed as a complete, production-ready Next.js application that follows modern web development best practices:

- **Component-Based Architecture**: Reusable, modular components
- **Design System Integration**: Consistent spacing, typography, and colors
- **Responsive Design**: Mobile-first, adaptive layouts
- **Performance Optimized**: Fast loading, efficient rendering
- **SEO Friendly**: Proper meta tags, semantic HTML
- **Accessibility**: WCAG compliant, keyboard navigation

## Template Structure Deep Dive

### Directory Organization

```
template-name-project/
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── page.js          # Homepage (root route)
│   │   ├── layout.js        # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── favicon.ico      # Site icon
│   │   └── (pages)/         # Route groups
│   │       ├── product/     # Product page route
│   │       │   └── page.js  # Product page component
│   │       └── about/       # About page route
│   │           └── page.js  # About page component
│   ├── components/          # Reusable components
│   │   ├── ui/              # Base UI components
│   │   │   ├── Card.jsx     # Card component
│   │   │   ├── Button.jsx   # Button component
│   │   │   └── ...          # Other UI components
│   │   ├── Navbar.jsx       # Navigation component
│   │   └── I18nProvider.jsx # Internationalization provider
│   ├── context/             # React contexts
│   │   └── ThemeContext.jsx # Theme management
│   ├── features/            # Feature-specific components
│   │   └── sampleFeature/   # Example feature
│   │       ├── components/  # Feature components
│   │       └── services/    # Feature services
│   ├── i18n/                # Internationalization
│   │   ├── client.js        # Client-side i18n
│   │   └── server.js        # Server-side i18n
│   ├── lib/                 # Utility libraries
│   │   ├── utils.js         # General utilities
│   │   └── serverTranslation.js # Server translation helpers
│   ├── locales/             # Translation files
│   │   ├── en/              # English translations
│   │   │   └── common.json  # Common translations
│   │   └── es/              # Spanish translations
│   │       └── common.json  # Common translations
│   ├── services/            # API and external services
│   │   ├── apiClient.js     # API client
│   │   └── serverApi.js     # Server-side API
│   └── utils/               # Utility functions
│       ├── capitalize.js    # Text utilities
│       ├── debounce.js      # Performance utilities
│       └── ...              # Other utilities
├── public/                  # Static assets
│   ├── file.svg             # Icon assets
│   ├── globe.svg            # Icon assets
│   ├── next.svg             # Next.js logo
│   ├── vercel.svg           # Vercel logo
│   └── window.svg           # Icon assets
├── package.json             # Dependencies and scripts
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── jsconfig.json            # JavaScript configuration
├── site-config.js           # Site-specific configuration
└── README.md                # Template documentation
```

## Component Architecture

### Base Layout Structure

```javascript
// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import ThemeProvider from '../context/ThemeContext'
import I18nProvider from '../components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '{{SITENAME}}',
  description: '{{SITENAME}} - Professional web application',
  icons: {
    icon: '{{ICON_URL}}'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <main>{children}</main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Page Component Pattern

```javascript
// src/app/page.js (Homepage)
import { getT } from '../i18n/server'
import CompoundCard from '../components/ui/Card'

export default async function HomePage() {
  const t = await getT()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 text-{{PRIMARY_COLOR}}">
            {{SITENAME}}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('hero.description')}
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-{{PRIMARY_COLOR}} text-white px-8 py-4 rounded-lg">
              {t('cta.getStarted')}
            </button>
            <button className="border-2 border-{{PRIMARY_COLOR}} text-{{PRIMARY_COLOR}} px-8 py-4 rounded-lg">
              {t('cta.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Content Sections */}
        {/* ... */}
      </div>
    </main>
  )
}
```

### UI Component Pattern

```javascript
// src/components/ui/Card.jsx
export default function Card({ title, description, icon, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 ${className}`}>
      {icon && (
        <div className="w-12 h-12 bg-{{PRIMARY_COLOR}}/10 rounded-lg flex items-center justify-center mb-4">
          <span className="text-{{PRIMARY_COLOR}} text-2xl">{icon}</span>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
```

## Design System Integration

### Color System

Each template uses a consistent color system with design tokens:

```css
/* src/app/globals.css */
:root {
  --primary-color: {{PRIMARY_COLOR}};
  --secondary-color: {{SECONDARY_COLOR}};
  --background: #ffffff;
  --foreground: #000000;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
}

[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
}
```

### Typography System

```css
/* Typography scale */
.text-6xl { font-size: 3.75rem; line-height: 1; }
.text-5xl { font-size: 3rem; line-height: 1; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }

/* Font families */
.font-{{FONT_FAMILY}} { font-family: {{FONT_FAMILY}}, sans-serif; }
```

### Spacing System

```css
/* Consistent spacing scale */
.p-16 { padding: 4rem; }
.p-12 { padding: 3rem; }
.p-8 { padding: 2rem; }
.p-6 { padding: 1.5rem; }
.p-4 { padding: 1rem; }

.mb-24 { margin-bottom: 6rem; }
.mb-20 { margin-bottom: 5rem; }
.mb-16 { margin-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-8 { margin-bottom: 2rem; }
```

## Template-Specific Design Patterns

### Template 1 - Modern Corporate

**Design Characteristics:**
- Clean, professional aesthetics
- Card-based layouts
- Minimal color palette
- Corporate-friendly typography
- Conservative animations

**Key Components:**
```javascript
// Corporate Hero Section
<div className="text-center mb-20">
  <h1 className="text-6xl font-bold mb-6 text-blue-900 dark:text-blue-100">
    {{SITENAME}}
  </h1>
  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
    Professional solutions delivered with excellence.
  </p>
</div>

// Corporate Service Cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
      <span className="text-blue-900 dark:text-blue-100 text-2xl">📊</span>
    </div>
    <h3 className="text-xl font-semibold mb-3">Business Analytics</h3>
    <p className="text-gray-600 dark:text-gray-300">Comprehensive data analysis solutions.</p>
  </div>
</div>
```

### Template 2 - Creative Agency

**Design Characteristics:**
- Bold, vibrant colors
- Gradient effects
- Artistic typography
- Creative animations
- Portfolio-focused layouts

**Key Components:**
```javascript
// Creative Hero with Gradients
<div className="text-center mb-24 relative overflow-hidden">
  <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
  <div className="relative z-10">
    <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
      {{SITENAME}}
    </h1>
  </div>
</div>

// Creative Service Cards with Hover Effects
<div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
    <span className="text-white text-3xl">🎯</span>
  </div>
  <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-200">Brand Identity</h3>
  <p className="text-gray-600 dark:text-gray-300 text-lg">Unforgettable brand experiences.</p>
</div>
```

### Template 3 - Tech Startup

**Design Characteristics:**
- Modern, tech-focused design
- Gradient backgrounds
- Data-driven layouts
- Startup-friendly messaging
- Performance metrics displays

**Key Components:**
```javascript
// Tech Hero with Gradient Background
<div className="text-center mb-24 relative">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 rounded-3xl"></div>
  <div className="relative z-10 py-16">
    <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
      {{SITENAME}}
    </h1>
    <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12">
      Revolutionizing the future with cutting-edge technology.
    </p>
  </div>
</div>

// Tech Metrics Dashboard
<div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-white mb-24">
  <h2 className="text-4xl font-bold mb-12 text-center">Trusted by Innovators Worldwide</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">1M+</div>
      <div className="text-slate-300 text-lg">Active Users</div>
    </div>
  </div>
</div>
```

## Responsive Design Patterns

### Mobile-First Approach

```javascript
// Responsive grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Content */}
</div>

// Responsive flex layouts
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* Buttons */}
</div>

// Responsive text sizes
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
  {{SITENAME}}
</h1>
```

### Breakpoint Strategy

- **Mobile**: 0px - 640px (default)
- **Tablet**: 640px - 768px (sm:)
- **Desktop**: 768px - 1024px (md:)
- **Large**: 1024px - 1280px (lg:)
- **XL**: 1280px+ (xl:)

## Dark Mode Implementation

### Theme Context

```javascript
// src/context/ThemeContext.jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Dark Mode Styles

```css
/* CSS Variables for theme switching */
:root {
  --background: 255 255 255;
  --foreground: 0 0 0;
}

[data-theme="dark"] {
  --background: 15 23 42;
  --foreground: 248 250 252;
}

/* Tailwind classes */
.bg-background { background-color: rgb(var(--background)); }
.text-foreground { color: rgb(var(--foreground)); }
```

## Internationalization (i18n)

### Server-Side Translation

```javascript
// src/i18n/server.js
import { headers } from 'next/headers'
import { getTranslations } from '../lib/serverTranslation'

export async function getT(locale) {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const detectedLocale = locale || acceptLanguage.split(',')[0].split('-')[0]
  
  return getTranslations(detectedLocale)
}
```

### Translation Files

```json
// src/locales/en/common.json
{
  "hero": {
    "title": "Welcome to {{SITENAME}}",
    "description": "Professional solutions delivered with excellence."
  },
  "cta": {
    "getStarted": "Get Started",
    "learnMore": "Learn More"
  },
  "navigation": {
    "home": "Home",
    "product": "Product",
    "about": "About"
  }
}
```

## Performance Optimization

### Code Splitting

```javascript
// Dynamic imports for performance
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

### Image Optimization

```javascript
// Next.js Image component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
  className="rounded-lg"
/>
```

### Font Optimization

```javascript
// Google Fonts optimization
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})
```

## SEO and Metadata

### Dynamic Metadata

```javascript
// src/app/page.js
export async function generateMetadata() {
  return {
    title: '{{SITENAME}} - Professional Web Solutions',
    description: 'Discover professional web solutions with {{SITENAME}}. Modern, responsive, and user-friendly applications.',
    keywords: ['web development', 'next.js', 'react', 'tailwind'],
    authors: [{ name: '{{SITENAME}} Team' }],
    openGraph: {
      title: '{{SITENAME}}',
      description: 'Professional web solutions',
      url: 'https://{{SITENAME_SLUG}}.com',
      siteName: '{{SITENAME}}',
      images: [{
        url: '{{ICON_URL}}',
        width: 1200,
        height: 630,
      }],
    },
  }
}
```

### Structured Data

```javascript
// JSON-LD structured data
export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "{{SITENAME}}",
    "url": "https://{{SITENAME_SLUG}}.com",
    "logo": "{{ICON_URL}}"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  )
}
```

This architecture ensures that all templates are maintainable, performant, and follow modern web development best practices while providing the flexibility needed for customization through the design token system.
