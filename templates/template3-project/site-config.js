/**
 * Site Configuration - Tech Startup Theme
 * Modern and innovative design for tech startups and SaaS companies
 */

export const siteConfig = {
  // Basic site information
  name: "{{SITENAME}}",
  description: "Innovative tech solutions with cutting-edge design",
  url: "{{SITE_URL}}", 
  
  // Branding
  logo: {
    src: "{{LOGO_URL}}",
    alt: "{{SITENAME}} Logo",
    width: 200,
    height: 50
  },
  
  // Design tokens - Tech Startup Theme
  theme: {
    colors: {
      primary: "{{PRIMARY_COLOR}}", // From design tokens
      secondary: "{{SECONDARY_COLOR}}", // From design tokens
      accent: "#8B5CF6", // Innovation Purple
      background: "#FFFFFF",
      foreground: "#0F172A",
    },
    typography: {
      fontFamily: "{{FONT_FAMILY}}", // From design tokens
      headingFont: "{{FONT_FAMILY}}",
    },
    spacing: {
      borderRadius: "{{BORDER_RADIUS}}", // From design tokens
      maxWidth: "1280px",
    }
  },
  
  // Features configuration
  features: {
    darkMode: true,
    i18n: true,
    analytics: true,
    seo: true,
    pwa: true,
  },
  
  // Template metadata
  template: {
    name: "Tech Startup",
    theme: "Modern and innovative design for tech startups and SaaS companies",
    version: "1.0.0",
    style: "tech-startup",
  }
};

export default siteConfig;
