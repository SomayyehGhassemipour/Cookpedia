import React from "react";
interface Props {
  type: string;
  children?: React.ReactNode[];
}
export const Shape: React.FC<Props> = ({ type, children }) => {
  return type === "circle" ? (
    <div
      className="bg-primary-900 text-primary-600"
      style={{
        borderRadius: "50%",
        maxWidth: 30,
        minWidth: 30,
        maxHeight: 30,
        minHeight: 30,
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  ) : (
    <div> rectangle {children}</div>
  );
};
