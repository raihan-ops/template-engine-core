# UI Path Configuration Fix

## Issue
The UI application was failing with path errors when trying to access configuration files:
```
[Error: ENOENT: no such file or directory, open '/home/raihan/Documents/template-engine-core/ui/.next/server/app/api/config/tokens.json']
```

## Root Cause
The `ConfigManager` was using `__dirname` to resolve the config directory path, which worked fine when running from the main project directory but failed when running from the UI subdirectory.

## Solution

### 1. Made ConfigManager Flexible
Updated `ConfigManager` constructor to accept a custom config directory:
```javascript
// Before
class ConfigManager {
  constructor() {
    this.configDir = path.join(__dirname, '../config');
  }
}

// After  
class ConfigManager {
  constructor(customConfigDir = null) {
    this.configDir = customConfigDir || path.join(__dirname, '../config');
  }
}
```

### 2. Updated TemplateEngine Constructor
Modified `TemplateEngine` to accept and pass through custom config directory:
```javascript
// Before
class TemplateEngine {
  constructor(customTemplateDir = null) {
    this.configManager = new ConfigManager();
  }
}

// After
class TemplateEngine {
  constructor(customTemplateDir = null, customConfigDir = null) {
    this.configManager = new ConfigManager(customConfigDir);
  }
}
```

### 3. Fixed UI API Route
Updated the API route to pass correct paths for the UI context:
```typescript
// Added config directory path
const templateDir = path.join(process.cwd(), '..', 'templates')
const configDir = path.join(process.cwd(), '..', 'src', 'config')

// Pass both paths to TemplateEngine
const engine = new TemplateEngine(templateDir, configDir)
await engine.initialize()
```

### 4. Added Proper Error Handling
Enhanced initialization and validation in the API route:
```typescript
// Ensure initialization before validation
await engine.initialize()
const isValid = await engine.validateConfig(config)
```

## Result
✅ **UI now works correctly from any directory**
✅ **Config files are found at the correct paths**
✅ **Template generation works through the UI**
✅ **Backward compatibility maintained for CLI usage**

## File Changes
- `/src/config/ConfigManager.js` - Added customConfigDir parameter
- `/src/TemplateEngine.js` - Added customConfigDir parameter  
- `/ui/app/api/generate/route.ts` - Fixed paths and initialization

## Testing
Verified that:
- ✅ Template directory resolves correctly: `/home/raihan/Documents/template-engine-core/templates`
- ✅ Config directory resolves correctly: `/home/raihan/Documents/template-engine-core/src/config`
- ✅ Both `tokens.json` and `templates.json` are found
- ✅ TemplateEngine initializes successfully with custom paths
- ✅ Available templates are loaded: `['template1', 'template2', 'template3']`

The UI should now be able to generate projects without path-related errors!
