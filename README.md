# Template Engine Core

A powerful, flexible template engine for generating Next.js projects from pre-built templates with customizable design tokens. Features both CLI and web interfaces for maximum usability.

## 🚀 Features

- 🎨 **3 Beautiful Templates**: Choose from modern corporate, creative agency, or tech startup designs
- 🎯 **Dual Template Modes**: Single template for consistency or mixed templates for variety
- 🎨 **Smart Design Token System**: Automatic color, font, and branding customization
- 📦 **Zero Configuration**: Interactive CLI with smart defaults
- 🚀 **Production Ready**: Full Next.js 14 + App Router + Tailwind CSS setup
- 📁 **Auto ZIP Packaging**: Optional project compression for easy sharing
- 🌐 **Beautiful Web UI**: React-based visual interface for non-technical users
- 💻 **Dual Interface**: Command line for developers, web UI for designers
- 🔄 **Smart Homepage Routing**: Proper `/` root routing (no `/home` redirects)

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [System Architecture](#system-architecture)
- [Template System](#template-system)
- [Design Token Engine](#design-token-engine)
- [CLI Reference](#cli-reference)
- [Web UI Guide](#web-ui-guide)
- [Configuration Reference](#configuration-reference)
- [Development](#development)

## 🏃‍♂️ Quick Start

### Web UI (Recommended for Non-Developers)
```bash
cd ui
npm install
npm run dev
```
Visit `http://localhost:3001` for the visual interface.

### CLI (Recommended for Developers)
```bash
# Interactive mode
npm run cli generate

# With config file
npm run cli generate --config examples/single-template-config.json

# Custom output directory
npm run cli generate --output my-awesome-project
```

## 🏗️ System Architecture

### Overview
The Template Engine Core follows a modular architecture that separates concerns between template management, configuration, and project generation:

```
┌─────────────────────────────────────────────────────────────┐
│                    Template Engine Core                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Web UI    │  │     CLI     │  │    API Routes      │  │
│  │  (React)    │  │ (Node.js)   │  │   (Next.js)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                 TemplateEngine.js (Core)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Config    │  │  Templates  │  │   Token System     │  │
│  │  Manager    │  │   System    │  │   (Replacement)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. **TemplateEngine.js** - Main Engine
- **Purpose**: Orchestrates the entire project generation process
- **Key Methods**:
  - `generateProject()`: Main entry point for project creation
  - `setupHomepage()`: Handles root route setup (ensures `/` not `/home`)
  - `applyMixedTemplates()`: Manages multi-template project composition
  - `applyTokenReplacements()`: Applies design tokens across all files

#### 2. **ConfigManager.js** - Configuration Handler
- **Purpose**: Manages template definitions, token mappings, and validation
- **Key Methods**:
  - `validateUserConfig()`: Ensures user configuration is valid
  - `getAvailableTemplates()`: Returns list of available templates
  - `getTokenMappings()`: Provides token replacement functions

#### 3. **CLIService.js** - Command Line Interface
- **Purpose**: Provides interactive and scripted CLI functionality
- **Features**: Interactive prompts, file validation, progress feedback

#### 4. **API Routes** - Web Interface Backend
- **Purpose**: Bridges web UI to core engine functionality
- **Location**: `ui/app/api/generate/route.ts`

## 🎨 Template System

### Template Architecture

Each template is a complete Next.js project with a specific design theme:

```
templates/
├── template1-project/          # Modern Corporate
├── template2-project/          # Creative Agency  
└── template3-project/          # Tech Startup
    ├── src/app/
    │   ├── page.js            # Homepage (root route)
    │   ├── layout.js          # App layout
    │   ├── globals.css        # Global styles
    │   └── (pages)/           # Route groups
    │       ├── product/       # Product page
    │       └── about/         # About page
    ├── components/            # Reusable components
    ├── public/               # Static assets
    └── package.json          # Dependencies
```

### Template Specifications

#### **Template 1 - Modern Corporate**
- **Theme**: Professional, clean, corporate
- **Colors**: Blue primary (#1E40AF), Gray secondary (#374151)
- **Use Cases**: Business websites, SaaS products, corporate portals
- **Key Features**: Clean cards, minimal design, professional typography

#### **Template 2 - Creative Agency**
- **Theme**: Bold, artistic, creative
- **Colors**: Purple primary (#8B5CF6), Orange secondary (#F59E0B)
- **Use Cases**: Creative agencies, portfolios, art studios
- **Key Features**: Gradient effects, animations, bold typography

#### **Template 3 - Tech Startup**
- **Theme**: Modern, innovative, tech-focused
- **Colors**: Blue primary (#0EA5E9), Green secondary (#10B981)
- **Use Cases**: Startups, tech companies, SaaS platforms
- **Key Features**: Gradient backgrounds, tech aesthetics, modern UI

### Homepage Routing Strategy

The system implements a smart homepage routing strategy:

1. **Template Sources**: Homepage content stored in `/app/page.js` (not `/app/(pages)/home/`)
2. **Generated Projects**: Homepage accessible at `/` (root route)
3. **No Redirects**: Eliminates the need for `/home` → `/` redirects
4. **SEO Optimized**: Search engines index the root domain directly

```javascript
// Before (problematic)
yoursite.com/home  ← Not user-friendly

// After (optimized)
yoursite.com/      ← Clean, professional, SEO-friendly
```

## 🔧 Design Token Engine

### Token System Overview

The design token system enables dynamic customization without modifying template code:

```javascript
// Token Definition (tokens.json)
{
  "{{SITENAME}}": {
    "description": "Site name/brand",
    "getValue": "config => config.sitename"
  },
  "{{PRIMARY_COLOR}}": {
    "description": "Primary brand color",
    "getValue": "config => config.designToken.primaryColor"
  }
}
```

### Token Processing Pipeline

1. **Template Scanning**: Engine scans all text files for token patterns
2. **Token Resolution**: Tokens resolved using user configuration
3. **File Processing**: Tokens replaced in-place across all project files
4. **Extension Filtering**: Only processes specified file types (js, jsx, ts, tsx, css, etc.)

### Supported File Types

```javascript
// From ConfigManager.js
textFileExtensions: [
  '.js', '.jsx', '.ts', '.tsx',
  '.css', '.scss', '.sass',
  '.json', '.md', '.html',
  '.svg', '.txt'
]
```

### Token Examples

| Token Pattern | Description | Example Value |
|---------------|-------------|---------------|
| `{{SITENAME}}` | Site/brand name | "TechFlow Pro" |
| `{{PRIMARY_COLOR}}` | Primary brand color | "#3B82F6" |
| `{{SECONDARY_COLOR}}` | Secondary brand color | "#10B981" |
| `{{FONT_FAMILY}}` | Typography font | "Inter" |
| `{{ICON_URL}}` | Favicon/icon URL | "/favicon.ico" |

## 💻 CLI Reference

### Installation & Setup

```bash
# Clone repository
git clone <repository-url>
cd template-engine-core

# Install dependencies
npm install

# Run CLI
npm run cli [command] [options]
```

### Commands

#### Generate Project
```bash
# Interactive mode (recommended for first-time users)
npm run cli generate

# Configuration file mode
npm run cli generate --config examples/single-template-config.json

# Custom output directory
npm run cli generate --output my-project

# Skip ZIP creation
npm run cli generate --no-zip

# Specify template directory (advanced)
npm run cli generate --templates ./custom-templates
```

#### Validate Configuration
```bash
# Validate a configuration file
npm run cli validate config.json
```

#### List Available Templates
```bash
# Show all available templates with descriptions
npm run cli list-templates
```

#### Help & Version
```bash
# Show help
npm run cli --help

# Show version
npm run cli --version
```

### CLI Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--config` | `-c` | Configuration file path | `-c config.json` |
| `--output` | `-o` | Output directory | `-o my-project` |
| `--no-zip` | | Skip ZIP creation | `--no-zip` |
| `--templates` | | Custom template directory | `--templates ./templates` |
| `--help` | `-h` | Show help | `-h` |
| `--version` | `-v` | Show version | `-v` |

## 🌐 Web UI Guide

### Interface Overview

The web UI provides a visual, user-friendly interface for non-technical users:

#### **Key Features**
- 🎨 **Visual Template Previews**: See templates with live color schemes
- 📝 **Interactive Forms**: Easy configuration without JSON editing
- 👀 **Real-time Preview**: See design tokens applied instantly
- 📱 **Responsive Design**: Works on all devices
- ⚡ **One-click Generation**: Generate and download projects instantly

#### **UI Architecture**
```
ui/
├── app/
│   ├── page.tsx              # Main UI interface
│   ├── layout.tsx            # App layout
│   ├── globals.css           # UI styles
│   └── api/generate/         # API endpoints
│       └── route.ts          # Project generation API
├── components/               # UI components
└── public/downloads/         # Generated project downloads
```

### Running the Web UI

```bash
cd ui
npm install
npm run dev
```

Visit `http://localhost:3001` in your browser.

### API Integration

The UI communicates with Next.js API routes:

```typescript
// POST /api/generate
{
  sitename: "My Site",
  templateMode: "single",
  singleTemplate: "template1",
  designToken: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    font: "Inter"
  }
}

// Response
{
  success: true,
  downloadUrl: "/downloads/my-site-project.zip"
}
```

## ⚙️ Configuration Reference

### Single Template Mode

Use one template for all pages:

```json
{
  "sitename": "TechFlow Pro",
  "icon": "/favicon.ico",
  "designToken": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981",
    "font": "Inter",
    "borderRadius": "8px"
  },
  "templateMode": "single",
  "singleTemplate": "template1"
}
```

### Mixed Template Mode

Use different templates for different pages:

```json
{
  "sitename": "Creative Studios",
  "icon": "https://example.com/icon.png",
  "designToken": {
    "primaryColor": "#8B5CF6",
    "secondaryColor": "#F59E0B",
    "font": "Poppins",
    "borderRadius": "12px"
  },
  "templateMode": "mixed",
  "templates": {
    "homepage": "template3",
    "productPage": "template2",
    "others": "template1"
  }
}
```

### Configuration Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sitename` | string | ✅ | Site name/brand |
| `icon` | string | ✅ | Favicon URL or path |
| `designToken` | object | ✅ | Design customization |
| `designToken.primaryColor` | string | ✅ | Primary brand color (hex) |
| `designToken.secondaryColor` | string | ✅ | Secondary brand color (hex) |
| `designToken.font` | string | ✅ | Font family name |
| `designToken.borderRadius` | string | ❌ | Border radius value |
| `templateMode` | enum | ✅ | "single" or "mixed" |
| `singleTemplate` | string | If single | Template name |
| `templates` | object | If mixed | Page-template mappings |
| `templates.homepage` | string | If mixed | Homepage template |
| `templates.productPage` | string | If mixed | Product page template |
| `templates.others` | string | If mixed | Other pages template |

### Available Templates

- `template1` - Modern Corporate
- `template2` - Creative Agency
- `template3` - Tech Startup

## 🛠️ Development

### Project Structure

```
template-engine-core/
├── src/                      # Core engine source
│   ├── TemplateEngine.js     # Main engine class
│   ├── config/               # Configuration system
│   │   ├── ConfigManager.js  # Config handler
│   │   ├── templates.json    # Template definitions
│   │   └── tokens.json       # Token mappings
│   └── services/             # Utility services
│       └── CLIService.js     # CLI interface
├── templates/                # Template source files
│   ├── template1-project/    # Corporate template
│   ├── template2-project/    # Creative template
│   └── template3-project/    # Tech template
├── ui/                       # Web interface
│   ├── app/                  # Next.js 14 app
│   └── components/           # UI components
├── examples/                 # Sample configurations
├── bin/                      # CLI entry point
└── docs/                     # Additional documentation
```

### Generated Project Structure

```
my-project/
├── src/app/
│   ├── page.js              # Homepage (root route)
│   ├── layout.js            # App layout
│   ├── globals.css          # Global styles
│   ├── (pages)/             # Route groups
│   │   ├── product/page.js  # Product page
│   │   └── about/page.js    # About page
│   ├── components/          # UI components
│   ├── context/             # React contexts
│   ├── lib/                 # Utilities
│   └── locales/             # i18n translations
├── public/                  # Static assets
├── package.json             # Dependencies
├── next.config.mjs          # Next.js config
├── tailwind.config.ts       # Tailwind config
└── postcss.config.mjs       # PostCSS config
```

### Page Routing

| Route | File Path | Description |
|-------|-----------|-------------|
| `/` | `src/app/page.js` | Homepage (root) |
| `/product` | `src/app/(pages)/product/page.js` | Product showcase |
| `/about` | `src/app/(pages)/about/page.js` | About page |

### Running Generated Projects

```bash
cd my-project
npm install
npm run dev
```

Your app will be available at `http://localhost:3000`

### Development Commands

```bash
# Install dependencies
npm install

# Run CLI in development
npm run cli generate

# Start web UI development server
cd ui && npm run dev

# Run tests (if available)
npm test

# Build for production
npm run build
```

## 📖 Additional Documentation

- [Adding New Templates](docs/ADDING_TEMPLATES.md)
- [Adding New Tokens](docs/ADDING_TOKENS.md)
- [Refactoring Guide](docs/REFACTORING_SUMMARY.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📧 Email: support@templateengine.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/template-engine-core/issues)
- 📚 Docs: [Documentation Site](https://templateengine.dev/docs)
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
- `/` - Homepage (root route)
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
