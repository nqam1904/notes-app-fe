'use client';

import { AnonymousButton } from '@/components/button/anon-button';
import LanguageSwitcher from '@/components/language-switcher';
import { CONFIG } from '@/config-global';
import { useTranslate } from '@/locales/use-locales';
import { ROUTES } from '@/routes/path';
import { localStorageService } from '@/services/local-service';
import { RootState } from '@/store';
import { generateNoteId } from '@/utils/id-generator';
import {
  FileAddOutlined,
  LinkOutlined,
  LockOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Input, message, Modal, Typography } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

const { Header } = AntLayout;
const { Text } = Typography;

interface AnonymousNotesViewProps {
  children?: ReactNode;
}

export function AnonymousNotesView({ children }: AnonymousNotesViewProps) {
  const { t } = useTranslate();
  const params = useParams();
  const router = useRouter();
  const currentNoteId = params.noteId as string;
  const { notes } = useSelector((state: RootState) => state.notes);

  // State for Change URL modal
  const [isChangeUrlModalOpen, setIsChangeUrlModalOpen] = useState(false);
  const [newUrlInput, setNewUrlInput] = useState(currentNoteId);
  const [isChangingUrl, setIsChangingUrl] = useState(false);

  const handleCreateNewNote = () => {
    // Generate new note ID for anonymous user (with anon_ prefix)
    const newNoteId = generateNoteId(true);
    const targetRoute = ROUTES.NOTES_ANONYMOUS.replace(':id', newNoteId);
    window.open(targetRoute, '_blank');
  };

  const handleOpenChangeUrlModal = () => {
    setIsChangeUrlModalOpen(true);
  };

  const handleCloseChangeUrlModal = () => {
    setIsChangeUrlModalOpen(false);
  };

  const validateNoteId = (id: string): { valid: boolean; error?: string } => {
    // Check if empty
    if (!id || id.trim() === '') {
      return { valid: false, error: t('modal.changeUrl.errorInvalid') };
    }

    const trimmedId = id.trim();

    // Check if same as current
    if (trimmedId.toLowerCase() === currentNoteId.toLowerCase()) {
      return { valid: false, error: t('modal.changeUrl.errorExists') };
    }

    return { valid: true };
  };

  const handleChangeUrl = async () => {
    try {
      setIsChangingUrl(true);

      // Validate input
      const validation = validateNoteId(newUrlInput);
      if (!validation.valid) {
        message.error(validation.error);
        setIsChangingUrl(false);
        return;
      }

      const newNoteId = newUrlInput.trim();

      // Check if note with this ID already exists
      const existingNote = localStorageService.getNote(newNoteId);
      if (existingNote) {
        message.error(t('modal.changeUrl.errorExists'));
        setIsChangingUrl(false);
        return;
      }

      // Get current note
      const currentNote = notes.find(n => n.id === currentNoteId) || localStorageService.getNote(currentNoteId);

      if (!currentNote) {
        message.error(t('modal.changeUrl.error'));
        setIsChangingUrl(false);
        return;
      }

      // Create new note with the same content but new ID
      const newNote = {
        ...currentNote,
        id: newNoteId,
        updatedAt: Date.now(),
      };

      // Save the new note
      localStorageService.createNote(newNote);

      // Delete the old note
      localStorageService.deleteNote(currentNoteId);

      // Close modal
      handleCloseChangeUrlModal();

      // Show success message
      message.success(t('modal.changeUrl.success'));

      // Redirect to new URL
      const targetRoute = ROUTES.NOTES_ANONYMOUS.replace(':id', newNoteId);
      router.replace(targetRoute);
      router.refresh();

    } catch (error) {
      console.error('[AnonymousNotesLayout] Error changing URL:', error);
      message.error(t('modal.changeUrl.error'));
    } finally {
      setIsChangingUrl(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5e7] flex flex-col">
      <Header className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-b border-yellow-200" style={{ height: 'auto' }}>
        <div className="w-full max-w-[1320px] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base overflow-hidden">
            <Text strong className="tracking-wide whitespace-nowrap flex-shrink-0">{CONFIG.appName}</Text>
            <Text type="secondary" className="hidden sm:inline truncate ml-1">- {t('anonymous.header.tagline')}</Text>
          </div>
          <LanguageSwitcher />
        </div>
      </Header>

      <main className="flex-1 flex justify-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="w-full max-w-[1320px] flex flex-col gap-3 sm:gap-4">
          {/* Buttons and warning row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <AnonymousButton
                icon={<FileAddOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
                text={t('anonymous.button.newNote')}
                shortText="New"
                onClick={handleCreateNewNote}
              />
              <AnonymousButton
                icon={<ShareAltOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
                text={t('anonymous.button.shareUrl')}
                shortText="Share"
                disabled
              />
              <AnonymousButton
                icon={<LinkOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
                text={t('anonymous.button.changeUrl')}
                shortText="URL"
                onClick={handleOpenChangeUrlModal}
              />
              <AnonymousButton
                icon={<LockOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
                text={t('anonymous.button.addPassword')}
                shortText="Lock"
                disabled
              />
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

      {/* Change URL Modal */}
      <Modal
        title={t('modal.changeUrl.title')}
        open={isChangeUrlModalOpen}
        onOk={handleChangeUrl}
        onCancel={handleCloseChangeUrlModal}
        okText={t('modal.changeUrl.changeButton')}
        cancelText={t('modal.changeUrl.cancel')}
        confirmLoading={isChangingUrl}
        centered
      >
        <div className="py-4">
          <div className="mb-4">
            <Text className="text-sm text-gray-600">
              {t('modal.changeUrl.currentUrl')} <Text strong className="text-amber-600">{currentNoteId}</Text>
            </Text>
          </div>
          <div className="mb-2">
            <Text className="text-sm font-medium">{t('modal.changeUrl.enterNewUrl')}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Input
              allowClear
              placeholder={t('modal.changeUrl.placeholder')}
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              onPressEnter={handleChangeUrl}
              disabled={isChangingUrl}
              autoFocus
              className="flex-1"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

