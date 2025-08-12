# Using Template Engine System for Other Projects

This guide explains how to adapt the template engine system for other types of projects beyond Next.js.

## Overview

The template engine is framework-agnostic and can be used for any project type that involves:
- Template-based project generation
- Design token replacement
- Configuration-driven customization
- Multiple template variants

## What to Copy

### 1. Core System Files (Required)

Copy these files to your new project:

```
src/
├── config/
│   ├── ConfigManager.js       # Core configuration management
│   ├── templates.json         # Template definitions (modify for your project)
│   └── tokens.json           # Token definitions (modify for your project)
├── services/
│   └── CLIService.js         # CLI interaction service
└── TemplateEngine.js         # Main engine (minimal changes needed)

bin/
└── cli.js                   # CLI entry point (minimal changes needed)
```

### 2. Configuration Files (Customize)

These need to be adapted for your project type:

```
package.json                 # Update dependencies and scripts
examples/                   # Create example configs for your project
docs/                      # Documentation for your specific use case
```

## Step-by-Step Adaptation

### Step 1: Modify templates.json

Update `src/config/templates.json` for your project type:

```json
{
  "templates": {
    "react-app": {
      "name": "React Application",
      "description": "Standard React application with modern tooling",
      "pages": ["home", "about", "contact"]
    },
    "vue-app": {
      "name": "Vue Application", 
      "description": "Vue 3 application with Composition API",
      "pages": ["home", "about", "contact"]
    },
    "angular-app": {
      "name": "Angular Application",
      "description": "Angular application with TypeScript",
      "pages": ["home", "about", "contact"]
    }
  },
  "defaultPages": ["home", "about", "contact"],
  "templateDirectory": "../templates",
  "projectSuffix": "-project"
}
```

### Step 2: Modify tokens.json

Update `src/config/tokens.json` for your project's needs:

```json
{
  "tokens": {
    "APP_NAME_TOKEN": {
      "description": "Application name",
      "type": "string",
      "default": "My App",
      "getValue": "config.appName"
    },
    "API_URL_TOKEN": {
      "description": "API base URL",
      "type": "string",
      "validation": "url",
      "default": "http://localhost:3000/api",
      "getValue": "config.api.baseUrl"
    },
    "THEME_COLOR_TOKEN": {
      "description": "Primary theme color",
      "type": "color",
      "validation": "hex",
      "default": "#007bff",
      "getValue": "config.theme.primaryColor"
    },
    "DATABASE_TYPE_TOKEN": {
      "description": "Database type",
      "type": "string",
      "validation": "dbType",
      "default": "postgresql",
      "getValue": "config.database.type"
    }
  },
  "validation": {
    "hex": "^#[0-9A-F]{6}$",
    "url": "^https?://[^\\s/$.?#].[^\\s]*$",
    "dbType": "^(postgresql|mysql|mongodb|sqlite)$"
  },
  "fileExtensions": [".js", ".ts", ".jsx", ".tsx", ".vue", ".html", ".css", ".json", ".md", ".yml", ".yaml"]
}
```

### Step 3: Create Template Projects

Create your template directories:

```
templates/
├── react-app-project/
│   ├── package.json
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   └── config/
│   │       └── api.js
│   └── public/
│       └── index.html
├── vue-app-project/
│   ├── package.json
│   ├── src/
│   │   ├── App.vue
│   │   ├── components/
│   │   └── config/
│   └── public/
└── angular-app-project/
    ├── package.json
    ├── src/
    │   ├── app/
    │   └── environments/
    └── angular.json
```

### Step 4: Add Tokens to Template Files

Include your tokens in template files:

```javascript
// templates/react-app-project/src/config/api.js
export const API_CONFIG = {
  baseUrl: 'API_URL_TOKEN',
  timeout: 5000
};

// templates/react-app-project/src/App.js
function App() {
  return (
    <div className="App" style={{ color: 'THEME_COLOR_TOKEN' }}>
      <h1>APP_NAME_TOKEN</h1>
      {/* Your app content */}
    </div>
  );
}
```

```json
// templates/react-app-project/package.json
{
  "name": "APP_NAME_TOKEN",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}
```

### Step 5: Update package.json

Modify the main `package.json`:

```json
{
  "name": "@yourname/react-project-generator",
  "description": "Generate React projects from templates",
  "bin": {
    "react-gen": "./bin/cli.js"
  },
  "dependencies": {
    "commander": "^9.0.0",
    "inquirer": "^8.0.0",
    "fs-extra": "^10.0.0",
    "chalk": "^4.0.0",
    "archiver": "^5.0.0"
  }
}
```

### Step 6: Create Example Configurations

```json
// examples/react-spa-config.json
{
  "appName": "My React SPA",
  "theme": {
    "primaryColor": "#61dafb"
  },
  "api": {
    "baseUrl": "https://api.myapp.com"
  },
  "database": {
    "type": "postgresql"
  },
  "templateMode": "single",
  "singleTemplate": "react-app"
}
```

```json
// examples/vue-dashboard-config.json
{
  "appName": "Vue Dashboard",
  "theme": {
    "primaryColor": "#4fc08d"
  },
  "api": {
    "baseUrl": "https://dashboard-api.com"
  },
  "database": {
    "type": "mongodb"
  },
  "templateMode": "single",
  "singleTemplate": "vue-app"
}
```

## Usage Examples

### For React Projects

```bash
# Interactive generation
npx react-gen generate

# Using config file
npx react-gen generate --config examples/react-spa-config.json

# List available templates
npx react-gen list-templates

# Validate configuration
npx react-gen validate examples/react-spa-config.json
```

### For Different Project Types

The same CLI works for any project type you configure:

```bash
# Generate Vue project
npx vue-gen generate --config vue-config.json

# Generate Angular project  
npx ng-gen generate --config angular-config.json

# Generate Express API
npx api-gen generate --config api-config.json
```

## Advanced Customizations

### Custom File Processing

Extend the file extensions in `tokens.json`:

```json
{
  "fileExtensions": [
    ".js", ".ts", ".jsx", ".tsx",    // JavaScript/TypeScript
    ".vue", ".svelte",               // Framework files
    ".html", ".css", ".scss",        // Styling
    ".json", ".yml", ".yaml",        // Config files
    ".md", ".mdx",                   // Documentation
    ".dockerfile", ".env"            // DevOps files
  ]
}
```

### Complex Token Logic

Use advanced token functions:

```json
{
  "ENVIRONMENT_CONFIG_TOKEN": {
    "description": "Environment-specific configuration",
    "type": "object",
    "getValue": "config.environment === 'production' ? config.prod : config.dev"
  }
}
```

### Template Metadata

Add metadata to templates:

```json
{
  "templates": {
    "react-app": {
      "name": "React Application",
      "description": "Modern React app with hooks",
      "version": "1.2.0",
      "dependencies": ["react", "react-dom"],
      "devDependencies": ["@types/react"],
      "requirements": {
        "node": ">=16.0.0",
        "npm": ">=8.0.0"
      }
    }
  }
}
```

## Project-Specific Examples

### Express API Generator
- Templates: `express-rest`, `express-graphql`, `express-microservice`
- Tokens: `PORT_TOKEN`, `DATABASE_URL_TOKEN`, `JWT_SECRET_TOKEN`
- Pages: `routes`, `middleware`, `controllers`

### Flutter App Generator  
- Templates: `flutter-material`, `flutter-cupertino`, `flutter-web`
- Tokens: `APP_ID_TOKEN`, `BUNDLE_ID_TOKEN`, `APP_VERSION_TOKEN`
- Pages: `home`, `profile`, `settings`

### Django Project Generator
- Templates: `django-rest`, `django-web`, `django-cms`
- Tokens: `SECRET_KEY_TOKEN`, `DATABASE_NAME_TOKEN`, `ALLOWED_HOSTS_TOKEN`
- Pages: `models`, `views`, `urls`

## Best Practices

1. **Keep tokens semantic**: Use descriptive names like `API_BASE_URL_TOKEN` not `URL1_TOKEN`
2. **Validate early**: Add validation patterns for your specific use cases
3. **Document tokens**: Good descriptions help users understand what each token does
4. **Test templates**: Ensure generated projects work out of the box
5. **Version templates**: Use template metadata to track versions and compatibility

## Benefits of This Approach

- **Rapid prototyping**: Generate new projects in seconds
- **Consistency**: All projects follow the same structure and conventions
- **Customization**: Easy to adapt for team/company standards
- **Scalability**: Add new templates and tokens without code changes
- **Maintainability**: Single source of truth for project templates

This system can be adapted for any project type - web apps, mobile apps, APIs, desktop applications, or even non-code projects like documentation templates!
