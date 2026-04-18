import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, label, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="text-primary text-body-sm mb-1 block">{label}</label>}
        <input
          ref={ref}
          data-cy="form-input"
          className={`bg-surface-input text-body text-primary w-full rounded-md border p-2 ${
            error ? "border-error" : "border-border-subtle focus:border-border-focus"
          } placeholder:text-placeholder focus:outline-none ${className}`}
          {...props}
        />
        {error && <span className="text-error text-body-sm mt-1 block">{error}</span>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
