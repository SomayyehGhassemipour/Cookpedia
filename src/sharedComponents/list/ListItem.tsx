interface Props {
  id?: string;
  align: string;
  type?: string;
  children?: JSX.Element | JSX.Element[] | any;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export const ListItem: React.FC<Props> = ({
  id,
  children,
  align,
  type,
  selected,
  onClick,
}) => {
  return (
    <button
      className="list-click-area"
      id={id}
      data-type={type}
      data-select={selected}
      type="button"
      onClick={onClick}
      role="list-item"
    >
      <div className="list-item" data-type={align}>
        {children}
      </div>
    </button>
  );
};
