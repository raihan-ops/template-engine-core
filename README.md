# Template Engine Core

A powerful CLI tool for generating Next.js projects from pre-built templates with customizable design tokens.

## Features

- 🎨 **3 Beautiful Templates**: Choose from modern, professional, or creative designs
- 🎯 **Single or Mixed Mode**: Use one template for all pages or mix different templates per page
- 🎨 **Design Token System**: Customize colors, fonts, and branding
- 📦 **Zero Configuration**: Interactive CLI or JSON config files
- 🚀 **Production Ready**: Full Next.js App Router + Tailwind CSS setup
- 📁 **Auto ZIP**: Optional project packaging
- 🌐 **Web UI**: Beautiful React interface for easy project generation
- 💻 **CLI & UI**: Use command line or web interface

## Templates

### Template 1 - Modern & Clean
- Clean gradient designs
- Card-based layouts
- Minimalist navigation
- Perfect for SaaS products

### Template 2 - Bold & Professional  
- Corporate-style design
- Professional typography
- Business-focused layouts
- Ideal for enterprise solutions

### Template 3 - Creative & Animated
- Glass morphism effects
- Gradient text and animations
- Creative layouts
- Great for creative agencies

## Installation

```bash
# Install globally
npm install -g template-engine-core

# Or use with npx
npx template-engine-core generate
```

## Quick Start

### Web UI (Recommended)
```bash
# Start the web interface
cd ui
npm install
npm run dev
```
Visit `http://localhost:3001` for the visual interface.

### CLI - Interactive Mode
```bash
template-engine generate
```

### Using Configuration File
```bash
template-engine generate --config config.json
```

### Custom Output Directory
```bash
template-engine generate --output my-project
```

## Configuration

### JSON Configuration Format

```json
{
  "sitename": "My Awesome Site",
  "icon": "/favicon.ico",
  "designToken": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981", 
    "font": "Inter"
  },
  "templateMode": "single",
  "singleTemplate": "template1"
}
```

### Mixed Template Mode

```json
{
  "sitename": "Creative Studios",
  "icon": "https://example.com/icon.png",
  "designToken": {
    "primaryColor": "#8B5CF6",
    "secondaryColor": "#F59E0B",
    "font": "Poppins"
  },
  "templateMode": "mixed",
  "templates": {
    "homepage": "template3",
    "productPage": "template2", 
    "others": "template1"
  }
}
```

## CLI Commands

### Generate Project
```bash
# Interactive mode
template-engine generate

# With config file
template-engine generate --config config.json

# Custom output
template-engine generate --output ./my-app

# Skip ZIP creation
template-engine generate --no-zip
```

### Validate Configuration
```bash
template-engine validate config.json
```

### List Templates
```bash
template-engine list-templates
```

## Project Structure

Each generated project includes:

```
my-project/
├── app/
│   ├── (pages)/
│   │   ├── home/page.tsx
│   │   ├── product/page.tsx
│   │   └── about/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── package.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── tsconfig.json
```

## Design Token System

The tool replaces the following tokens in your generated project:

- `PRIMARY_COLOR_TOKEN` → Your primary color
- `SECONDARY_COLOR_TOKEN` → Your secondary color  
- `FONT_TOKEN` → Your chosen font family
- `SITENAME_TOKEN` → Your site name
- `ICON_TOKEN` → Your icon/favicon URL

## Development

After generating your project:

```bash
cd my-project
npm install
npm run dev
```

Your app will be available at `http://localhost:3000`

## Template Logic

### Single Mode
- Copies the selected template entirely
- Applies design tokens across all files

### Mixed Mode  
- Uses homepage template as the base project
- Overlays specific page files from other templates
- Maintains consistent layout and configuration
- Applies design tokens after file composition

## Examples

See the `examples/` directory for sample configuration files:

- `single-template-config.json` - Single template setup
- `mixed-template-config.json` - Mixed template setup

## Pages Structure

Each template includes these routes:
- `/home` - Homepage
- `/product` - Product showcase
- `/about` - About page

Navigation is automatically configured in the layout.

## Web UI Interface

The project includes a beautiful React-based web interface that makes project generation even easier:

### Features of the Web UI:
- 🎨 **Visual Template Selection**: Preview templates with live color schemes
- 🎯 **Interactive Configuration**: Easy-to-use forms for all settings
- 👀 **Live Preview**: See your design tokens applied in real-time
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Instant Generation**: Generate and download projects with one click
- 📊 **Visual Feedback**: Progress indicators and status messages

### Running the Web UI:
```bash
cd ui
npm install
npm run dev
```

Then visit `http://localhost:3001` in your browser.

### API Integration:
The UI communicates with a Next.js API route that:
- Validates your configuration
- Calls the same template engine used by the CLI
- Generates the project files
- Creates a downloadable ZIP archive
- Provides real-time feedback

This gives you the best of both worlds - the power of the CLI with the convenience of a visual interface!

## License

MIT
