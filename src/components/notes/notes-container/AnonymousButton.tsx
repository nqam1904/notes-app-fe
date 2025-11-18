'use client';

import { Button } from 'antd';
import { ReactNode } from 'react';

interface AnonymousButtonProps {
  icon: ReactNode;
  text: string;
  shortText: string;
  disabled?: boolean;
  onClick?: () => void;
}

function AnonymousButton({
  icon,
  text,
  shortText,
  disabled = false,
  onClick,
}: AnonymousButtonProps) {
  const activeStyles = {
    backgroundColor: '#fcd34d',
    color: '#000',
  };

  const disabledStyles = {
    backgroundColor: '#d1d5db',
    color: '#6b7280',
  };

  return (
    <Button
      type="primary"
      icon={icon}
      className="inline-flex items-center justify-center gap-1 sm:gap-2 border-0 text-xs sm:text-sm font-semibold disabled:cursor-not-allowed"
      style={{
        ...(disabled ? disabledStyles : activeStyles),
        fontWeight: 600,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="hidden sm:inline">{text}</span>
      <span className="sm:hidden">{shortText}</span>
    </Button>
  );
}

export default AnonymousButton;

