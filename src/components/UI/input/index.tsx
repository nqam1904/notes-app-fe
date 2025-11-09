import styles from "./input.module.scss";
type InputProps = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  placeholder: string;
  textarea?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  textarea = false,
  ...rest
}) => {
  const Component = textarea ? "textarea" : "input";
  return (
    <div className={styles.container}>
      <Component
        type="text"
        id="name"
        required
        value={value}
        className={styles.inputCore}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor="name" className={styles.labelCore}>
        {label}
      </label>
    </div>
  );
};
export default Input;
