interface Props {
  children?: JSX.Element | JSX.Element[] 
}
export const Form:React.FC<Props> = ({children}) => {
  return (
    <div className="form">
      {children}
    </div>
  )
}