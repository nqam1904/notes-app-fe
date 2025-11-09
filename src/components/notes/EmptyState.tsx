'use client';

import { useTranslation } from 'react-i18next';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>📝</div>
      <h2 className={styles.title}>{t('app.name')}</h2>
      <p className={styles.description}>{t('app.tagline')}</p>
      <div className={styles.tips}>
        <p>{t('note.create')}</p>
      </div>
    </div>
  );
}

