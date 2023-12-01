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
        <>
          <img
            className={`${classname}`}
            src={url}
            alt={name}
            data-size={size}
            data-type={type}
          />

          <div
            className="edit-avatar"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <Icon name="edit" size="sm" />
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/jfij"
            className="input-field"
            hidden
            ref={inputRef}
            onChange={changeHandler}
          />
        </>
      ) : (
        <img
          className={`${classname}`}
          src={typeof url == "string" ? url : URL.createObjectURL(url)}
          alt={name}
          data-size={size}
          data-type={type}
        />
      )}
    </div>
  );
};
