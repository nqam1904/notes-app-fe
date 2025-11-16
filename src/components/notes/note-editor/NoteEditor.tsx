'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useNotes } from '@/hooks/useNotes';
import { useTranslation } from 'react-i18next';
import { Note } from '@/types/Data';
import { Input } from 'antd';

const { TextArea } = Input;

interface NoteEditorProps {
  note: Note;
}

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

  return (
    <div className="flex flex-col w-full h-full bg-white transition-[background-color] duration-base">
      <div className="flex-1 flex flex-col px-xl py-xl overflow-y-auto gap-lg md:px-lg max-[480px]:px-md max-[480px]:gap-md">
        <Input
          bordered={false}
          className="text-[2rem] font-semibold bg-transparent text-black/80 p-0 font-[inherit] placeholder:text-black/30 md:text-2xl max-[480px]:text-xl"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder={t('note.title.placeholder')}
        />

        <TextArea
          bordered={false}
          autoSize={{ minRows: 10 }}
          className="flex-1 bg-transparent text-black/70 font-[inherit] text-base leading-relaxed p-0 placeholder:text-black/30"
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          placeholder={t('note.content.placeholder')}
        />
      </div>

      {isSaving && <div className="absolute bottom-lg right-lg px-lg py-sm bg-black/70 text-white rounded-full text-xs animate-slideIn max-[480px]:bottom-md max-[480px]:right-md max-[480px]:px-md">{t('message.syncing')}</div>}
    </div>
  );
}

