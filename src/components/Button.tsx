import React from "react";
import { Link } from "react-router-dom";
interface ButtonProp {
  children: React.ReactNode;
  to: string;
}
function Button({ children, to }: ButtonProp) {
  return (
    <Link
      to={to}
      className="
            flex
            justify-center
            rounded-xl
            bg-(--btn)
            px-30
            py-4
            text-(--bg)
            transition-colors
            hover:bg-(--btn-gradiant)
        "
    >
      {children}
    </Link>
  );
}

export default Button;
