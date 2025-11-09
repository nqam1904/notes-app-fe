import './globals.scss';

import { CONFIG } from '@/config-global';
import { detectLanguage } from '@/locales/server';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nProvider } from '@/locales';
import ProgressBar from '@/components/UI/progress-bar';
import { Provider } from 'react-redux';
import store from '@/store';

const interFont = localFont({
  src: [
    {
      path: '../../public/fonts/Raleway-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Raleway-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Notes - Capture Your Thoughts',
  description: 'A modern notes application to capture and organize your ideas',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  return (
    <html lang={lang} suppressHydrationWarning className={`${interFont.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Provider store={store}>
          <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
            <ProgressBar />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
          </I18nProvider>
        </Provider>
      </body>
    </html>
  );
}
