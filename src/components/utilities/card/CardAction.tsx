interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const CardAction: React.FC<Props> = ({children}) => {
  return (
    <div className="card-action">{children}</div>
  )
}