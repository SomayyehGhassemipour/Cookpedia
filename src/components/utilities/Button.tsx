interface Props{
  type ?: 'submit' | 'reset' | 'button' | undefined,
  data_type: String,
  clickHandler ?: React.MouseEventHandler<HTMLButtonElement>,
  children?: JSX.Element | JSX.Element[],
  form ?: string,
}
export const Button: React.FC<Props> = ({form, type, data_type,clickHandler,children}) => {
    if (data_type === "icon"){
      return <button className='btn-icon' form={form} data-type={data_type} type={type} onClick={clickHandler}>{children}</button>
    }
    if (data_type === "container"){
      return <button className='btn-container' form={form} data-type={data_type} type={type} onClick={clickHandler}>{children}</button>
    } else {
      return <button className='btn-simple' form={form} data-type={data_type} type={type} onClick={clickHandler}>{children}</button>
    }
}
