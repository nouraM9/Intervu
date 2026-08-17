import React from "react";
import { Link } from "react-router-dom";
interface ButtonProp {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}
function Button({ children, type = "submit" }: ButtonProp) {
  return (
    <button
      type={type}
      className="
   
            rounded-xl
            bg-(--btn)
            w-full
            px-30
            py-4
            text-center
            text-(--bg)
            transition-colors
            hover:bg-(--btn-gradiant)
        "
    >
      {children}
    </button>
  );
}

export default Button;
