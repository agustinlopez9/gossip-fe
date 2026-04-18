import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "src/context/AuthContext";
import FormInput from "components/FormComponents/FormInput";
import Button from "components/ui/Button";
import UsernameInput from "./components/UsernameInput";
import type { SignUpFormData } from "./interfaces";

const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms to continue")
    .required(),
});

const SignUpView = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { acceptTerms: false },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    login();
    navigate("/home");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl mb-2 leading-tight text-primary">
          Create your account
        </h2>
        <p className="text-sm text-secondary">Join Gossip! today — it&apos;s free</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          {...register("name")}
          label="Full name"
          type="text"
          placeholder="John Wick"
          error={errors.name?.message}
          autoComplete="name"
        />

        <UsernameInput {...register("username")} error={errors.username} />

        <FormInput
          {...register("email")}
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          autoComplete="email"
        />

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            {...register("password")}
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            autoComplete="new-password"
          />
          <FormInput
            {...register("confirmPassword")}
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer accent-brand-500"
            />
            <span className="text-sm leading-tight text-secondary">
              I agree to the{" "}
              <span className="font-medium text-brand-500">Terms of Service</span>{" "}
              and{" "}
              <span className="font-medium text-brand-500">Privacy Policy</span>
            </span>
          </label>
          {errors.acceptTerms && (
            <span className="text-error text-body-sm mt-1 block">{errors.acceptTerms.message}</span>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          loading={isSubmitting}
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 pt-6 text-center text-sm border-t border-border-subtle text-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold transition-colors duration-150 text-brand-500 hover:text-brand-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpView;
