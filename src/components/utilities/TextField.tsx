interface Props {
  type: string;
  placeholder: string;
  data_type ?: string;
}
export const TextField : React.FC<Props> = ({type, data_type, placeholder}) => {
  return (
    <input className="textField" data-type={data_type} type={type} placeholder={placeholder}/>
  )
}