import { InputField } from "../InputField";
interface Props {
  label: string;
  placeholdertxt: string;
  data_type?: string;
  inputType: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string;
  errorMessage?: string;
  required?: boolean;
  pattern?: string;
  handleKeyDown?: any;
}
export const FieldSet: React.FC<Props> = ({
  label,
  placeholdertxt,
  inputType,
  data_type,
  onChange,
  name,
  value,
  errorMessage,
  required,
  pattern,
  handleKeyDown,
}) => {
  return (
    <div className="field-set">
      <label>{label}</label>
      <InputField
        type={inputType}
        data_type={data_type}
        placeholder={placeholdertxt}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
        pattern={pattern}
        handleKeyDown={handleKeyDown}
      />
      <span className="span-error">{errorMessage}</span>
    </div>
  );
};
