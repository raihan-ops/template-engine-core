import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import I18nProvider from '@/components/I18nProvider';

export const metadata = {
  title: 'Next.js 15 Boilerplate',
  description: 'A modern Next.js 15 boilerplate with Tailwind CSS 4',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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

