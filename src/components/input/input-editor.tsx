'use client';

import { useNotes } from '@/hooks/useNotes';
import { RootState } from '@/store';
import { Note } from '@/types/Data';
import { Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

interface NoteEditorProps {
  note: Note;
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const { t } = useTranslation();
  const { user, isAnonymous, anonymousUserId } = useSelector((state: RootState) => state.user);

  // Use anonymousUserId for anonymous users, user.id for authenticated users
  const userId = isAnonymous ? anonymousUserId : user?.id;
  const { updateNote } = useNotes(userId || undefined, isAnonymous);

  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Refs for debouncing
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note.id]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };
  }, []);

  const saveTitle = useCallback(async (newTitle: string) => {
    setIsSaving(true);
    setIsTyping(false);
    try {
      await updateNote(note.id, { title: newTitle });
    } catch (error) {
      console.error('Error updating title:', error);
    } finally {
      setIsSaving(false);
    }
  }, [note.id, updateNote]);

  const saveContent = useCallback(async (newContent: string) => {
    setIsSaving(true);
    setIsTyping(false);
    try {
      await updateNote(note.id, { content: newContent });
    } catch (error) {
      console.error('Error updating content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [note.id, updateNote]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setIsTyping(true);

    // Clear existing timeout
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }

    // Set new timeout to save after 1 second
    titleTimeoutRef.current = setTimeout(() => {
      saveTitle(newTitle);
    }, 1000);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsTyping(true);

    // Clear existing timeout
    if (contentTimeoutRef.current) {
      clearTimeout(contentTimeoutRef.current);
    }

    // Set new timeout to save after 1 second
    contentTimeoutRef.current = setTimeout(() => {
      saveContent(newContent);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white transition-[background-color] duration-base">
      <div className="flex-1 flex flex-col p-3 overflow-y-auto gap-3 md:p-3 max-[480px]:p-3 max-[480px]:gap-2">
        {!isAnonymous && (
          <Input
            variant="borderless"
            className="text-[2rem] font-semibold bg-transparent text-black/80 p-0 font-[inherit] placeholder:text-black/30 md:text-2xl max-[480px]:text-xl"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder={t('note.title.placeholder')}
          />
        )}

        <TextArea
          variant="borderless"
          autoSize={{ minRows: 10 }}
          className="flex-1 bg-transparent text-black/70 font-[inherit] text-base leading-relaxed placeholder:text-black/30"
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          placeholder={t('note.content.placeholder')}
        />
      </div>

      {/* Show typing indicator while user is typing */}
      {isTyping && !isSaving && (
        <div className="absolute bottom-lg right-lg px-lg py-sm bg-blue-500/70 text-white rounded-full text-xs animate-slideIn max-[480px]:bottom-md max-[480px]:right-md max-[480px]:px-md">
          {t('message.typing') || 'Typing...'}
        </div>
      )}

      {/* Show saving indicator when actually saving */}
      {isSaving && (
        <div className="absolute bottom-lg right-lg px-lg py-sm bg-black/70 text-white rounded-full text-xs animate-slideIn max-[480px]:bottom-md max-[480px]:right-md max-[480px]:px-md">
          {t('message.syncing')}
        </div>
      )}
    </div>
  );
}

