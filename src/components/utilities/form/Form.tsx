interface Props {
  children?: React.ReactNode[],
  id ?: string,
  onSubmit : React.FormEventHandler<HTMLFormElement> 
}
export const Form:React.FC<Props> = ({id, children, onSubmit}) => {
  return (
    <form className="form" id={id} onSubmit={onSubmit}>
      {children}
    </form>
  )
}