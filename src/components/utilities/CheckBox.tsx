interface Props {
  label: string ,
  checked : boolean,
  onChange ?: React.ChangeEventHandler<HTMLInputElement>
}
export const CheckBox : React.FC<Props> = ({label, checked, onChange}) => {
  return (
    <label className="checkbox-container">{label}
      <input type="checkbox"  onChange={onChange} checked={checked}/>
      <span className="checkmark"></span>
    </label>
  )
}