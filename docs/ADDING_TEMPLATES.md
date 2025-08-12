# Adding New Templates

To add new templates to the template engine:

## 1. Create Template Directory

Create a new directory in `templates/`:

```bash
templates/
  template4-project/
    # Your Next.js project structure
    app/
      layout.tsx
      globals.css
      (pages)/
        home/
          page.tsx
        product/
          page.tsx
        about/
          page.tsx
```

## 2. Update templates.json

Add your template to `src/config/templates.json`:

```json
{
  "templates": {
    "template4": {
      "name": "Minimalist & Elegant",
      "description": "Ultra-clean minimalist design with elegant typography",
      "pages": ["home", "product", "about"],
      "features": ["responsive", "minimal", "typography", "accessibility"]
    }
  }
}
```

## 3. Use Design Tokens

Include token placeholders in your template files:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SITENAME_TOKEN</title>
        <link rel="icon" href="ICON_TOKEN" />
      </head>
      <body style={{ 
        fontFamily: 'FONT_TOKEN',
        '--primary-color': 'PRIMARY_COLOR_TOKEN',
        '--secondary-color': 'SECONDARY_COLOR_TOKEN'
      }}>
        {children}
      </body>
    </html>
  )
}
```

## 4. Dynamic Discovery

The system can automatically discover templates:

```bash
# This will find all *-project directories
npx template-engine discover-templates
```

## 5. Template Metadata (Optional)

Create a `template.json` file in your template directory for additional metadata:

```json
{
  "name": "Minimalist & Elegant",
  "description": "Ultra-clean minimalist design",
  "version": "1.0.0",
  "author": "Your Name",
  "features": ["responsive", "minimal"],
  "requiredTokens": ["PRIMARY_COLOR_TOKEN", "FONT_TOKEN"],
  "dependencies": {
    "tailwindcss": "^3.0.0"
  }
}
```

## 6. Page Structure

Ensure your template follows the expected page structure:

```
template4-project/
  app/
    (pages)/
      home/page.tsx      # Homepage
      product/page.tsx   # Product page  
      about/page.tsx     # About page
```

This structure allows the mixed mode to work properly by overlaying specific pages from different templates.
