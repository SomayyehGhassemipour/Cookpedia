interface Props {
  label: string,
  name: string,
  placeholdertxt: string,
  options: string[]
}
export const SelectInput: React.FC<Props> = ({label, name, placeholdertxt, options}) => {
  return(
    <div className="field-set">
      <label>{label}</label>
      <select className="input-select" name={name}>
        {options.map((item) => (
          item === "gender" 
          ? <option hidden disabled selected> {placeholdertxt}</option>
          : <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}