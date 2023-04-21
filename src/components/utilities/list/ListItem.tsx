interface Props{
  id ?: string,
  align: string,
  type?: string,
  children?: JSX.Element | JSX.Element[] | any
}
export const ListItem : React.FC<Props> = ({id, children, align, type}) => {
  return (
    <button className="list-click-area" id={id} data-type={type} type="button">
      <div className="list-item" data-type={align} >{children}</div>
    </button>
  )
}