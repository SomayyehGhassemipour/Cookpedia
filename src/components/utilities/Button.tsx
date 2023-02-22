interface Props{
  title: String,
  type: String,
  clickHandler : React.MouseEventHandler<HTMLButtonElement>;
}
export const Button: React.FC<Props> = ({title,type,clickHandler}) => {
  return (
    <button className='btn' data-type={type} type="button" onClick={clickHandler}>{title}</button>
  )
}
