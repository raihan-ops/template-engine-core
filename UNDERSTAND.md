# Template Engine Core - Project Understanding

## Project Overview

This is a comprehensive template engine system that stores three complete Next.js template projects and provides both CLI and web UI interfaces for generating customized projects. The system supports single template mode and mixed template mode with dynamic token replacement for design customization.

## System Architecture

```
template-engine-core/
├── 📁 templates/                    # Template Storage
│   ├── template1-project/           # Modern & Clean Design
│   ├── template2-project/           # Bold & Professional Design
│   └── template3-project/           # Creative & Animated Design
├── 📁 src/                          # Core Engine
│   └── TemplateEngine.js            # Main generation logic
├── 📁 bin/                          # CLI Interface
│   └── cli.js                       # Command-line tool
├── 📁 ui/                           # Web Interface
│   ├── app/                         # Next.js 14 App Router
│   │   ├── page.tsx                 # Main UI page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   └── api/
│   │       └── generate/
│   │           └── route.ts         # API endpoint
│   └── package.json                 # UI dependencies
└── package.json                     # Main project config
```

## Core Components

### 1. Template Engine (`src/TemplateEngine.js`)

**Purpose**: Core logic for project generation and token replacement

**Key Features**:
- Template validation and configuration management
- File copying and directory structure creation
- Token replacement system for dynamic customization
- Support for single and mixed template modes
- ZIP file generation for project delivery

**Constructor**:
```javascript
class TemplateEngine {
  constructor(customTemplateDir = null) {
    this.templates = ['template1', 'template2', 'template3'];
    this.templateDir = customTemplateDir || path.join(__dirname, '../templates');
  }
}
```

**Token System**:
- `PRIMARY_COLOR_TOKEN` → Design primary color
- `SECONDARY_COLOR_TOKEN` → Design secondary color  
- `FONT_TOKEN` → Typography selection
- `SITENAME_TOKEN` → Project/site name
- `ICON_TOKEN` → Icon selection

### 2. CLI Tool (`bin/cli.js`)

**Purpose**: Interactive command-line interface for project generation

**Features**:
- Interactive prompts using `inquirer`
- Template mode selection (single/mixed)
- Design token configuration
- Real-time validation
- Progress feedback with `chalk` colors
- Automatic ZIP generation

**Execution Flow**:
```bash
npm run generate
# or
node bin/cli.js
```

### 3. Web UI (`ui/`)

**Purpose**: Visual interface for easier project generation

**Technology Stack**:
- Next.js 14.2.5 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React components with hooks

**Key Components**:
- Template preview cards with visual selection
- Color pickers for design tokens
- Font dropdown selection
- Real-time configuration preview
- API integration for project generation

### 4. Template Projects

#### Template 1: Modern & Clean
- **Design**: Gradient layouts, card-based components
- **Color Scheme**: Blue/teal gradients
- **Style**: Minimalist, contemporary

#### Template 2: Bold & Professional  
- **Design**: Corporate-style, clean typography
- **Color Scheme**: Dark/professional tones
- **Style**: Business-focused, structured

#### Template 3: Creative & Animated
- **Design**: Glass morphism, gradient animations
- **Color Scheme**: Purple/pink gradients
- **Style**: Dynamic, interactive

## Execution Flows

### CLI Execution Flow

```
1. User runs: npm run generate
2. CLI presents template mode selection
3. User chooses single or mixed mode
4. CLI prompts for template selection
5. CLI prompts for design tokens (colors, fonts)
6. CLI prompts for site name and icon
7. TemplateEngine validates configuration
8. TemplateEngine copies base template
9. TemplateEngine applies token replacements
10. TemplateEngine handles mixed mode overlays (if applicable)
11. TemplateEngine creates ZIP file
12. CLI shows success message with file location
```

### Web UI Execution Flow

```
1. User accesses: http://localhost:3001
2. React UI loads with template previews
3. User selects template mode (single/mixed)
4. User configures design tokens via UI controls
5. User enters site details
6. User clicks "Generate Project"
7. Frontend sends POST to /api/generate
8. API route initializes TemplateEngine
9. TemplateEngine processes configuration
10. TemplateEngine generates project files
11. TemplateEngine creates ZIP in public/downloads/
12. API returns download URL
13. Frontend triggers file download
```

### Template Generation Process

```
1. Configuration Validation
   ├── Check template mode validity
   ├── Validate template selections
   ├── Verify design token formats
   └── Ensure required fields present

2. Base Template Setup
   ├── Clean output directory
   ├── Copy selected base template
   └── Preserve directory structure

3. Token Replacement
   ├── Scan all files for tokens
   ├── Replace PRIMARY_COLOR_TOKEN
   ├── Replace SECONDARY_COLOR_TOKEN
   ├── Replace FONT_TOKEN/FONT_TOKEN_VAR
   ├── Replace SITENAME_TOKEN
   └── Replace ICON_TOKEN

4. Mixed Mode Processing (if applicable)
   ├── Apply page-specific templates
   ├── Overlay specific page files
   └── Maintain base template structure

5. ZIP Generation
   ├── Create archive with compression
   ├── Include all project files
   └── Generate download-ready package
```

## Configuration Schema

### Single Template Mode
```json
{
  "templateMode": "single",
  "singleTemplate": "template1|template2|template3",
  "sitename": "string",
  "icon": "string",
  "designToken": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex", 
    "font": "font-name"
  }
}
```

### Mixed Template Mode
```json
{
  "templateMode": "mixed",
  "templates": {
    "homepage": "template1|template2|template3",
    "about": "template1|template2|template3",
    "services": "template1|template2|template3",
    "contact": "template1|template2|template3"
  },
  "sitename": "string",
  "icon": "string",
  "designToken": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "font": "font-name"
  }
}
```

## File Structure Generated

### Output Project Structure
```
generated-project/
├── app/
│   ├── (pages)/
│   │   ├── about/
│   │   ├── services/
│   │   └── contact/
│   ├── globals.css          # With token replacements
│   ├── layout.tsx          # With sitename/icon
│   └── page.tsx            # Homepage template
├── components/             # Template-specific components
├── public/                # Static assets
├── package.json           # Next.js dependencies
├── tailwind.config.js     # Styling configuration
└── README.md             # Setup instructions
```

## Technology Stack

### Core Dependencies
- **Node.js**: Runtime environment
- **fs-extra**: Enhanced file operations
- **archiver**: ZIP file creation
- **path**: Directory path management

### CLI Dependencies  
- **commander**: Command-line framework
- **inquirer**: Interactive prompts
- **chalk**: Terminal colors and styling

### UI Dependencies
- **Next.js 14.2.5**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon components

## Development and Deployment

### Development Setup
```bash
# Main project
npm install
npm run generate  # CLI tool

# UI development  
cd ui/
npm install
npm run build     # Production build
npm run start     # Production server
```

### Current Status
- ✅ CLI tool fully functional and tested
- ✅ All three template projects complete
- ✅ Token replacement system working
- ✅ Web UI implementation complete
- ✅ API integration functional
- ⚠️ Development server has startup issues (production works)

### Known Issues
1. **Next.js Version Conflict**: System has both v14.2.5 and v15.4.6
2. **Development Server**: App directory not detected in dev mode
3. **Path Resolution**: Template directory resolution in UI context

### Workarounds
- Use production build for UI testing: `npm run build && npm run start`
- Use absolute paths for Next.js binaries
- Modified TemplateEngine constructor to accept custom template directory

## API Endpoints

### POST /api/generate
**Purpose**: Generate and download project ZIP

**Request Body**: Configuration object (see schema above)

**Response**: 
```json
{
  "success": true,
  "downloadUrl": "/downloads/project-name.zip"
}
```

**Error Response**:
```json
{
  "error": "Error description"
}
```

## Testing and Validation

### CLI Testing
```bash
npm run generate
# Follow interactive prompts
# Verify ZIP generation in project root
```

### UI Testing  
```bash
cd ui/
npm run build
npm run start
# Access http://localhost:3001
# Test project generation workflow
```

### API Testing
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"templateMode":"single","singleTemplate":"template1",...}'
```

## Future Enhancements

1. **Development Server Fix**: Resolve Next.js 14/15 version conflicts
2. **Template Expansion**: Add more template variations
3. **Advanced Customization**: More design token options
4. **Preview System**: Live preview before generation
5. **Template Marketplace**: Community template sharing
6. **Version Control**: Template versioning system

## Security Considerations

- Input validation on all configuration parameters
- Path traversal protection in file operations
- ZIP bomb protection in archive creation
- Sanitized file naming for downloads
- CORS configuration for API endpoints

This system provides a complete, production-ready template engine with both programmatic and user-friendly interfaces for generating customized Next.js projects.
