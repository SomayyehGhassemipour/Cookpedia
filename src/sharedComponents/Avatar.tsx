interface Props {
  classname: string;
  url: string;
  name: string;
  type: "circle" | "rectangle";
  size: "xs" | "sm" | "lg";
}
export const Avatar: React.FC<Props> = ({
  classname,
  url,
  name,
  type,
  size,
}) => {
  return (
    <img
      className={`${classname}`}
      src={url}
      alt={name}
      data-size={size}
      data-type={type}
    />
  );
};
