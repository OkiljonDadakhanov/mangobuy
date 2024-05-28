import React from "react";
import css from "./style.module.css";

function Button({onClick, disabled, children}) {
  return (
    <button onClick={onClick} className={css.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
