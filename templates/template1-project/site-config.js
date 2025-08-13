/**
 * Site Configuration - Modern Corporate Theme
 * Professional and clean design for corporate websites
 */

export const siteConfig = {
  // Basic site information
  name: "{{SITENAME}}",
  description: "Professional corporate solutions with modern design",
  url: "{{SITE_URL}}", 
  
  // Branding
  logo: {
    src: "{{LOGO_URL}}",
    alt: "{{SITENAME}} Logo",
    width: 200,
    height: 50
  },
  
  // Design tokens - Modern Corporate Theme
  theme: {
    colors: {
      primary: "{{PRIMARY_COLOR}}", // From design tokens
      secondary: "{{SECONDARY_COLOR}}", // From design tokens
      accent: "#059669", // Success Green
      background: "#FFFFFF",
      foreground: "#111827",
    },
    typography: {
      fontFamily: "{{FONT_FAMILY}}", // From design tokens
      headingFont: "{{FONT_FAMILY}}",
    },
    spacing: {
      borderRadius: "{{BORDER_RADIUS}}", // From design tokens
      maxWidth: "1200px",
    }
  },
  
  // Features configuration
  features: {
    darkMode: true,
    i18n: true,
    analytics: true,
    seo: true,
    pwa: false,
  },
  
  // Template metadata
  template: {
    name: "Modern Corporate",
    theme: "Professional and clean design for corporate websites",
    version: "1.0.0",
    style: "corporate",
  }
};

export default siteConfig;
