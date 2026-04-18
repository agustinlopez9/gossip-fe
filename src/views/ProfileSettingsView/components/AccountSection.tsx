import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "src/context/AuthContext";
import FormInput from "components/FormComponents/FormInput";
import Button from "components/ui/Button";
import SettingsSection from "./SettingsSection";

const accountSchema = yup.object({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required").min(3, "At least 3 characters"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
});

interface AccountFormData {
  name: string;
  username: string;
  email: string;
}

const AccountSection = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      email: "john@example.com",
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Account updated!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <SettingsSection title="Account" icon={<FaUser size={15} />}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          {...register("name")}
          label="Display name"
          placeholder="John Wick"
          disabled={!isEditing}
          error={errors.name?.message}
          className="p-3 bg-surface-primary"
        />
        <FormInput
          {...register("username")}
          label="Username"
          placeholder="johnwick"
          disabled={!isEditing}
          error={errors.username?.message}
          className="p-3 bg-surface-primary"
        />
        <FormInput
          {...register("email")}
          label="Email"
          type="email"
          placeholder="you@example.com"
          disabled={!isEditing}
          error={errors.email?.message}
          className="p-3 bg-surface-primary"
        />
        <div className="flex justify-end gap-3 pt-1">
          {isEditing ? (
            <>
              <Button variant="outlined" size="small" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="small" type="submit" loading={isSubmitting}>
                Save changes
              </Button>
            </>
          ) : (
            <Button variant="outlined" size="small" type="button" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </form>
    </SettingsSection>
  );
};

export default AccountSection;
