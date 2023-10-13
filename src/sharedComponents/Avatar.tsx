import { useRef } from "react";
import { Icon } from "./Icon";

interface Props {
  classname: string;
  url: any;
  name: string;
  type: "circle" | "rectangle";
  size: "xs" | "sm" | "lg";
  editable?: true | false;
  changeHandler?: any;
}
export const Avatar: React.FC<Props> = ({
  classname,
  url,
  name,
  type,
  size,
  editable,
  changeHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="profile-avatar">
      {editable ? (
        <div
          className="edit-avatar"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <img
            className={`${classname}`}
            src={URL.createObjectURL(url)}
            alt={name}
            data-size={size}
            data-type={type}
          />
          <Icon name="edit" size="sm" />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="input-field"
            hidden
            ref={inputRef}
            onChange={changeHandler}
          />
        </div>
      ) : (
        <img
          className={`${classname}`}
          src={url}
          alt={name}
          data-size={size}
          data-type={type}
        />
      )}
    </div>
  );
};
