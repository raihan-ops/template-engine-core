'use client'

import { useState, useEffect } from 'react'
import { Download, Settings, Palette, Code, Zap, Globe, Eye, Check } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  features: string[]
  preview: string
}

interface Config {
  sitename: string
  icon: string
  designToken: {
    primaryColor: string
    secondaryColor: string
    font: string
  }
  templateMode: 'single' | 'mixed'
  singleTemplate?: string
  templates?: {
    homepage: string
    productPage: string
    others: string
  }
}

const templates: Template[] = [
  {
    id: 'template1',
    name: 'Modern & Clean',
    description: 'Clean gradient designs with card-based layouts',
    features: ['Gradient backgrounds', 'Card layouts', 'Minimalist design', 'SaaS-friendly'],
    preview: 'bg-gradient-to-br from-blue-400 to-purple-500'
  },
  {
    id: 'template2', 
    name: 'Bold & Professional',
    description: 'Corporate-style design with professional typography',
    features: ['Professional layout', 'Business-focused', 'Clean typography', 'Enterprise-ready'],
    preview: 'bg-gradient-to-br from-gray-700 to-gray-900'
  },
  {
    id: 'template3',
    name: 'Creative & Animated',
    description: 'Glass morphism effects with gradient animations',
    features: ['Glass effects', 'Animations', 'Creative layouts', 'Modern design'],
    preview: 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500'
  }
]

const fonts = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Lato', 'Montserrat']

export default function Home() {
  const [config, setConfig] = useState<Config>({
    sitename: 'My Awesome Site',
    icon: '/favicon.ico',
    designToken: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      font: 'Inter'
    },
    templateMode: 'single',
    singleTemplate: 'template1'
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const keys = path.split('.')
      let current: any = newConfig
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const generateProject = async () => {
    setIsGenerating(true)
    setGenerationStatus('Preparing project...')
    setDownloadUrl('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const result = await response.json()
      setGenerationStatus('Project generated successfully!')
      setDownloadUrl(result.downloadUrl)
    } catch (error) {
      setGenerationStatus('Error generating project. Please try again.')
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Template Engine Core</h1>
              <p className="text-gray-600">Generate Next.js projects with beautiful templates</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Project Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={config.sitename}
                    onChange={(e) => updateConfig('sitename', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="My Awesome Site"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon URL
                  </label>
                  <input
                    type="text"
                    value={config.icon}
                    onChange={(e) => updateConfig('icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="/favicon.ico"
                  />
                </div>
              </div>
            </div>

            {/* Design Tokens */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Design Tokens</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={config.designToken.primaryColor}
                      onChange={(e) => updateConfig('designToken.primaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.designToken.primaryColor}
                      onChange={(e) => updateConfig('designToken.primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={config.designToken.secondaryColor}
                      onChange={(e) => updateConfig('designToken.secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.designToken.secondaryColor}
                      onChange={(e) => updateConfig('designToken.secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={config.designToken.font}
                    onChange={(e) => updateConfig('designToken.font', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Template Mode</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="single"
                      checked={config.templateMode === 'single'}
                      onChange={(e) => updateConfig('templateMode', e.target.value)}
                      className="mr-2"
                    />
                    Single Template
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="mixed"
                      checked={config.templateMode === 'mixed'}
                      onChange={(e) => {
                        updateConfig('templateMode', e.target.value)
                        if (e.target.value === 'mixed') {
                          updateConfig('templates', {
                            homepage: 'template1',
                            productPage: 'template2',
                            others: 'template3'
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    Mixed Templates
                  </label>
                </div>

                {config.templateMode === 'single' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        onClick={() => updateConfig('singleTemplate', template.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          config.singleTemplate === template.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-24 rounded-lg mb-3 ${template.preview}`}></div>
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { key: 'homepage', label: 'Homepage' },
                      { key: 'productPage', label: 'Product Page' },
                      { key: 'others', label: 'Other Pages (About, etc.)' }
                    ].map(page => (
                      <div key={page.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {page.label}
                        </label>
                        <select
                          value={config.templates?.[page.key as keyof typeof config.templates] || 'template1'}
                          onChange={(e) => updateConfig(`templates.${page.key}`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {templates.map(template => (
                            <option key={template.id} value={template.id}>
                              {template.name} - {template.description}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview & Generate */}
          <div className="space-y-6">
            
            {/* Template Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Preview
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.designToken.primaryColor }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.designToken.secondaryColor }}
                    ></div>
                  </div>
                  <h4 className="font-semibold" style={{ fontFamily: config.designToken.font }}>
                    {config.sitename}
                  </h4>
                  <p className="text-sm text-gray-600">Font: {config.designToken.font}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Pages Structure:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>📄 /home - Homepage</div>
                    <div>📄 /product - Product showcase</div>
                    <div>📄 /about - About page</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Generate Project
              </h3>
              
              {generationStatus && (
                <div className={`p-3 rounded-lg mb-4 ${
                  generationStatus.includes('Error') 
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : generationStatus.includes('successfully')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  <div className="flex items-center">
                    {generationStatus.includes('successfully') && (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    {generationStatus}
                  </div>
                </div>
              )}
              
              <button
                onClick={generateProject}
                disabled={isGenerating}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Project'
                )}
              </button>
              
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download
                  className="mt-4 w-full flex items-center justify-center py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Project ZIP
                </a>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features Included</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Next.js App Router
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  TypeScript Setup
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Tailwind CSS
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Responsive Design
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom Design Tokens
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Production Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
