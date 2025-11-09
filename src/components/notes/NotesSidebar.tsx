'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFilter } from '@/store/slices/notesSlice';
import { useNotes } from '@/hooks/useNotes';
import { useTranslation } from 'react-i18next';
import styles from './NotesSidebar.module.scss';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

export default function NotesSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);
  const { folders } = useSelector((state: RootState) => state.folders);
  const [isOpen, setIsOpen] = useState(true);

  const menuItems: SidebarItem[] = [
    {
      id: 'all',
      label: t('sidebar.allNotes'),
      icon: '📝',
      action: () => dispatch(setFilter({})),
    },
    {
      id: 'archived',
      label: t('sidebar.archived'),
      icon: '📦',
      action: () => dispatch(setFilter({ status: 'archived' })),
    },
    {
      id: 'trash',
      label: t('sidebar.trash'),
      icon: '🗑️',
      action: () => dispatch(setFilter({ status: 'trashed' })),
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('app.name')}</h2>
          <button className={styles.newNoteButton} title={t('note.new')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        <nav className={styles.menu}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={styles.menuItem}
              onClick={item.action}
              title={item.label}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{t('sidebar.folders')}</h3>
            <button className={styles.addButton} title={t('folder.new')}>
              +
            </button>
          </div>

          <div className={styles.folderList}>
            {folders && folders.length > 0 ? (
              folders.map(folder => (
                <button
                  key={folder.id}
                  className={styles.folderItem}
                  onClick={() => dispatch(setFilter({ folderId: folder.id }))}
                >
                  <span className={styles.folderIcon}>📁</span>
                  <span className={styles.folderName}>{folder.name}</span>
                  {folder.noteCount && <span className={styles.noteCount}>{folder.noteCount}</span>}
                </button>
              ))
            ) : (
              <p className={styles.emptyText}>{t('folder.untitled')}</p>
            )}
          </div>
        </div>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user?.displayName?.charAt(0)}</div>
            <span className={styles.userName}>{user?.email}</span>
          </div>
        </div>
      </aside>
    </>
  );
}

