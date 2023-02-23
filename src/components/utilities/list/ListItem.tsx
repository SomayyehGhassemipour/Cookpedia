interface Props{
  align: string,
  children?: JSX.Element | JSX.Element[]
}
export const ListItem : React.FC<Props> = ({children, align}) => {
  return (
    <div className="list-item" data-type={align} >{children}</div>
  )
}