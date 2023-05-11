interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const CardAction: React.FC<Props> = ({children}) => {
  return (
    <div className="mt-auto card-action">{children}</div>
  )
}