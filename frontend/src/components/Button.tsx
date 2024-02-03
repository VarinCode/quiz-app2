import { ReactElement, FC, JSX } from "react";

interface ButtonProps {
  text?: string;
  icon?: JSX.Element;
  style: string;
  disabled?: boolean;
  callback?: () => void;
}

const Button: FC<ButtonProps> = ({ text, icon, style, callback, disabled }): ReactElement => {
  return (
    <button className={style} onClick={callback} disabled={disabled}>
      <p className="font-mali">{text}</p>
      {icon}
    </button>
  );
};

export default Button;
