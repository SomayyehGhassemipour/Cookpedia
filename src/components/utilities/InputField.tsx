import { useState } from "react";

interface Props {
  type ?: string,
  placeholder: string,
  data_type ?: string,
  data_icon ?: string,
  onChange ?: React.ChangeEventHandler<HTMLInputElement>,
  name ?: string,
  value ?: string,
  required ?: boolean,
  pattern ?: string
}
export const InputField : React.FC<Props> = ({type, data_type,data_icon, placeholder, onChange, name, value, required, pattern}) => {
  const [focused, setFocused] = useState(false);
  const focusHandler = () => {
    setFocused(true);
  }
  return (
    data_type==="textarea" ? <textarea className="textField" 
    data-type={data_type} 
    data-icon={data_icon}
    // type={type} 
    placeholder={placeholder} 
    name={name} 
    value={value} 
    // required 
    // pattern={pattern}
    // onChange={onChange} 
    onBlur={focusHandler}
    /> :
    <input className="textField" 
    data-type={data_type} 
    data-icon={data_icon}
    type={type} 
    placeholder={placeholder} 
    name={name} 
    value={value} 
    required 
    pattern={pattern}
    onChange={onChange} 
    onBlur={focusHandler}
    />
  )
}