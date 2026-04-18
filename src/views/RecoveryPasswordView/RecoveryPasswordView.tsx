import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import FormInput from "components/FormComponents/FormInput";
import Button from "components/ui/Button";
import SuccessState from "./components/SuccessState";
import type { RecoveryStep, RecoveryFormData } from "./interfaces";

const recoverySchema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
});

const RecoveryPasswordView = () => {
  const [step, setStep] = useState<RecoveryStep>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormData>({
    resolver: yupResolver(recoverySchema),
  });

  const onSubmit = async () => {
    setStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
  };

  if (step === "success") {
    return <SuccessState />;
  }

  return (
    <div>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-brand-500/12">
        <FaEnvelope size={20} className="text-brand-500" />
      </div>

      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl mb-2 leading-tight text-primary">
          Reset your password
        </h2>
        <p className="text-sm leading-relaxed text-secondary">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
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

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          loading={step === "loading"}
        >
          Send reset link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-150 text-tertiary hover:text-secondary"
        >
          <FaArrowLeft size={12} />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default RecoveryPasswordView;
