# Template Engine Core - Web UI

A beautiful React-based web interface for generating Next.js projects from templates.

## 🚀 Quick Start

```bash
cd ui
npm install
npm run dev
```

Visit `http://localhost:3001` to access the web interface.

## ✨ Features

### Visual Template Selection
- Preview all three templates with their unique designs
- See template descriptions and key features
- Visual color previews for design tokens

### Interactive Configuration
- **Project Settings**: Site name and icon configuration
- **Design Tokens**: Color picker and font selection
- **Template Modes**: 
  - Single template for all pages
  - Mixed templates (different template per page type)

### Live Preview
- Real-time preview of your design tokens
- Color swatches showing primary/secondary colors
- Font family preview
- Project structure overview

### One-Click Generation
- Generate complete Next.js projects instantly
- Automatic ZIP download
- Progress indicators and status feedback
- Error handling with helpful messages

## 🛠 Architecture

### Frontend (Next.js 14)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- Responsive design for all devices

### Backend API
- **Next.js API Routes** for project generation
- Direct integration with the Template Engine
- File system operations for project creation
- ZIP archive generation and download

### Integration
The UI uses the same `TemplateEngine` class as the CLI, ensuring:
- ✅ Identical output between CLI and UI
- ✅ Same validation logic
- ✅ Consistent feature set
- ✅ Shared configuration format

## 🎨 UI Components

### Configuration Panel
- Project settings form
- Design token controls with color pickers
- Template selection with visual previews
- Mode switching (single vs mixed templates)

### Preview Sidebar
- Live color preview
- Font family display
- Project structure overview
- Feature checklist

### Generation Controls
- Generate button with loading states
- Progress feedback
- Download link for completed projects
- Error handling and retry options

## 🔧 Development

### Project Structure
```
ui/
├── app/
│   ├── api/generate/route.ts    # Project generation API
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main UI interface
│   └── globals.css              # Global styles
├── src/                         # Symlink to ../src
├── templates/                   # Symlink to ../templates
└── package.json
```

### API Endpoint
**POST** `/api/generate`

Request body:
```json
{
  "sitename": "string",
  "icon": "string",
  "designToken": {
    "primaryColor": "#hexcolor",
    "secondaryColor": "#hexcolor", 
    "font": "string"
  },
  "templateMode": "single" | "mixed",
  "singleTemplate": "template1|template2|template3",
  "templates": {
    "homepage": "template1|template2|template3",
    "productPage": "template1|template2|template3",
    "others": "template1|template2|template3"
  }
}
```

Response:
```json
{
  "success": true,
  "downloadUrl": "/downloads/project-name.zip"
}
```

## 🎯 Benefits

### For Developers
- **Visual Feedback**: See exactly what you're configuring
- **No Command Line Required**: Perfect for non-technical users
- **Instant Results**: Generate and download immediately
- **Error Prevention**: Form validation prevents configuration mistakes

### For Teams
- **Shareable Interface**: Send a link instead of CLI instructions
- **Consistent Output**: Same templates and logic as CLI
- **Easy Onboarding**: No installation required for end users
- **Visual Documentation**: Templates are self-documenting

### For Agencies
- **Client-Friendly**: Let clients configure their own projects
- **Professional Interface**: Branded, polished experience
- **Deployment Ready**: Can be hosted for client access
- **Integration Ready**: API can be consumed by other tools

## 🚀 Deployment

### Local Development
```bash
npm run dev    # Development server on port 3001
npm run build  # Production build
npm run start  # Production server
```

### Production Deployment
The UI can be deployed to any Next.js hosting platform:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Self-hosted**

### Environment Setup
Ensure the template files and engine are accessible:
```bash
# Create symlinks (done automatically)
ln -sf ../src src
ln -sf ../templates templates
```

## 📝 Usage Examples

### Basic Project Generation
1. Open `http://localhost:3001`
2. Enter your site name
3. Choose colors and font
4. Select a template
5. Click "Generate Project"
6. Download your ZIP file

### Mixed Template Setup
1. Select "Mixed Templates" mode
2. Choose different templates for each page type:
   - Homepage: Creative & Animated
   - Product Page: Bold & Professional  
   - Other Pages: Modern & Clean
3. Configure design tokens
4. Generate and download

### Custom Branding
1. Enter your company name
2. Set your brand colors using color pickers
3. Choose your brand font
4. Select appropriate template style
5. Generate branded project

The web UI makes the powerful Template Engine accessible to everyone! 🎉
