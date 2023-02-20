interface cardBodyProps {
  children?: JSX.Element | JSX.Element[];
}
export const CardBody: React.FC<cardBodyProps> = ({children}) => {
  return (
    <div className="card-body">{children}</div>
  )
}