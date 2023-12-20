import { useRef } from "react";
import { Icon } from "./Icon";

interface Props {
  classname: string;
  image: any;
  name: string;
  type: "circle" | "rectangle";
  size: "xs" | "sm" | "lg";
  editable?: true | false;
  changeHandler?: any;
}
export const Avatar: React.FC<Props> = ({
  classname,
  image,
  name,
  type,
  size,
  editable,
  changeHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("iiiii", image instanceof Object);
  return (
    <div className="profile-avatar">
      <img
        className={`${classname}`}
        src={typeof image == "string" ? image : URL.createObjectURL(image)}
        alt={name}
        data-size={size}
        data-type={type}
      />
      {editable && (
        <>
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
            accept="image/png, image/jpeg, image/jpg"
            className="input-field"
            hidden
            ref={inputRef}
            onChange={changeHandler}
          />
        </>
      )}
    </div>
  );
};
