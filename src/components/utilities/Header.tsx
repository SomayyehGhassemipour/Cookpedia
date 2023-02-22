interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const Header: React.FC<Props> = ({children}) => {
  return (
    <div className="header">{children}</div>
  )
}