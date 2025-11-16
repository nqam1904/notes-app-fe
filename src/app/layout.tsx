import './globals.css';
import 'antd/dist/reset.css';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { CONFIG } from '@/config-global';
import { detectLanguage } from '@/locales/server';
import ClientProviders from '@/components/providers/ClientProviders';

// ----------------------------------------------------------------------
// Font Configuration
// ----------------------------------------------------------------------

const robotoFont = localFont({
  src: [
    {
      path: '../../public/fonts/Roboto-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

// ----------------------------------------------------------------------
// Metadata Configuration
// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: 'FlickNote - Online',
    template: '%s | FlickNote - Online',
  },
  description: 'A simple, convenient app for quickly capturing ideas and managing notes.',
  keywords: ['notes', 'notepad', 'productivity', 'thoughts'],
  authors: [{ name: '@NQAM' }],
  creator: '@NQAM',
  icons: {
    icon: [
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

// ----------------------------------------------------------------------
// Root Layout Component
// ----------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  const fontVariable = robotoFont.variable;

  return (
    <html lang={lang} suppressHydrationWarning className={fontVariable}>
      <body>
        <ClientProviders lang={CONFIG.isStaticExport ? undefined : lang}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
