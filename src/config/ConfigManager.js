const fs = require('fs-extra');
const path = require('path');

/**
 * Configuration Manager - Handles dynamic loading of templates and tokens
 */
class ConfigManager {
  constructor() {
    this.templatesConfig = null;
    this.tokensConfig = null;
    this.configDir = path.join(__dirname, '../config');
  }

  /**
   * Load templates configuration
   */
  async loadTemplatesConfig() {
    if (!this.templatesConfig) {
      const configPath = path.join(this.configDir, 'templates.json');
      this.templatesConfig = await fs.readJson(configPath);
    }
    return this.templatesConfig;
  }

  /**
   * Load tokens configuration
   */
  async loadTokensConfig() {
    if (!this.tokensConfig) {
      const configPath = path.join(this.configDir, 'tokens.json');
      this.tokensConfig = await fs.readJson(configPath);
    }
    return this.tokensConfig;
  }

  /**
   * Get available templates
   */
  async getAvailableTemplates() {
    const config = await this.loadTemplatesConfig();
    return Object.keys(config.templates);
  }

  /**
   * Get template information
   */
  async getTemplateInfo(templateName) {
    const config = await this.loadTemplatesConfig();
    return config.templates[templateName];
  }

  /**
   * Get all template information
   */
  async getAllTemplatesInfo() {
    const config = await this.loadTemplatesConfig();
    return config.templates;
  }

  /**
   * Get template directory path
   */
  async getTemplateDirectory() {
    const config = await this.loadTemplatesConfig();
    return path.join(__dirname, '../../templates');
  }

  /**
   * Get available pages from templates
   */
  async getAvailablePages() {
    const config = await this.loadTemplatesConfig();
    return config.defaultPages;
  }

  /**
   * Get token mappings
   */
  async getTokenMappings() {
    const config = await this.tokensConfig || await this.loadTokensConfig();
    const mappings = {};
    
    for (const [tokenName, tokenConfig] of Object.entries(config.tokens)) {
      mappings[tokenName] = this.createTokenFunction(tokenConfig.getValue);
    }
    
    return mappings;
  }

  /**
   * Get token information
   */
  async getTokensInfo() {
    const config = await this.loadTokensConfig();
    return config.tokens;
  }

  /**
   * Get file extensions for processing
   */
  async getProcessableExtensions() {
    const config = await this.loadTokensConfig();
    return config.fileExtensions;
  }

  /**
   * Get validation patterns
   */
  async getValidationPatterns() {
    const config = await this.loadTokensConfig();
    return config.validation;
  }

  /**
   * Create token replacement function from getValue string
   */
  createTokenFunction(getValueString) {
    return new Function('config', `return ${getValueString}`);
  }

  /**
   * Validate configuration based on token definitions
   */
  async validateUserConfig(userConfig) {
    const tokensInfo = await this.getTokensInfo();
    const validationPatterns = await this.getValidationPatterns();
    const templates = await this.getAvailableTemplates();

    const errors = [];

    // Validate required fields based on tokens
    for (const [tokenName, tokenConfig] of Object.entries(tokensInfo)) {
      try {
        const getValue = this.createTokenFunction(tokenConfig.getValue);
        const value = getValue(userConfig);
        
        if (!value) {
          errors.push(`Missing value for ${tokenConfig.description}`);
          continue;
        }

        // Type-specific validation
        if (tokenConfig.validation && validationPatterns[tokenConfig.validation]) {
          const pattern = new RegExp(validationPatterns[tokenConfig.validation], 'i');
          if (!pattern.test(value)) {
            errors.push(`Invalid ${tokenConfig.description}: ${value}`);
          }
        }
      } catch (error) {
        errors.push(`Error validating ${tokenConfig.description}: ${error.message}`);
      }
    }

    // Template mode validation
    if (!['single', 'mixed'].includes(userConfig.templateMode)) {
      errors.push('Template mode must be "single" or "mixed"');
    }

    // Template existence validation
    if (userConfig.templateMode === 'single') {
      if (!userConfig.singleTemplate || !templates.includes(userConfig.singleTemplate)) {
        errors.push('Invalid single template selection');
      }
    } else if (userConfig.templateMode === 'mixed') {
      if (!userConfig.templates) {
        errors.push('Missing templates configuration for mixed mode');
      } else {
        const pages = await this.getAvailablePages();
        const requiredTemplatePages = ['homepage', 'productPage', 'others'];
        
        for (const page of requiredTemplatePages) {
          if (!userConfig.templates[page] || !templates.includes(userConfig.templates[page])) {
            errors.push(`Invalid template for ${page}`);
          }
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Discover templates dynamically from file system
   */
  async discoverTemplates() {
    const templateDir = await this.getTemplateDirectory();
    const items = await fs.readdir(templateDir);
    const templates = [];

    for (const item of items) {
      const itemPath = path.join(templateDir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory() && item.endsWith('-project')) {
        const templateName = item.replace('-project', '');
        templates.push(templateName);
      }
    }

    return templates;
  }
}

module.exports = ConfigManager;
