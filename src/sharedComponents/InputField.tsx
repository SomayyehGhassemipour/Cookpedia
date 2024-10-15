import { useState } from "react";

interface Props {
  type?: string;
  placeholder: string;
  data_type?: string;
  data_icon?: string;
  onChange?: any;
  name?: string;
  value?: string;
  required?: boolean;
  pattern?: string;
  handleKeyDown?: any;
}
export const InputField: React.FC<Props> = ({
  type,
  data_type,
  data_icon,
  placeholder,
  onChange,
  name,
  value,
  required,
  pattern,
  handleKeyDown,
}) => {
  const [focused, setFocused] = useState(false);
  const focusHandler = () => {
    setFocused(true);
  };
  return data_type === "textarea" ? (
    <textarea
      className="textField"
      data-type={data_type}
      data-icon={data_icon}
      placeholder={placeholder}
      name={name}
      value={value}
      rows={4}
      required={required}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onBlur={focusHandler}
    />
  ) : (
    <input
      className="textField"
      role="input"
      data-type={data_type}
      data-icon={data_icon}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      required={required}
      pattern={pattern}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onBlur={focusHandler}
    />
  );
};
