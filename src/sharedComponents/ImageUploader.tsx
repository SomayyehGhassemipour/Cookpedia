import React, { useRef } from "react";

interface Props {
  image: any;
  changeHandler: any;
  type: "rectangle" | "circle";
}

export const ImageUploader: React.FC<Props> = ({
  type,
  image,
  changeHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex-center image-frame"
      data-type={type}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="input-field"
        hidden
        ref={inputRef}
        onChange={changeHandler}
      />
      {image ? (
        <img
          className="image"
          alt="uploaded_image"
          src={image instanceof Object ? URL.createObjectURL(image) : image}
        />
      ) : (
        <div className="flex-center">
          <img src={"../icons8-photo-64.png"} alt="image_icon" />
          <p className="text-neutral-400">Add recipe cover image</p>
        </div>
      )}
    </div>
  );
};
