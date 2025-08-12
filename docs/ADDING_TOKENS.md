# Adding New Design Tokens

To add new design tokens to the template engine, follow these steps:

## 1. Update tokens.json

Add your new token to `src/config/tokens.json`:

```json
{
  "tokens": {
    // ... existing tokens ...
    "BRAND_LOGO_TOKEN": {
      "description": "Brand logo URL",
      "type": "string",
      "default": "/logo.png",
      "getValue": "config.branding.logo"
    },
    "THEME_MODE_TOKEN": {
      "description": "Theme mode (light/dark)",
      "type": "string",
      "validation": "themeMode",
      "default": "light",
      "getValue": "config.theme.mode"
    },
    "BORDER_RADIUS_TOKEN": {
      "description": "Border radius for components",
      "type": "string",
      "default": "8px",
      "getValue": "config.designToken.borderRadius"
    }
  },
  "validation": {
    // ... existing validations ...
    "themeMode": "^(light|dark|auto)$"
  }
}
```

## 2. Update Template Files

Add your token placeholders to template files:

```tsx
// In template files (e.g., layout.tsx)
<img src="BRAND_LOGO_TOKEN" alt="Logo" />
<div className={`theme-THEME_MODE_TOKEN`}>
  <button style={{ borderRadius: 'BORDER_RADIUS_TOKEN' }}>
    Click me
  </button>
</div>
```

## 3. Update Configuration Structure

The system will automatically prompt for new tokens, but you may want to update the configuration structure:

```json
{
  "sitename": "My Site",
  "icon": "/favicon.ico",
  "branding": {
    "logo": "/my-logo.png"
  },
  "theme": {
    "mode": "dark"
  },
  "designToken": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#10B981",
    "font": "Inter",
    "borderRadius": "12px"
  },
  "templateMode": "single",
  "singleTemplate": "template1"
}
```

## 4. Advanced Token Functions

For complex token logic, you can create more sophisticated getValue functions:

```json
{
  "DYNAMIC_COLOR_TOKEN": {
    "description": "Dynamic color based on theme",
    "type": "color",
    "getValue": "config.theme.mode === 'dark' ? config.designToken.darkColor : config.designToken.lightColor"
  }
}
```

## 5. Custom Validation

Add custom validation patterns:

```json
{
  "validation": {
    "url": "^https?://[^\\s/$.?#].[^\\s]*$",
    "cssUnit": "^\\d+(px|em|rem|%|vh|vw)$"
  }
}
```

The system will automatically:
- Generate CLI prompts for new tokens
- Validate values based on validation patterns
- Replace tokens in all processed file types
- Include tokens in configuration validation
