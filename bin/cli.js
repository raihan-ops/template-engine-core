#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const chalk = require('chalk');

const TemplateEngine = require('../src/TemplateEngine');
const CLIService = require('../src/services/CLIService');

const program = new Command();
const OUTPUT_DIR = path.join(process.cwd(), 'generated-project');

async function generateProject(config, outputPath) {
  const cliService = new CLIService();
  const templateEngine = new TemplateEngine();

  cliService.displayProgress('copying', 'Generating project...');
  
  try {
    await templateEngine.generateProject(config, outputPath);
    cliService.displayProgress('complete', 'Project generated successfully!');
    return outputPath;
  } catch (error) {
    throw new Error(`Project generation failed: ${error.message}`);
  }
}

async function createZip(projectPath, config) {
  const cliService = new CLIService();
  cliService.displayProgress('zipping', 'Creating ZIP archive...');
  
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
      const cliService = new CLIService();
      const templateEngine = new TemplateEngine();
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
        config = await cliService.promptForConfiguration();
      }

      // Validate configuration
      const validation = await templateEngine.configManager.validateUserConfig(config);
      if (!validation.isValid) {
        cliService.displayValidationErrors(validation.errors);
        process.exit(1);
      }

      const outputPath = options.output ? path.resolve(options.output) : OUTPUT_DIR;
      
      // Generate project
      await generateProject(config, outputPath);
      
      // Create ZIP if requested
      let zipPath = null;
      if (options.zip !== false) {
        zipPath = await createZip(outputPath, config);
      }

      cliService.displaySuccess(outputPath, zipPath);
      
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
      const templateEngine = new TemplateEngine();
      const cliService = new CLIService();
      
      const fullPath = path.resolve(configPath);
      if (!(await fs.pathExists(fullPath))) {
        console.error(chalk.red(`Configuration file not found: ${fullPath}`));
        process.exit(1);
      }

      const config = await fs.readJson(fullPath);
      const validation = await templateEngine.configManager.validateUserConfig(config);
      
      if (validation.isValid) {
        console.log(chalk.green('✅ Configuration is valid'));
      } else {
        cliService.displayValidationErrors(validation.errors);
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
  .action(async () => {
    try {
      const cliService = new CLIService();
      await cliService.displayAvailableTemplates();
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('discover-templates')
  .description('Discover templates from filesystem')
  .action(async () => {
    try {
      const templateEngine = new TemplateEngine();
      const discovered = await templateEngine.discoverTemplates();
      console.log(chalk.blue('🔍 Discovered templates:\n'));
      discovered.forEach(template => {
        console.log(chalk.green(`  ${template}`));
      });
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list-tokens')
  .description('List available design tokens')
  .action(async () => {
    try {
      const templateEngine = new TemplateEngine();
      const tokensInfo = await templateEngine.getTokensInfo();
      
      console.log(chalk.blue('🎨 Available design tokens:\n'));
      Object.entries(tokensInfo).forEach(([tokenName, info]) => {
        console.log(chalk.green(`  ${tokenName}`));
        console.log(chalk.gray(`    Description: ${info.description}`));
        console.log(chalk.gray(`    Type: ${info.type}`));
        console.log(chalk.gray(`    Default: ${info.default}`));
        if (info.validation) {
          console.log(chalk.gray(`    Validation: ${info.validation}`));
        }
        console.log('');
      });
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();
