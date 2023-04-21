import { TextField } from '../TextField';
interface Props {
  label: string, 
  placeholdertxt: string,
  inputType: string
}
export const FieldSet:React.FC<Props> = ({label,placeholdertxt,inputType}) => {
  return (
    <div className="field-set">
      <h5>{label}</h5>
      <TextField type={inputType} placeholder={placeholdertxt}/>
    </div>
  )
}