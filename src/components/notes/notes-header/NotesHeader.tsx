'use client';

import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setSearchQuery } from '@/store/slices/notesSlice';
import { useTranslation } from 'react-i18next';
import { CloseCircleFilled, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Input, Button, Typography } from 'antd';
import LanguageSwitcher from '@/components/language-switcher';

const { Header } = Layout;
const { Title } = Typography;

export default function NotesHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { searchQuery } = useSelector((state: RootState) => state.notes);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearch(value);
      // Debounce search
      const timer = setTimeout(() => {
        dispatch(setSearchQuery(value));
      }, 300);
      return () => clearTimeout(timer);
    },
    [dispatch]
  );

  return (
    <Header className="bg-[rgb(var(--color-bg-primary))] border-b border-[rgb(var(--color-border))] px-lg py-md flex items-center justify-center md:px-md" style={{ height: 'auto' }}>
      <div className="flex items-center gap-xl w-full max-w-[1600px]">
        <div className="min-w-[240px] flex items-center md:min-w-[140px] max-[480px]:min-w-[100px]">
          <Title level={1} className="text-[2rem] font-bold tracking-tight m-0 text-[rgb(var(--color-text-primary))] md:text-2xl max-[480px]:text-xl" style={{ marginBottom: 0 }}>
            {t('app.name')}
          </Title>
        </div>

        <div className="flex-1 min-w-[200px] md:min-w-0">
          <Input
            prefix={<SearchOutlined className="text-[rgb(var(--color-text-tertiary))]" />}
            suffix={
              localSearch && (
                <Button
                  type="text"
                  icon={<CloseCircleFilled />}
                  onClick={() => {
                    setLocalSearch('');
                    dispatch(setSearchQuery(''));
                  }}
                  className="text-[rgb(var(--color-text-tertiary))] hover:text-[rgb(var(--color-text-secondary))]"
                  size="small"
                />
              )
            }
            placeholder={t('search.placeholder')}
            value={localSearch}
            onChange={handleSearchChange}
            className="relative flex items-center bg-[rgb(var(--color-bg-secondary))] rounded-full border border-[rgb(var(--color-border))] transition-all duration-base focus-within:bg-[rgb(var(--color-bg-primary))] focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary))',
              borderRadius: '9999px',
            }}
          />
        </div>

        <div className="flex gap-md items-center md:gap-sm">
          <LanguageSwitcher />
          <Button
            type="default"
            icon={<SettingOutlined />}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-[rgb(var(--color-bg-secondary))] hover:bg-[rgb(var(--color-bg-tertiary))]"
            title={t('settings.title')}
          />
        </div>
      </div>
    </Header>
  );
}

