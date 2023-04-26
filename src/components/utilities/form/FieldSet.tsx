import { TextField } from '../TextField';
interface Props {
  label: string, 
  placeholdertxt: string,
  inputType: string,
  onChange ?: React.ChangeEventHandler<HTMLInputElement>,
  name ?: string,
  value ?: string
}
export const FieldSet:React.FC<Props> = ({label,placeholdertxt,inputType, onChange, name, value}) => {
  return (
    <div className="field-set">
      <h5>{label}</h5>
      <TextField type={inputType} placeholder={placeholdertxt} onChange={onChange} name={name} value={value}/>
    </div>
  )
}