interface Props {
  type: string,
  placeholder: string,
  data_type ?: string,
  onChange ?: React.ChangeEventHandler<HTMLInputElement>,
  name ?: string,
  value ?: string
}
export const TextField : React.FC<Props> = ({type, data_type, placeholder, onChange, name, value}) => {
  return (
    <input className="textField" data-type={data_type} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} />
  )
}