interface Props {
  children?: JSX.Element | JSX.Element[];
  classname?: string;
}
export const CardBody: React.FC<Props> = ({ children, classname }) => {
  return <div className={`card-body ${classname}`}>{children}</div>;
};
