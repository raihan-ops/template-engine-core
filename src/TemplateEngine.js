const fs = require('fs-extra');
const path = require('path');

const TEMPLATES = ['template1', 'template2', 'template3'];
const TEMPLATE_DIR = path.join(__dirname, '../templates');

// Token replacement mappings
const TOKEN_MAPPINGS = {
  'PRIMARY_COLOR_TOKEN': (config) => config.designToken.primaryColor,
  'SECONDARY_COLOR_TOKEN': (config) => config.designToken.secondaryColor,
  'FONT_TOKEN': (config) => config.designToken.font,
  'FONT_TOKEN_VAR': (config) => config.designToken.font,
  'SITENAME_TOKEN': (config) => config.sitename,
  'ICON_TOKEN': (config) => config.icon
};

class TemplateEngine {
  constructor(customTemplateDir = null) {
    this.templates = TEMPLATES;
    this.templateDir = customTemplateDir || TEMPLATE_DIR;
  }

  async generateProject(config, outputPath) {
    // Validate configuration
    if (!this.validateConfig(config)) {
      throw new Error('Invalid configuration');
    }

    // Clean output directory
    if (await fs.pathExists(outputPath)) {
      await fs.remove(outputPath);
    }
    await fs.ensureDir(outputPath);

    // Determine base template
    let baseTemplate;
    if (config.templateMode === 'single') {
      baseTemplate = config.singleTemplate;
    } else {
      baseTemplate = config.templates.homepage;
    }

    // Copy base template
    const baseTemplatePath = path.join(this.templateDir, `${baseTemplate}-project`);
    await fs.copy(baseTemplatePath, outputPath);

    // Handle mixed mode - overlay specific page files
    if (config.templateMode === 'mixed') {
      await this.applyMixedTemplates(config, outputPath, baseTemplate);
    }

    // Apply token replacements
    await this.applyTokenReplacements(outputPath, config);

    return outputPath;
  }

  async applyMixedTemplates(config, outputPath, baseTemplate) {
    const pageTemplateMap = {
      'home': config.templates.homepage,
      'product': config.templates.productPage,
      'about': config.templates.others
    };

    for (const [pageName, templateName] of Object.entries(pageTemplateMap)) {
      if (templateName !== baseTemplate) {
        const sourcePagePath = path.join(this.templateDir, `${templateName}-project/app/(pages)/${pageName}/page.tsx`);
        const targetPagePath = path.join(outputPath, `app/(pages)/${pageName}/page.tsx`);
        
        if (await fs.pathExists(sourcePagePath)) {
          await fs.copy(sourcePagePath, targetPagePath);
        }
      }
    }
  }

  async applyTokenReplacements(projectPath, config) {
    const textFileExtensions = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.md', '.html'];

    async function processFile(filePath) {
      const ext = path.extname(filePath);
      if (!textFileExtensions.includes(ext)) {
        return;
      }

      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;

      // Apply all token replacements
      for (const [token, getValue] of Object.entries(TOKEN_MAPPINGS)) {
        const value = getValue(config);
        if (content.includes(token)) {
          content = content.replace(new RegExp(token, 'g'), value);
          modified = true;
        }
      }

      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
      }
    }

    async function processDirectory(dirPath) {
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
            await processDirectory(fullPath);
          }
        } else {
          await processFile(fullPath);
        }
      }
    }

    await processDirectory(projectPath);
  }

  validateConfig(config) {
    // Required fields
    const required = ['sitename', 'icon', 'designToken', 'templateMode'];
    for (const field of required) {
      if (!config[field]) {
        return false;
      }
    }

    // Design token validation
    const designTokenRequired = ['primaryColor', 'secondaryColor', 'font'];
    for (const field of designTokenRequired) {
      if (!config.designToken[field]) {
        return false;
      }
    }

    // Color validation
    const hexColorRegex = /^#[0-9A-F]{6}$/i;
    if (!hexColorRegex.test(config.designToken.primaryColor) || 
        !hexColorRegex.test(config.designToken.secondaryColor)) {
      return false;
    }

    // Template mode validation
    if (!['single', 'mixed'].includes(config.templateMode)) {
      return false;
    }

    if (config.templateMode === 'single') {
      if (!config.singleTemplate || !this.templates.includes(config.singleTemplate)) {
        return false;
      }
    } else if (config.templateMode === 'mixed') {
      if (!config.templates) {
        return false;
      }
      
      const requiredTemplatePages = ['homepage', 'productPage', 'others'];
      for (const page of requiredTemplatePages) {
        if (!config.templates[page] || !this.templates.includes(config.templates[page])) {
          return false;
        }
      }
    }

    return true;
  }

  getAvailableTemplates() {
    return this.templates;
  }
}

module.exports = TemplateEngine;
