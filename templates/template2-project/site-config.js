/**
 * Site Configuration - Creative Agency Theme
 * Bold and artistic design for creative agencies and studios
 */

export const siteConfig = {
  // Basic site information
  name: "{{SITENAME}}",
  description: "Creative solutions with bold and artistic design",
  url: "{{SITE_URL}}", 
  
  // Branding
  logo: {
    src: "{{LOGO_URL}}",
    alt: "{{SITENAME}} Logo",
    width: 200,
    height: 50
  },
  
  // Design tokens - Creative Agency Theme
  theme: {
    colors: {
      primary: "{{PRIMARY_COLOR}}", // From design tokens
      secondary: "{{SECONDARY_COLOR}}", // From design tokens
      accent: "#EF4444", // Vibrant Red
      background: "#FFFFFF",
      foreground: "#1F2937",
    },
    typography: {
      fontFamily: "{{FONT_FAMILY}}", // From design tokens
      headingFont: "{{FONT_FAMILY}}",
    },
    spacing: {
      borderRadius: "{{BORDER_RADIUS}}", // From design tokens
      maxWidth: "1400px",
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
    name: "Creative Agency",
    theme: "Bold and artistic design for creative agencies, studios, and portfolio websites",
    version: "1.0.0",
    style: "creative-agency",
  }
};

export default siteConfig;
