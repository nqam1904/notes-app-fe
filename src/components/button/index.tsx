"use client";

import { Button as AntButton } from 'antd';

interface IProps {
  text?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}

const Button: React.FC<IProps> = ({
  text = "",
  onClick,
  type = "button",
  disabled = false,
  backgroundColor = "",
  borderColor = "",
  className = "",
}) => {
  return (
    <AntButton
      htmlType={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center h-12 min-w-[64px] text-white transition-colors duration-300 select-none text-center px-6 py-[5px] bg-text-title text-lg font-medium rounded-[50px] border-0 hover:bg-pink-6 hover:cursor-pointer active:bg-pink-6 disabled:cursor-default disabled:bg-gray-300 ${className}`}
      style={{ backgroundColor: backgroundColor || undefined, borderColor: borderColor || undefined }}
    >
      {text}
    </AntButton>
  );
};

export default Button;
