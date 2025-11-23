'use client';

import { ROUTES } from '@/routes/path';
import { AppDispatch, RootState } from '@/store';
import { setFilter } from '@/store/slices/notesSlice';
import { generateNoteId } from '@/utils/id-generator';
import {
  DeleteOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text } = Typography;

interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  action: () => void;
}

export function NotesSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const { folders } = useSelector((state: RootState) => state.folders);
  const [isOpen, setIsOpen] = useState(true);

  const menuItems: SidebarItem[] = [
    {
      id: 'all',
      label: t('sidebar.allNotes'),
      icon: <FileTextOutlined />,
      action: () => dispatch(setFilter({})),
    },
    {
      id: 'archived',
      label: t('sidebar.archived'),
      icon: <InboxOutlined />,
      action: () => dispatch(setFilter({ status: 'archived' })),
    },
    {
      id: 'trash',
      label: t('sidebar.trash'),
      icon: <DeleteOutlined />,
      action: () => dispatch(setFilter({ status: 'trashed' })),
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateNewNote = () => {
    // Generate new note ID with appropriate prefix
    const newNoteId = generateNoteId(!isAuthenticated);
    const targetRoute = ROUTES.NOTES_ANONYMOUS.replace(':id', newNoteId);
    console.log('[NotesSidebar] Creating new note:', newNoteId);
    window.open(targetRoute, '_blank');
  };

  return (
    <>
      <Button
        type="text"
        icon={isOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        className="hidden md:flex fixed left-2.5 top-20 w-8 h-8 z-[100] rounded-md border bg-[rgb(var(--color-bg-secondary))] border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))] max-md:flex"
        onClick={toggleSidebar}
      />

      <aside className={`w-60 flex flex-col overflow-y-auto transition-all duration-base bg-[rgb(var(--color-bg-secondary))] border-r border-[rgb(var(--color-border))] ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed md:left-0 md:top-0 md:bottom-0 md:z-[1000] md:max-w-[80vw]`}>
        <div className="p-lg flex items-center justify-between gap-md border-b border-[rgb(var(--color-border))]">
          <Title level={2} className="text-xl m-0 text-[rgb(var(--color-text-primary))]" style={{ marginBottom: 0 }}>
            {t('app.name')}
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-accent text-white border-none hover:bg-accent-hover hover:scale-105 active:scale-95"
            title={t('note.new')}
            onClick={handleCreateNewNote}
          />
        </div>

        <nav className="flex flex-col p-sm gap-xs border-b border-[rgb(var(--color-border))]">
          {menuItems.map(item => (
            <Button
              key={item.id}
              type="text"
              icon={<span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>}
              className="flex items-center gap-md px-lg py-md rounded-md text-sm text-left justify-start h-auto text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-border))] hover:text-[rgb(var(--color-text-primary))] active:bg-[rgb(var(--color-bg-tertiary))]"
              onClick={item.action}
              title={item.label}
            >
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left">{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="p-lg border-b border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between mb-md">
            <Title level={3} className="text-xs font-semibold uppercase m-0 tracking-wider text-[rgb(var(--color-text-tertiary))]" style={{ marginBottom: 0 }}>
              {t('sidebar.folders')}
            </Title>
            <Button
              type="text"
              className="w-6 h-6 rounded-md bg-[rgb(var(--color-bg-tertiary))] text-base font-bold text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-border))]"
              title={t('folder.new')}
            >
              +
            </Button>
          </div>

          <div className="flex flex-col gap-xs">
            {folders && folders.length > 0 ? (
              folders.map(folder => (
                <Button
                  key={folder.id}
                  type="text"
                  icon={<FolderOpenOutlined />}
                  className="flex items-center gap-md px-md py-sm rounded-md text-[13px] text-left justify-start h-auto text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-border))] hover:text-[rgb(var(--color-text-primary))]"
                  onClick={() => dispatch(setFilter({ folderId: folder.id }))}
                >
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left">{folder.name}</span>
                  {folder.noteCount && <span className="text-xs bg-[rgb(var(--color-border))] px-1.5 py-0.5 rounded-full flex-shrink-0 text-[rgb(var(--color-text-tertiary))]">{folder.noteCount}</span>}
                </Button>
              ))
            ) : (
              <Text className="text-[13px] p-md m-0 text-center text-[rgb(var(--color-text-tertiary))]">
                {t('folder.untitled')}
              </Text>
            )}
          </div>
        </div>

        <div className="p-lg border-t border-[rgb(var(--color-border))] mt-auto">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
              {user?.displayName?.charAt(0) || <UserOutlined />}
            </div>
            <Text className="flex-1 text-[13px] overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(var(--color-text-secondary))]">
              {user?.email}
            </Text>
          </div>
        </div>
      </aside>
    </>
  );
}

