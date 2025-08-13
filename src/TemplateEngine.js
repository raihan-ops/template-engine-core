const fs = require('fs-extra');
const path = require('path');
const ConfigManager = require('./config/ConfigManager');

class TemplateEngine {
  constructor(customTemplateDir = null, customConfigDir = null) {
    this.configManager = new ConfigManager(customConfigDir);
    this.customTemplateDir = customTemplateDir;
    this.templates = null;
    this.templateDir = null;
    this.tokenMappings = null;
    this.textFileExtensions = null;
  }

  /**
   * Initialize the template engine
   */
  async initialize() {
    this.templates = await this.configManager.getAvailableTemplates();
    this.templateDir = this.customTemplateDir || await this.configManager.getTemplateDirectory();
    this.tokenMappings = await this.configManager.getTokenMappings();
    this.textFileExtensions = await this.configManager.getProcessableExtensions();
  }

  async generateProject(config, outputPath) {
    // Initialize if not already done
    if (!this.templates) {
      await this.initialize();
    }

    // Validate configuration
    const validation = await this.configManager.validateUserConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
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

    // Handle homepage placement - always move homepage content to root
    await this.setupHomepage(config, outputPath, baseTemplate);

    // Handle mixed mode - overlay specific page files
    if (config.templateMode === 'mixed') {
      await this.applyMixedTemplates(config, outputPath, baseTemplate);
    }

    // Apply token replacements
    await this.applyTokenReplacements(outputPath, config);

    return outputPath;
  }

  async applyMixedTemplates(config, outputPath, baseTemplate) {
    const availablePages = await this.configManager.getAvailablePages();
    const pageTemplateMap = {
      '/': config.templates.homepage,
      'product': config.templates.productPage,
      'about': config.templates.others
    };

    for (const [pageName, templateName] of Object.entries(pageTemplateMap)) {
      // Skip homepage as it's handled by setupHomepage method
      if (pageName === '/') {
        continue;
      }

      if (templateName !== baseTemplate) {
        // Try .js first, then .tsx as fallback
        let sourcePagePath = path.join(this.templateDir, `${templateName}-project/app/(pages)/${pageName}/page.js`);
        if (!await fs.pathExists(sourcePagePath)) {
          sourcePagePath = path.join(this.templateDir, `${templateName}-project/app/(pages)/${pageName}/page.tsx`);
        }

        const targetPagePath = path.join(outputPath, `app/(pages)/${pageName}/page.js`);
        
        if (await fs.pathExists(sourcePagePath)) {
          await fs.copy(sourcePagePath, targetPagePath);
        }
      }
    }
  }

  async setupHomepage(config, outputPath, baseTemplate) {
    // In mixed mode, we might need to replace the homepage with a different template's homepage
    if (config.templateMode === 'mixed') {
      const homepageTemplate = config.templates.homepage;
      
      // If the homepage template is different from the base template, copy it
      if (homepageTemplate !== baseTemplate) {
        const homePageSourcePath = path.join(this.templateDir, `${homepageTemplate}-project/src/app/page.js`);
        const targetPagePath = path.join(outputPath, 'src/app/page.js');
        
        if (await fs.pathExists(homePageSourcePath)) {
          await fs.copy(homePageSourcePath, targetPagePath);
        }
      }
    }
    
    // Ensure no /home directory exists (cleanup from old structure)
    const homePageDirPath = path.join(outputPath, 'src/app/(pages)/home');
    if (await fs.pathExists(homePageDirPath)) {
      await fs.remove(homePageDirPath);
    }
  }

  async applyTokenReplacements(projectPath, config) {
    async function processFile(filePath, tokenMappings, textFileExtensions) {
      const ext = path.extname(filePath);
      if (!textFileExtensions.includes(ext)) {
        return;
      }

      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;

      // Apply all token replacements
      for (const [token, getValue] of Object.entries(tokenMappings)) {
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

    async function processDirectory(dirPath, tokenMappings, textFileExtensions) {
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
            await processDirectory(fullPath, tokenMappings, textFileExtensions);
          }
        } else {
          await processFile(fullPath, tokenMappings, textFileExtensions);
        }
      }
    }

    await processDirectory(projectPath, this.tokenMappings, this.textFileExtensions);
  }

  async validateConfig(config) {
    const validation = await this.configManager.validateUserConfig(config);
    return validation.isValid;
  }

  async getAvailableTemplates() {
    if (!this.templates) {
      await this.initialize();
    }
    return this.templates;
  }

  async getTemplatesInfo() {
    return await this.configManager.getAllTemplatesInfo();
  }

  async getTokensInfo() {
    return await this.configManager.getTokensInfo();
  }

  async discoverTemplates() {
    return await this.configManager.discoverTemplates();
  }
}

module.exports = TemplateEngine;
