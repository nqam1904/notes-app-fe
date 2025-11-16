'use client';

import { ReactNode } from 'react';
import { Button, Typography, Layout as AntLayout } from 'antd';
import {
  FileAddOutlined,
  ShareAltOutlined,
  LinkOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { CONFIG } from '@/config-global';
import { useTranslate } from '@/locales/use-locales';
import LanguageSwitcher from '@/components/language-switcher';

const { Header } = AntLayout;
const { Text } = Typography;

interface AnonymousNotesLayoutProps {
  children?: ReactNode;
}

export default function AnonymousNotesLayout({ children }: AnonymousNotesLayoutProps) {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-[#f9f5e7] flex flex-col">
      <Header className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-b border-yellow-200" style={{ height: 'auto' }}>
        <div className="w-full max-w-[1320px] flex items-center justify-between text-xs sm:text-sm md:text-base">
          <div>
            <Text strong className="tracking-wide">{CONFIG.appName}</Text>
            <Text type="secondary" className="ml-1">- {t('anonymous.header.tagline')}</Text>
          </div>
          <LanguageSwitcher />
        </div>
      </Header>

      <main className="flex-1 flex justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="w-full max-w-[1320px] flex flex-col gap-3 sm:gap-4">
          {/* Buttons and warning row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-amber-400 hover:bg-amber-500 border-0 text-xs sm:text-sm"
                style={{ backgroundColor: '#fbbf24', color: '#000' }}
              >
                <span className="hidden sm:inline">{t('anonymous.button.newNote')}</span>
                <span className="sm:hidden">New</span>
              </Button>
              <Button
                type="primary"
                icon={<ShareAltOutlined />}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-amber-400 hover:bg-amber-500 border-0 text-xs sm:text-sm"
                style={{ backgroundColor: '#fbbf24', color: '#000' }}
              >
                <span className="hidden sm:inline">{t('anonymous.button.shareUrl')}</span>
                <span className="sm:hidden">Share</span>
              </Button>
              <Button
                type="primary"
                icon={<LinkOutlined />}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-amber-400 hover:bg-amber-500 border-0 text-xs sm:text-sm"
                style={{ backgroundColor: '#fbbf24', color: '#000' }}
              >
                <span className="hidden sm:inline">{t('anonymous.button.changeUrl')}</span>
                <span className="sm:hidden">URL</span>
              </Button>
              <Button
                type="primary"
                icon={<LockOutlined />}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-amber-400 hover:bg-amber-500 border-0 text-xs sm:text-sm"
                style={{ backgroundColor: '#fbbf24', color: '#000' }}
              >
                <span className="hidden sm:inline">{t('anonymous.button.addPassword')}</span>
                <span className="sm:hidden">Lock</span>
              </Button>
            </div>

            <Text italic className="text-right text-[10px] sm:text-[11px] md:text-xs text-amber-700 whitespace-nowrap">
              {t('anonymous.warning.deletion')}
            </Text>
          </div>

          {/* Editor area */}
          <div className="flex-1">
            <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)] lg:h-[75vh] w-full rounded-lg border border-yellow-200 bg-white shadow-sm overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


