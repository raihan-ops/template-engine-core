const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const ConfigManager = require('../config/ConfigManager');

/**
 * CLI Service - Handles CLI-specific functionality like prompts and validation
 */
class CLIService {
  constructor() {
    this.configManager = new ConfigManager();
  }

  /**
   * Generate interactive prompts based on token configuration
   */
  async promptForConfiguration() {
    console.log(chalk.blue('🚀 Welcome to Template Engine Core!'));
    console.log(chalk.gray('Let\'s configure your Next.js project...\n'));

    const tokensInfo = await this.configManager.getTokensInfo();
    const templatesInfo = await this.configManager.getAllTemplatesInfo();
    const templates = Object.keys(templatesInfo);

    // Generate prompts dynamically based on token configuration
    const prompts = [];

    // Site name prompt
    if (tokensInfo.SITENAME_TOKEN) {
      prompts.push({
        type: 'input',
        name: 'sitename',
        message: tokensInfo.SITENAME_TOKEN.description + ':',
        default: tokensInfo.SITENAME_TOKEN.default
      });
    }

    // Icon prompt
    if (tokensInfo.ICON_TOKEN) {
      prompts.push({
        type: 'input',
        name: 'icon',
        message: tokensInfo.ICON_TOKEN.description + ':',
        default: tokensInfo.ICON_TOKEN.default
      });
    }

    // Color prompts
    const validationPatterns = await this.configManager.getValidationPatterns();
    
    if (tokensInfo.PRIMARY_COLOR_TOKEN) {
      prompts.push({
        type: 'input',
        name: 'primaryColor',
        message: tokensInfo.PRIMARY_COLOR_TOKEN.description + ':',
        default: tokensInfo.PRIMARY_COLOR_TOKEN.default,
        validate: (input) => {
          const pattern = new RegExp(validationPatterns[tokensInfo.PRIMARY_COLOR_TOKEN.validation], 'i');
          return pattern.test(input) || `Please enter a valid ${tokensInfo.PRIMARY_COLOR_TOKEN.validation} color (e.g., ${tokensInfo.PRIMARY_COLOR_TOKEN.default})`;
        }
      });
    }

    if (tokensInfo.SECONDARY_COLOR_TOKEN) {
      prompts.push({
        type: 'input',
        name: 'secondaryColor',
        message: tokensInfo.SECONDARY_COLOR_TOKEN.description + ':',
        default: tokensInfo.SECONDARY_COLOR_TOKEN.default,
        validate: (input) => {
          const pattern = new RegExp(validationPatterns[tokensInfo.SECONDARY_COLOR_TOKEN.validation], 'i');
          return pattern.test(input) || `Please enter a valid ${tokensInfo.SECONDARY_COLOR_TOKEN.validation} color (e.g., ${tokensInfo.SECONDARY_COLOR_TOKEN.default})`;
        }
      });
    }

    // Font prompt
    if (tokensInfo.FONT_TOKEN) {
      prompts.push({
        type: 'input',
        name: 'font',
        message: tokensInfo.FONT_TOKEN.description + ':',
        default: tokensInfo.FONT_TOKEN.default
      });
    }

    // Template mode prompt
    prompts.push({
      type: 'list',
      name: 'templateMode',
      message: 'Template mode:',
      choices: [
        { name: 'Single template for all pages', value: 'single' },
        { name: 'Mixed templates (different template per page)', value: 'mixed' }
      ]
    });

    const answers = await inquirer.prompt(prompts);
    let templateConfig = {};

    if (answers.templateMode === 'single') {
      const singleTemplate = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Choose a template:',
          choices: templates.map(t => ({ 
            name: `${t} (${templatesInfo[t].name})`, 
            value: t 
          }))
        }
      ]);
      templateConfig.singleTemplate = singleTemplate.template;
    } else {
      const availablePages = await this.configManager.getAvailablePages();
      const mixedPrompts = [
        {
          type: 'list',
          name: 'homepage',
          message: 'Template for homepage:',
          choices: templates.map(t => ({ 
            name: `${t} (${templatesInfo[t].name})`, 
            value: t 
          }))
        },
        {
          type: 'list',
          name: 'productPage',
          message: 'Template for product page:',
          choices: templates.map(t => ({ 
            name: `${t} (${templatesInfo[t].name})`, 
            value: t 
          }))
        },
        {
          type: 'list',
          name: 'others',
          message: 'Template for other pages (about, etc.):',
          choices: templates.map(t => ({ 
            name: `${t} (${templatesInfo[t].name})`, 
            value: t 
          }))
        }
      ];

      const mixedTemplates = await inquirer.prompt(mixedPrompts);
      templateConfig.templates = mixedTemplates;
    }

    return {
      sitename: answers.sitename,
      icon: answers.icon,
      designToken: {
        primaryColor: answers.primaryColor,
        secondaryColor: answers.secondaryColor,
        font: answers.font
      },
      templateMode: answers.templateMode,
      ...templateConfig
    };
  }

  /**
   * Display validation errors in a user-friendly way
   */
  displayValidationErrors(errors) {
    console.error(chalk.red('❌ Configuration validation failed:'));
    errors.forEach(error => {
      console.error(chalk.red(`   • ${error}`));
    });
  }

  /**
   * Display available templates
   */
  async displayAvailableTemplates() {
    const templatesInfo = await this.configManager.getAllTemplatesInfo();
    
    console.log(chalk.blue('📋 Available templates:\n'));
    Object.entries(templatesInfo).forEach(([templateName, info]) => {
      console.log(chalk.green(`  ${templateName}`), chalk.gray(`- ${info.name}`));
      console.log(chalk.gray(`    ${info.description}`));
      console.log('');
    });
  }

  /**
   * Display project generation progress
   */
  displayProgress(step, message) {
    const steps = {
      'cleaning': '🧹',
      'copying': '📁',
      'overlaying': '🔄', 
      'tokens': '🎨',
      'zipping': '📦',
      'complete': '✅'
    };
    
    const icon = steps[step] || '⚙️';
    console.log(chalk.yellow(`${icon} ${message}`));
  }

  /**
   * Display success message with next steps
   */
  displaySuccess(outputPath, zipPath = null) {
    console.log(chalk.green(`\n🎉 Project ready at: ${outputPath}`));
    
    if (zipPath) {
      console.log(chalk.green(`📦 ZIP archive: ${zipPath}`));
    }
    
    console.log(chalk.cyan('\n📝 Next steps:'));
    console.log(chalk.gray(`   cd ${path.basename(outputPath)}`));
    console.log(chalk.gray(`   npm install`));
    console.log(chalk.gray(`   npm run dev`));
  }
}

module.exports = CLIService;
