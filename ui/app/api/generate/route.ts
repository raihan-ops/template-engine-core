import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import * as fs from 'fs-extra'
import archiver from 'archiver'

// Import our template engine
const TemplateEngine = require('../../../../src/TemplateEngine')

// Fix template directory path for UI context
const templateDir = path.join(process.cwd(), '..', 'templates')

export async function POST(request: NextRequest) {
  try {
    const config = await request.json()
    
    // Debug logging
    console.log('Template directory:', templateDir)
    console.log('Process cwd:', process.cwd())
    console.log('Template dir exists:', await fs.pathExists(templateDir))
    
    // Validate the configuration
    const engine = new TemplateEngine(templateDir)
    if (!engine.validateConfig(config)) {
      return NextResponse.json(
        { error: 'Invalid configuration' },
        { status: 400 }
      )
    }

    // Create temporary directories
    const tempDir = path.join(process.cwd(), 'temp')
    const outputDir = path.join(tempDir, `project-${Date.now()}`)
    await fs.ensureDir(tempDir)

    // Generate the project
    await engine.generateProject(config, outputDir)

    // Create ZIP file
    const zipFileName = `${config.sitename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-project.zip`
    const zipPath = path.join(process.cwd(), 'public', 'downloads', zipFileName)
    
    await fs.ensureDir(path.dirname(zipPath))
    
    // Create ZIP archive
    await new Promise<void>((resolve, reject) => {
      const output = fs.createWriteStream(zipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      output.on('close', () => resolve())
      archive.on('error', reject)
      
      archive.pipe(output)
      archive.directory(outputDir, false)
      archive.finalize()
    })

    // Cleanup temp directory
    await fs.remove(outputDir)

    return NextResponse.json({ 
      success: true, 
      downloadUrl: `/downloads/${zipFileName}` 
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
