import { forwardRef } from "react";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ error, label, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="text-primary text-body-sm mb-1 block">{label}</label>}
        <textarea
          ref={ref}
          data-cy="form-textarea"
          className={`bg-surface-input text-body text-primary min-h-24 w-full resize-none rounded-md border p-2 ${
            error ? "border-error" : "border-border-subtle focus:border-border-focus"
          } placeholder:text-placeholder focus:outline-none ${className}`}
          {...props}
        />
        {error && <span className="text-error text-body-sm mt-1 block">{error}</span>}
      </div>
    );
  },
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
