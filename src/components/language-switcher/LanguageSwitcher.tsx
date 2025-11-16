'use client';

import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslate } from '@/locales/use-locales';
import { allLangs } from '@/locales/all-langs';
import type { LanguageValue } from '@/locales/config-locales';

// Flat flag icons as SVG components
const VietnamFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="2" fill="#DA251D"/>
    <path d="M10 3.5L10.9755 6.58647H14.2451L11.6348 8.42706L12.6103 11.5135L10 9.67294L7.38974 11.5135L8.36518 8.42706L5.75486 6.58647H9.02447L10 3.5Z" fill="#FFCD00"/>
  </svg>
);

const UKFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="2" fill="#012169"/>
    <g clipPath="url(#clip0)">
      <path d="M0 0L6.67 4.67L0 9.33V0Z" fill="white"/>
      <path d="M20 0L13.33 4.67L20 9.33V0Z" fill="white"/>
      <path d="M0 14L6.67 9.33L0 4.67V14Z" fill="white"/>
      <path d="M20 14L13.33 9.33L20 4.67V14Z" fill="white"/>
      <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="2.8"/>
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.867"/>
      <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="4.667"/>
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.8"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="20" height="14" rx="2" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const flagComponents: Record<LanguageValue, React.ReactNode> = {
  vi: <VietnamFlag />,
  en: <UKFlag />,
};

export default function LanguageSwitcher() {
  const { currentLang, onChangeLang } = useTranslate();

  const items: MenuProps['items'] = allLangs.map((lang) => ({
    key: lang.value,
    label: (
      <div className="flex items-center gap-2 py-1">
        <span className="flex-shrink-0">{flagComponents[lang.value as LanguageValue]}</span>
        <span className="text-sm">{lang.label}</span>
      </div>
    ),
    onClick: () => onChangeLang(lang.value as LanguageValue),
  }));

  return (
    <Dropdown
      menu={{ items, selectedKeys: [currentLang.value] }}
      placement="bottomRight"
      trigger={['click']}
    >
      <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 bg-white">
        <span className="flex-shrink-0">{flagComponents[currentLang.value as LanguageValue]}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang.label}</span>
        <GlobalOutlined className="text-gray-500" />
      </button>
    </Dropdown>
  );
}

