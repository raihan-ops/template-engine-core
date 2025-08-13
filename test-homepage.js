const TemplateEngine = require('./src/TemplateEngine');
const fs = require('fs-extra');

async function testHomepage() {
  const engine = new TemplateEngine();
  
  const config = {
    sitename: "Test Site",
    icon: "/favicon.ico",
    designToken: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      font: "Inter",
      borderRadius: "8px"
    },
    templateMode: "single",
    singleTemplate: "template1"
  };

  const outputPath = '/tmp/test-debug-homepage';
  
  // Clean output directory
  if (await fs.pathExists(outputPath)) {
    await fs.remove(outputPath);
  }
  
  console.log('Starting project generation...');
  try {
    await engine.generateProject(config, outputPath);
    console.log('Project generated successfully!');
    
    // Check the results
    const rootPageExists = await fs.pathExists(`${outputPath}/src/app/page.js`);
    const homePageExists = await fs.pathExists(`${outputPath}/src/app/(pages)/home/page.js`);
    
    console.log(`Root page.js exists: ${rootPageExists}`);
    console.log(`Home page.js exists: ${homePageExists}`);
    
    if (rootPageExists) {
      const rootContent = await fs.readFile(`${outputPath}/src/app/page.js`, 'utf8');
      console.log('Root page content preview:', rootContent.substring(0, 200));
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testHomepage();
