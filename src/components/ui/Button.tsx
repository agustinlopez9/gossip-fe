import type { ReactNode } from "react";
import LoadingIndicator from "./Loading";

type ButtonVariant = "primary" | "secondary" | "outlined";
type ButtonSize = "small" | "medium" | "large" | "icon";
type IconPosition = "start" | "end";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const Button = ({
  icon,
  iconPosition,
  variant = "primary",
  size = "medium",
  loading,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex ${iconPosition === "start" ? "flex-row" : "flex-row-reverse"} btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {loading ? (
        <LoadingIndicator showMessage={false} size="small" />
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
