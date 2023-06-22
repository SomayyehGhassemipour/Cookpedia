interface Props{
  children?: JSX.Element | JSX.Element[]
}
export const List : React.FC<Props> = ({children}) => {
  return (
    <div className="list">{children}</div>
  )
}