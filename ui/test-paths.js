const path = require('path');
const fs = require('fs-extra');

// Test paths from UI context
console.log('Current working directory:', process.cwd());

const templateDir = path.join(process.cwd(), '..', 'templates');
const configDir = path.join(process.cwd(), '..', 'src', 'config');

console.log('Template directory:', templateDir);
console.log('Config directory:', configDir);

// Check if paths exist
async function checkPaths() {
  try {
    const templateExists = await fs.pathExists(templateDir);
    const configExists = await fs.pathExists(configDir);
    
    console.log('Template dir exists:', templateExists);
    console.log('Config dir exists:', configExists);
    
    if (configExists) {
      const tokensPath = path.join(configDir, 'tokens.json');
      const templatesPath = path.join(configDir, 'templates.json');
      
      console.log('Tokens file exists:', await fs.pathExists(tokensPath));
      console.log('Templates file exists:', await fs.pathExists(templatesPath));
    }
    
    // Test the TemplateEngine with custom paths
    const TemplateEngine = require('../src/TemplateEngine');
    const engine = new TemplateEngine(templateDir, configDir);
    
    console.log('Testing TemplateEngine initialization...');
    await engine.initialize();
    
    console.log('Available templates:', await engine.getAvailableTemplates());
    console.log('✅ TemplateEngine works with custom paths!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkPaths();
