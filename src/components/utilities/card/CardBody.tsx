interface Props {
  align ?: string,
  children?: JSX.Element | JSX.Element[];
}
export const CardBody: React.FC<Props> = ({align, children}) => {
  return (
    <div className="card-body" data-align={align}>{children}</div>
  )
}