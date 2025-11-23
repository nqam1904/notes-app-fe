"use client";

import { Input as AntInput, Form } from 'antd';

const { TextArea: AntTextArea } = AntInput;

type InputProps = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  textarea = false,
  ...rest
}) => {
  const Component = textarea ? AntTextArea : AntInput;

  return (
    <div className="relative w-[300px]">
      <Form.Item label={label} className="mb-0">
        <Component
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full"
          {...rest}
        />
      </Form.Item>
    </div>
  );
};

export default Input;

