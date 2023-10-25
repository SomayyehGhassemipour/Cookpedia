import { RefObject } from "react";

interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  classname?: string;
  data_type: String;
  data_bg?: string;
  data_active?: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element | JSX.Element[];
  form?: string;
  reference?: any;
}
export const Button: React.FC<Props> = ({
  form,
  type,
  classname,
  data_type,
  data_bg,
  data_active,
  clickHandler,
  children,
  reference,
}) => {
  classname = classname !== undefined ? classname : "";
  return (
    <button
      className={`btn ${classname}`}
      form={form}
      data-type={data_type}
      data-bg={data_bg}
      data-active={data_active}
      type={type}
      onClick={clickHandler}
      ref={reference}
    >
      {children}
    </button>
  );
};
