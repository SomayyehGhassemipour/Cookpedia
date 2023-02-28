interface Props {
  label: string
}
export const CheckBox : React.FC<Props> = ({label}) => {
  return (
    <label className="checkbox-container">{label}
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
  )
}