import { useState } from "react";
import { InputField } from "../InputField";
interface Props {
  label: string;
  placeholdertxt: string;
  inputType: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string;
  errorMessage?: string;
  required?: boolean;
  pattern?: string;
}
export const FieldSet: React.FC<Props> = ({
  label,
  placeholdertxt,
  inputType,
  onChange,
  name,
  value,
  errorMessage,
  required,
  pattern,
}) => {
  return (
    <div className="field-set">
      <label>{label}</label>
      <InputField
        type={inputType}
        placeholder={placeholdertxt}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
        pattern={pattern}
      />
      <span className="span-error">{errorMessage}</span>
    </div>
  );
};
