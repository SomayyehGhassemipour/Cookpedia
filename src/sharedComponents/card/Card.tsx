interface Props {
  children?: JSX.Element | JSX.Element[];
  classname: string;
}
export const Card: React.FC<Props> = ({ children, classname}) => {
  return (
    <div className={`card ${classname}`}>
      {children}
    </div>
  )
}