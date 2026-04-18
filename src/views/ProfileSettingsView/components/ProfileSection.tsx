import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { FaIdCard } from "react-icons/fa6";
import { useAuth } from "src/context/AuthContext";
import FormInput from "components/FormComponents/FormInput";
import FormTextArea from "components/FormComponents/FormTextArea";
import Button from "components/ui/Button";
import SettingsSection from "./SettingsSection";

const profileSchema = yup.object({
  bio: yup.string().max(160, "Bio cannot exceed 160 characters").default(""),
  avatarUrl: yup
    .string()
    .test("url-or-empty", "Enter a valid URL", (v) => !v || /^https?:\/\/.+/.test(v))
    .default(""),
  coverUrl: yup
    .string()
    .test("url-or-empty", "Enter a valid URL", (v) => !v || /^https?:\/\/.+/.test(v))
    .default(""),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

const ProfileSection = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      bio: user?.bio ?? "",
      avatarUrl: user?.avatar ?? "",
      coverUrl: user?.coverImage ?? "",
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Profile updated!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <SettingsSection title="Profile" icon={<FaIdCard size={15} />}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormTextArea
          {...register("bio")}
          label="Bio"
          placeholder="Tell the world about yourself..."
          disabled={!isEditing}
          error={errors.bio?.message}
          className="min-h-20 p-3 bg-surface-primary"
        />
        <FormInput
          {...register("avatarUrl")}
          label="Avatar URL"
          placeholder="https://example.com/avatar.png"
          disabled={!isEditing}
          error={errors.avatarUrl?.message}
          className="p-3 bg-surface-primary"
        />
        <FormInput
          {...register("coverUrl")}
          label="Cover image URL"
          placeholder="https://example.com/cover.png"
          disabled={!isEditing}
          error={errors.coverUrl?.message}
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

export default ProfileSection;
