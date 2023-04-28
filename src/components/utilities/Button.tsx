interface Props{
  type ?: 'submit' | 'reset' | 'button' | undefined,
  data_type: String,
  clickHandler ?: React.MouseEventHandler<HTMLButtonElement>,
  children?: JSX.Element | JSX.Element[],
  form ?: string,
}
export const Button: React.FC<Props> = ({form, type, data_type,clickHandler,children}) => {
      return <button 
      className='btn' 
      form={form} 
      data-type={data_type} 
      type={type} 
      onClick={clickHandler}>
        {children}
      </button>
}
