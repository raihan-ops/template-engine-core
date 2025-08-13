import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import I18nProvider from '@/components/I18nProvider';
import { siteConfig } from '../../site-config.js';

export const metadata = {
  title: siteConfig.name || 'Next.js 15 Boilerplate',
  description: siteConfig.description || 'A modern Next.js 15 boilerplate with Tailwind CSS 4',
};

export default function RootLayout({ children }) {
  // Create CSS custom properties from site config
  const cssVariables = {
    '--site-primary-color': siteConfig.theme?.colors?.primary || '#059669',
    '--site-secondary-color': siteConfig.theme?.colors?.secondary || '#4f46e5',
    '--site-accent-color': siteConfig.theme?.colors?.accent || '#059669',
    '--site-background': siteConfig.theme?.colors?.background || '#ffffff',
    '--site-foreground': siteConfig.theme?.colors?.foreground || '#111827',
    '--site-font-family': siteConfig.theme?.typography?.fontFamily || 'Arial, Helvetica, sans-serif',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body style={cssVariables}>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="container mx-auto px-4">{children}</main>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

