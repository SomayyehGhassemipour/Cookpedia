interface Props{
  id ?: string,
  align: string,
  type?: string,
  children?: JSX.Element | JSX.Element[] | any,
  onClick ?: (e:React.MouseEvent<HTMLElement>) => void
}
export const ListItem : React.FC<Props> = ({id, children, align, type, onClick}) => {
  return (
    <button className="list-click-area" id={id} data-type={type} type="button" onClick={onClick}>
      <div className="list-item"  data-type={align} >{children}</div>
    </button>
  )
}