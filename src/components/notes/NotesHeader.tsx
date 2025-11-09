'use client';

import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setSearchQuery } from '@/store/slices/notesSlice';
import { useTranslation } from 'react-i18next';
import styles from './NotesHeader.module.scss';

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
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>{t('app.name')}</h1>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none">
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM16 16l3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={t('search.placeholder')}
              value={localSearch}
              onChange={handleSearchChange}
            />
            {localSearch && (
              <button
                className={styles.clearButton}
                onClick={() => {
                  setLocalSearch('');
                  dispatch(setSearchQuery(''));
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.iconButton} title={t('settings.title')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.98 2.98l4.24 4.24M1 12h6m6 0h6m-3.78-7.78l4.24 4.24m2.98 2.98l4.24 4.24M4.22 19.78l4.24-4.24m2.98-2.98l4.24-4.24" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

