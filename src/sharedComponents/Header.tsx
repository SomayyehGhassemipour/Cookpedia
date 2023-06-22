interface Props {
  align?: string,
  children?: JSX.Element | JSX.Element[];
}
export const Header: React.FC<Props> = ({align,children}) => {
  return (
    <div className="header" data-type={align}>{children}</div>
  )
}