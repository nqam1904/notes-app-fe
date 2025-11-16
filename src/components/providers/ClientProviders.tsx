'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '@/components/UI/progress-bar';
import { I18nProvider } from '@/locales';
import type { LanguageValue } from '@/locales/config-locales';

export default function ClientProviders({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: LanguageValue;
}) {
  return (
    <Provider store={store}>
      <I18nProvider lang={lang}>
        <ProgressBar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {children}
      </I18nProvider>
    </Provider>
  );
}




