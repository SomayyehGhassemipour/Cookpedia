interface Props{
  type ?: 'submit' | 'reset' | 'button' | undefined,
  data_type: String,
  data_bg ?: string,
  clickHandler ?: React.MouseEventHandler<HTMLButtonElement>,
  children?: JSX.Element | JSX.Element[],
  form ?: string,
}
export const Button: React.FC<Props> = ({form, type, data_type, data_bg, clickHandler,children}) => {
      return <button 
      className='btn' 
      form={form} 
      data-type={data_type} 
      data-bg= {data_bg}
      type={type} 
      onClick={clickHandler}>
        {children}
      </button>
}
