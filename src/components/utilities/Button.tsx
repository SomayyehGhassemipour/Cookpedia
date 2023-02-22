interface Props{
  // title: String,
  type: String,
  clickHandler : React.MouseEventHandler<HTMLButtonElement>,
  children?: JSX.Element | JSX.Element[];
}
export const Button: React.FC<Props> = ({type,clickHandler,children}) => {
    if (type=="icon"){
      return <button className='btn-icon' data-type={type} type="button" onClick={clickHandler}>{children}</button>
    } else {
      return <button className='btn-simple' data-type={type} type="button" onClick={clickHandler}>{children}</button>
    }
}
