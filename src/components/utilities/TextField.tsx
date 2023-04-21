interface Props {
  type: string,
  placeholder: string,
  data_type ?: string,
  onChange ?: React.ChangeEventHandler<HTMLInputElement>
}
export const TextField : React.FC<Props> = ({type, data_type, placeholder, onChange}) => {
  return (
    <input className="textField" data-type={data_type} type={type} placeholder={placeholder} onChange={onChange} />
  )
}