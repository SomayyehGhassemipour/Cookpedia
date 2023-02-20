interface CardHeaderProps {
  children?: JSX.Element | JSX.Element[];
}
export const CardHeader: React.FC<CardHeaderProps> = ({children}) => {
  return (
    <div className="card-header">{children}</div>
  )
}