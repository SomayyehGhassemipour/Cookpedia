interface Props {
  children : JSX.Element | JSX.Element[]
}
export const Navbar: React.FC<Props> = ({children}) => {
  return (
    <div className="navbar flex-row-justify-around">
      {children}
    </div>
  )
}