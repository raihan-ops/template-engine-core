#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const chalk = require('chalk');

const program = new Command();

const TEMPLATES = ['template1', 'template2', 'template3'];
const TEMPLATE_DIR = path.join(__dirname, '../templates');
const OUTPUT_DIR = path.join(process.cwd(), 'generated-project');

// Token replacement mappings
const TOKEN_MAPPINGS = {
  'PRIMARY_COLOR_TOKEN': (config) => config.designToken.primaryColor,
  'SECONDARY_COLOR_TOKEN': (config) => config.designToken.secondaryColor,
  'FONT_TOKEN': (config) => config.designToken.font,
  'FONT_TOKEN_VAR': (config) => config.designToken.font,
  'SITENAME_TOKEN': (config) => config.sitename,
  'ICON_TOKEN': (config) => config.icon
};

// File extensions to process for token replacement
const TEXT_FILE_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.md', '.html'];

async function promptForConfiguration() {
  console.log(chalk.blue('🚀 Welcome to Template Engine Core!'));
  console.log(chalk.gray('Let\'s configure your Next.js project...\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'sitename',
      message: 'What is your site name?',
      default: 'My Awesome Site'
    },
    {
      type: 'input',
      name: 'icon',
      message: 'Icon URL (favicon):',
      default: '/favicon.ico'
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary color (hex):',
      default: '#3B82F6',
      validate: (input) => {
        return /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color (e.g., #3B82F6)';
      }
    },
    {
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary color (hex):',
      default: '#10B981',
      validate: (input) => {
        return /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color (e.g., #10B981)';
      }
    },
    {
      type: 'input',
      name: 'font',
      message: 'Font family:',
      default: 'Inter'
    },
    {
      type: 'list',
      name: 'templateMode',
      message: 'Template mode:',
      choices: [
        { name: 'Single template for all pages', value: 'single' },
        { name: 'Mixed templates (different template per page)', value: 'mixed' }
      ]
    }
  ]);

  let templateConfig = {};

  if (answers.templateMode === 'single') {
    const singleTemplate = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: TEMPLATES.map(t => ({ name: `${t} (${getTemplateDescription(t)})`, value: t }))
      }
    ]);
    templateConfig.singleTemplate = singleTemplate.template;
  } else {
    const mixedTemplates = await inquirer.prompt([
      {
        type: 'list',
        name: 'homepage',
        message: 'Template for homepage:',
        choices: TEMPLATES.map(t => ({ name: `${t} (${getTemplateDescription(t)})`, value: t }))
      },
      {
        type: 'list',
        name: 'productPage',
        message: 'Template for product page:',
        choices: TEMPLATES.map(t => ({ name: `${t} (${getTemplateDescription(t)})`, value: t }))
      },
      {
        type: 'list',
        name: 'others',
        message: 'Template for other pages (about, etc.):',
        choices: TEMPLATES.map(t => ({ name: `${t} (${getTemplateDescription(t)})`, value: t }))
      }
    ]);
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

function getTemplateDescription(template) {
  const descriptions = {
    template1: 'Modern & Clean',
    template2: 'Bold & Professional', 
    template3: 'Creative & Animated'
  };
  return descriptions[template] || template;
}

async function generateProject(config, outputPath) {
  console.log(chalk.yellow('\n📁 Generating project...'));

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
    // Use homepage template as base for mixed mode
    baseTemplate = config.templates.homepage;
  }

  console.log(chalk.blue(`Using ${baseTemplate} as base template`));

  // Copy base template
  const baseTemplatePath = path.join(TEMPLATE_DIR, `${baseTemplate}-project`);
  await fs.copy(baseTemplatePath, outputPath);

  // Handle mixed mode - overlay specific page files
  if (config.templateMode === 'mixed') {
    const pageTemplateMap = {
      'home': config.templates.homepage,
      'product': config.templates.productPage,
      'about': config.templates.others
    };

    for (const [pageName, templateName] of Object.entries(pageTemplateMap)) {
      if (templateName !== baseTemplate) {
        console.log(chalk.blue(`Overlaying ${pageName} page from ${templateName}`));
        
        const sourcePagePath = path.join(TEMPLATE_DIR, `${templateName}-project/app/(pages)/${pageName}/page.tsx`);
        const targetPagePath = path.join(outputPath, `app/(pages)/${pageName}/page.tsx`);
        
        if (await fs.pathExists(sourcePagePath)) {
          await fs.copy(sourcePagePath, targetPagePath);
        }
      }
    }
  }

  // Apply token replacements
  console.log(chalk.yellow('🔄 Applying design tokens...'));
  await applyTokenReplacements(outputPath, config);

  console.log(chalk.green('✅ Project generated successfully!'));
  return outputPath;
}

async function applyTokenReplacements(projectPath, config) {
  async function processFile(filePath) {
    const ext = path.extname(filePath);
    if (!TEXT_FILE_EXTENSIONS.includes(ext)) {
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
        // Skip node_modules and other build directories
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

async function createZip(projectPath, config) {
  console.log(chalk.yellow('\n📦 Creating ZIP archive...'));
  
  const zipPath = path.join(path.dirname(projectPath), `${config.sitename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-project.zip`);
  
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(chalk.green(`📦 ZIP created: ${zipPath} (${archive.pointer()} bytes)`));
      resolve(zipPath);
    });

    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(projectPath, false);
    archive.finalize();
  });
}

// CLI Commands
program
  .name('template-engine')
  .description('Generate Next.js projects from templates with design tokens')
  .version('1.0.0');

program
  .command('generate')
  .alias('gen')
  .description('Generate a new project from templates')
  .option('-c, --config <path>', 'Path to configuration JSON file')
  .option('-o, --output <path>', 'Output directory path')
  .option('--no-zip', 'Skip creating ZIP archive')
  .action(async (options) => {
    try {
      let config;
      
      if (options.config) {
        // Load config from file
        const configPath = path.resolve(options.config);
        if (!(await fs.pathExists(configPath))) {
          console.error(chalk.red(`Configuration file not found: ${configPath}`));
          process.exit(1);
        }
        config = await fs.readJson(configPath);
        console.log(chalk.blue('📄 Configuration loaded from file'));
      } else {
        // Interactive prompts
        config = await promptForConfiguration();
      }

      // Validate configuration
      if (!validateConfig(config)) {
        console.error(chalk.red('❌ Invalid configuration'));
        process.exit(1);
      }

      const outputPath = options.output ? path.resolve(options.output) : OUTPUT_DIR;
      
      // Generate project
      await generateProject(config, outputPath);
      
      // Create ZIP if requested
      if (options.zip !== false) {
        await createZip(outputPath, config);
      }

      console.log(chalk.green(`\n🎉 Project ready at: ${outputPath}`));
      console.log(chalk.cyan('\n📝 Next steps:'));
      console.log(chalk.gray(`   cd ${path.basename(outputPath)}`));
      console.log(chalk.gray(`   npm install`));
      console.log(chalk.gray(`   npm run dev`));
      
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate a configuration file')
  .argument('<config>', 'Path to configuration JSON file')
  .action(async (configPath) => {
    try {
      const fullPath = path.resolve(configPath);
      if (!(await fs.pathExists(fullPath))) {
        console.error(chalk.red(`Configuration file not found: ${fullPath}`));
        process.exit(1);
      }

      const config = await fs.readJson(fullPath);
      
      if (validateConfig(config)) {
        console.log(chalk.green('✅ Configuration is valid'));
      } else {
        console.error(chalk.red('❌ Configuration is invalid'));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list-templates')
  .alias('ls')
  .description('List available templates')
  .action(() => {
    console.log(chalk.blue('📋 Available templates:\n'));
    TEMPLATES.forEach(template => {
      console.log(chalk.green(`  ${template}`), chalk.gray(`- ${getTemplateDescription(template)}`));
    });
  });

function validateConfig(config) {
  // Required fields
  const required = ['sitename', 'icon', 'designToken', 'templateMode'];
  for (const field of required) {
    if (!config[field]) {
      console.error(chalk.red(`Missing required field: ${field}`));
      return false;
    }
  }

  // Design token validation
  const designTokenRequired = ['primaryColor', 'secondaryColor', 'font'];
  for (const field of designTokenRequired) {
    if (!config.designToken[field]) {
      console.error(chalk.red(`Missing design token field: ${field}`));
      return false;
    }
  }

  // Color validation
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  if (!hexColorRegex.test(config.designToken.primaryColor)) {
    console.error(chalk.red('Primary color must be a valid hex color'));
    return false;
  }
  if (!hexColorRegex.test(config.designToken.secondaryColor)) {
    console.error(chalk.red('Secondary color must be a valid hex color'));
    return false;
  }

  // Template mode validation
  if (!['single', 'mixed'].includes(config.templateMode)) {
    console.error(chalk.red('Template mode must be "single" or "mixed"'));
    return false;
  }

  if (config.templateMode === 'single') {
    if (!config.singleTemplate || !TEMPLATES.includes(config.singleTemplate)) {
      console.error(chalk.red('Invalid single template'));
      return false;
    }
  } else if (config.templateMode === 'mixed') {
    if (!config.templates) {
      console.error(chalk.red('Missing templates configuration for mixed mode'));
      return false;
    }
    
    const requiredTemplatePages = ['homepage', 'productPage', 'others'];
    for (const page of requiredTemplatePages) {
      if (!config.templates[page] || !TEMPLATES.includes(config.templates[page])) {
        console.error(chalk.red(`Invalid template for ${page}`));
        return false;
      }
    }
  }

  return true;
}

program.parse();
