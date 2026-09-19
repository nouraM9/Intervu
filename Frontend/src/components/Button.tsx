import React from "react";
import { Link } from "react-router-dom";
interface ButtonProp {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | "upload";
  to?: string;
  onClick?: () => void;
}
function Button({ children, type = "submit", to, onClick }: ButtonProp) {
  const className = `rounded-xl
            bg-(--btn)
            px-20
            py-4
            text-(--bg)
            transition-colors
            hover:bg-(--btn-gradiant)`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
