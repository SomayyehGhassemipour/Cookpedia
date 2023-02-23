interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const CardBody: React.FC<Props> = ({children}) => {
  return (
    <div className="card-body">{children}</div>
  )
}