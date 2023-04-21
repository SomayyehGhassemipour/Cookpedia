import { useNavigate } from "react-router-dom";

interface Props{
  align: string,
  type?: string,
  children?: JSX.Element | JSX.Element[] | any
}
export const ListItem : React.FC<Props> = ({children, align, type}) => {
  return (
    <button className="list-click-area"  data-type={type} type="button">
      <div className="list-item" data-type={align} >{children}</div>
    </button>
  )
}