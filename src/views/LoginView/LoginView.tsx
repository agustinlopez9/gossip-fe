import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "src/context/AuthContext";
import FormInput from "components/FormComponents/FormInput";
import Button from "components/ui/Button";

const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean().default(false),
});

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginView = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    login();
    navigate("/home");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl mb-2 leading-tight text-primary">
          Welcome back
        </h2>
        <p className="text-sm text-secondary">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          {...register("email")}
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          autoComplete="email"
        />

        <FormInput
          {...register("password")}
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded cursor-pointer accent-brand-500"
            />
            <span className="text-sm text-secondary">Remember me</span>
          </label>

          <Link
            to="/recovery"
            className="text-sm font-medium transition-colors duration-150 text-brand-500 hover:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 pt-6 text-center text-sm border-t border-border-subtle text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold transition-colors duration-150 text-brand-500 hover:text-brand-400"
        >
          Create one
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
