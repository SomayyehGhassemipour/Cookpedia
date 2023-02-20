interface CardProps {
  children?: JSX.Element | JSX.Element[];
}
export const Card: React.FC<CardProps> = ({ children}) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}