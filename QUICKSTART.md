# Template Engine Core - Quick Start Guide

## What You Get

This tool generates complete Next.js projects with:

✅ **3 Professionally Designed Templates**
- Template 1: Modern & Clean (gradient designs, card layouts)
- Template 2: Bold & Professional (corporate style, business-focused)  
- Template 3: Creative & Animated (glass effects, gradient text, animations)

✅ **Complete Next.js App Router Setup**
- TypeScript configuration
- Tailwind CSS with custom design tokens
- ESLint configuration
- Optimized build settings

✅ **Ready-to-Use Pages**
- Homepage (`/home`)
- Product page (`/product`) 
- About page (`/about`)
- Responsive navigation

✅ **Customizable Design System**
- Primary/secondary colors
- Custom fonts
- Consistent branding across all pages

## Installation & Usage

### Option 1: NPX (Recommended)
```bash
npx template-engine-core generate
```

### Option 2: Global Install
```bash
npm install -g template-engine-core
template-engine generate
```

### Option 3: Configuration File
```bash
# Create config.json
{
  "sitename": "My Company",
  "icon": "/favicon.ico",
  "designToken": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981",
    "font": "Inter"
  },
  "templateMode": "single",
  "singleTemplate": "template2"
}

# Generate project
npx template-engine-core generate --config config.json
```

## Template Modes

### Single Template Mode
Use one template design for all pages:
```json
{
  "templateMode": "single",
  "singleTemplate": "template1"
}
```

### Mixed Template Mode  
Mix different templates per page type:
```json
{
  "templateMode": "mixed",
  "templates": {
    "homepage": "template3",    // Creative homepage
    "productPage": "template2", // Professional products
    "others": "template1"       // Clean about page
  }
}
```

## Quick Examples

### SaaS Startup
```bash
# Modern, clean design
npx template-engine-core generate
# Choose: template1, blue colors, Inter font
```

### Corporate Website  
```bash
# Professional, business-focused
npx template-engine-core generate
# Choose: template2, corporate colors, Roboto font
```

### Creative Agency
```bash
# Animated, creative design
npx template-engine-core generate  
# Choose: template3, vibrant colors, Poppins font
```

## After Generation

```bash
cd your-project
npm install
npm run dev
```

Visit `http://localhost:3000/home` to see your site!

## Build for Production

```bash
npm run build
npm start
```

Your Next.js project is ready to deploy to Vercel, Netlify, or any hosting platform.

## Need Help?

- Run `template-engine list-templates` to see available templates
- Run `template-engine validate config.json` to check your configuration
- Check the full README.md for advanced features

---

**Start building your next project in seconds, not hours!** 🚀
