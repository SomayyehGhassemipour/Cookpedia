import React, { useState, useRef } from "react";

interface Props {
  image: any;
  changeHandler: any;
}

export const ImageUploader: React.FC<Props> = ({ image, changeHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex-center image-frame"
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
          src={URL.createObjectURL(image)}
        />
      ) : (
        <div className="flex-center">
          <img src="icons8-photo-64.png" alt="image_icon" />
          <p className="text-neutral-400">Add recipe cover image</p>
        </div>
      )}
    </div>
  );
};
