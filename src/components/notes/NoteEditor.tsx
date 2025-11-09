'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useNotes } from '@/hooks/useNotes';
import { useTranslation } from 'react-i18next';
import { Note, NoteColor } from '@/types/Data';
import styles from './NoteEditor.module.scss';

interface NoteEditorProps {
  note: Note;
}

const NOTE_COLORS: NoteColor[] = [
  'default',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'gray',
];

export default function NoteEditor({ note }: NoteEditorProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);
  const { updateNote } = useNotes(user?.id);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle);
    setIsSaving(true);
    try {
      await updateNote(note.id, { title: newTitle });
    } catch (error) {
      console.error('Error updating title:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = async (newContent: string) => {
    setContent(newContent);
    setIsSaving(true);
    try {
      await updateNote(note.id, { content: newContent });
    } catch (error) {
      console.error('Error updating content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const togglePin = async () => {
    try {
      await updateNote(note.id, { isPinned: !note.isPinned });
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const toggleLock = async () => {
    try {
      await updateNote(note.id, { isLocked: !note.isLocked });
    } catch (error) {
      console.error('Error toggling lock:', error);
    }
  };

  const changeColor = async (color: NoteColor) => {
    try {
      await updateNote(note.id, { color });
    } catch (error) {
      console.error('Error changing color:', error);
    }
  };

  return (
    <div className={styles.editor} style={{ backgroundColor: `var(--color-note-${note.color})` }}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button
            className={`${styles.iconButton} ${note.isPinned ? styles.active : ''}`}
            onClick={togglePin}
            title={note.isPinned ? t('note.unpin') : t('note.pin')}
          >
            📌
          </button>
          <button
            className={`${styles.iconButton} ${note.isLocked ? styles.active : ''}`}
            onClick={toggleLock}
            title={note.isLocked ? t('note.unlock') : t('note.lock')}
          >
            🔒
          </button>
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.colorPicker}>
            {NOTE_COLORS.map(color => (
              <button
                key={color}
                className={`${styles.colorButton} ${note.color === color ? styles.active : ''}`}
                style={{ backgroundColor: `var(--color-note-${color})` }}
                onClick={() => changeColor(color)}
                title={color}
              />
            ))}
          </div>

          <button className={styles.moreButton} title={t('editor.undo')}>
            ⋮
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <input
          type="text"
          className={styles.title}
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder={t('note.title.placeholder')}
        />

        <textarea
          className={styles.textarea}
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          placeholder={t('note.content.placeholder')}
        />
      </div>

      {isSaving && <div className={styles.savingIndicator}>{t('message.syncing')}</div>}
    </div>
  );
}

