interface Props{
  title: String,
  type: String
}
export const Button: React.FC<Props> = ({title,type}) => {
  return (
    <button className='btn' data-type={type} type="button">{title}</button>
  )
}
