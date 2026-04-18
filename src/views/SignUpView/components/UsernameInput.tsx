import { forwardRef } from "react";
import { FaAt } from "react-icons/fa6";
import type { FieldError } from "react-hook-form";

interface UsernameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | string;
}

const UsernameInput = forwardRef<HTMLInputElement, UsernameInputProps>(
  ({ error, ...props }, ref) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="w-full">
        <label className="text-primary text-body-sm mb-1 block">Username</label>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 select-none pointer-events-none text-tertiary">
            <FaAt size={12} />
          </span>
          <input
            ref={ref}
            type="text"
            placeholder="johnwick"
            autoComplete="username"
            className={`bg-surface-input text-body text-primary w-full rounded-md border p-2 pl-7 ${
              errorMessage ? "border-error" : "border-border-subtle focus:border-border-focus"
            } placeholder:text-placeholder focus:outline-none`}
            {...props}
          />
        </div>
        {errorMessage && (
          <span className="text-error text-body-sm mt-1 block">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default UsernameInput;
