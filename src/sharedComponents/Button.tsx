interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  classname?: string;
  data_type: String;
  data_bg?: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element | JSX.Element[];
  form?: string;
}
export const Button: React.FC<Props> = ({
  form,
  type,
  classname,
  data_type,
  data_bg,
  clickHandler,
  children,
}) => {
  classname = classname !== undefined ? classname : "";
  return (
    <button
      className={`btn ${classname}`}
      form={form}
      data-type={data_type}
      data-bg={data_bg}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
