# Template Engine Core - Usage Instructions

## Overview
Template Engine Core is a CLI tool for generating Next.js projects from templates with custom design tokens. You can use it interactively or with JSON configuration files.

## Installation

First, install the dependencies:
```bash
npm install
```

Make the CLI executable:
```bash
npm run prepare
```

## Available Commands

### 1. Generate Project with JSON Configuration

Use a JSON configuration file to generate projects automatically:

```bash
npm run cli -- generate --config path/to/config.json
```

**Examples:**
```bash
# Using provided example configurations
npm run cli -- generate --config examples/single-template-config.json
npm run cli -- generate --config examples/mixed-template-config.json

# With custom output directory
npm run cli -- generate --config examples/single-template-config.json --output ./my-project

# Without creating ZIP file
npm run cli -- generate --config examples/single-template-config.json --no-zip
```

### 2. Interactive Mode

Generate project with interactive prompts:
```bash
npm run cli -- generate
```

### 3. Validate Configuration

Check if your JSON configuration is valid:
```bash
npm run cli -- validate path/to/config.json
```

**Example:**
```bash
npm run cli -- validate examples/single-template-config.json
```

### 4. List Available Templates

See all available templates:
```bash
npm run cli -- list-templates
```

## JSON Configuration Format

### Single Template Configuration

Use one template for all pages:

```json
{
  "sitename": "My Website",
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

### Mixed Template Configuration

Use different templates for different pages:

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

## Configuration Fields

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `sitename` | string | Name of your website | `"My Awesome Site"` |
| `icon` | string | URL or path to favicon | `"/favicon.ico"` |
| `designToken` | object | Design token configuration | See below |
| `templateMode` | string | Either `"single"` or `"mixed"` | `"single"` |

### Design Token Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `primaryColor` | string | Primary color (hex) | `"#3B82F6"` |
| `secondaryColor` | string | Secondary color (hex) | `"#10B981"` |
| `font` | string | Font family name | `"Inter"` |

### Template Mode Fields

**For Single Mode:**
- `singleTemplate`: Template to use for all pages (`template1`, `template2`, or `template3`)

**For Mixed Mode:**
- `templates.homepage`: Template for homepage
- `templates.productPage`: Template for product page
- `templates.others`: Template for other pages (about, etc.)

## Available Templates

| Template | Name | Description |
|----------|------|-------------|
| `template1` | Modern & Clean | Clean gradient designs with card-based layouts |
| `template2` | Bold & Professional | Corporate-style design with professional typography |
| `template3` | Creative & Animated | Glass morphism effects with gradient animations |

## Token Replacement

The following tokens in your templates will be automatically replaced:

| Token | Replaced With | Example |
|-------|---------------|---------|
| `PRIMARY_COLOR_TOKEN` | Primary color value | `#3B82F6` |
| `SECONDARY_COLOR_TOKEN` | Secondary color value | `#10B981` |
| `FONT_TOKEN` | Font family | `Inter` |
| `FONT_TOKEN_VAR` | Font family | `Inter` |
| `SITENAME_TOKEN` | Site name | `My Awesome Site` |
| `ICON_TOKEN` | Icon URL | `/favicon.ico` |

## File Extensions Processed

Token replacement is applied to these file types:
- `.tsx`, `.ts`, `.js`, `.jsx`
- `.css`
- `.json`
- `.md`
- `.html`

## Output Structure

Generated projects include:
- ✅ Next.js App Router setup
- ✅ TypeScript configuration
- ✅ Tailwind CSS
- ✅ Responsive design
- ✅ Custom design tokens applied
- ✅ Production-ready structure

## Example Workflow

1. **Create your configuration:**
   ```json
   {
     "sitename": "TechStartup Pro",
     "icon": "/favicon.ico",
     "designToken": {
       "primaryColor": "#FF6B6B",
       "secondaryColor": "#4ECDC4",
       "font": "Roboto"
     },
     "templateMode": "single",
     "singleTemplate": "template2"
   }
   ```

2. **Save as `my-config.json`**

3. **Generate project:**
   ```bash
   npm run cli -- generate --config my-config.json --output ./my-new-website
   ```

4. **Setup and run:**
   ```bash
   cd my-new-website
   npm install
   npm run dev
   ```

## Troubleshooting

### Common Issues

**Configuration file not found:**
- Ensure the path to your JSON file is correct
- Use relative or absolute paths

**Invalid configuration:**
- Use `npm run cli -- validate your-config.json` to check for errors
- Ensure all required fields are present
- Check that colors are valid hex codes (e.g., `#FF6B6B`)
- Verify template names are valid (`template1`, `template2`, or `template3`)

**Generation fails:**
- Check that you have write permissions in the output directory
- Ensure templates directory exists
- Try with `--no-zip` flag if ZIP creation fails

## Advanced Usage

### Environment Variables

You can set these environment variables:
- `OUTPUT_DIR`: Default output directory
- `TEMPLATE_DIR`: Custom templates directory

### Custom Templates Directory

```bash
TEMPLATE_DIR=/path/to/custom/templates npm run cli -- generate --config config.json
```

## Getting Help

- Run `npm run cli -- --help` for command help
- Run `npm run cli -- generate --help` for generate command options
- Check the examples in the `examples/` directory
