interface Props {
  align ?: string,
  children?: JSX.Element | JSX.Element[];
}
export const CardBody: React.FC<Props> = ({align, children}) => {
  return (
    align === 'center' ? <div className="card-body flex-align-center">{children}</div> : <div className="card-body flex-align-start">{children}</div>
  )
}