import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage, FaLink } from "react-icons/fa6";
import { useAuth } from "context/AuthContext";
import { useCreatePost } from "hooks/posts/useCreatePost";
import { validationSchema } from "./utils";
import type { CreatePostFormData } from "./types";
import Button from "components/ui/Button";
import FormInput from "components/FormComponents/FormInput";
import FormTextArea from "components/FormComponents/FormTextArea";

const CreatePostForm = () => {
  const { t } = useTranslation();
  const createPost = useCreatePost();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      createdAt: new Date().toISOString(),
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      await createPost.mutateAsync(data);
      reset();
      toast.success(t("post.copy.created"));
    } catch {
      toast.error(t("post.errors.create"));
    }
  };

  return (
    <div className="bg-surface-secondary border border-border-subtle rounded-xl mx-4 my-4 overflow-hidden">
      <div className="px-5 py-4 border-b border-border-subtle">
        <h3 className="font-display font-semibold text-base text-primary">
          {t("post.labels.titlePlaceholder")}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 py-4 space-y-3">
          <FormInput
            {...register("title")}
            placeholder={t("post.labels.titleInputPlaceholder")}
            error={errors.title?.message ? t(errors.title.message) : undefined}
            className="p-3 bg-surface-primary"
          />
          <FormTextArea
            {...register("content")}
            placeholder={t("post.labels.placeholder")}
            error={errors.content?.message ? t(errors.content.message) : undefined}
            className="p-3 bg-surface-primary"
          />
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle">
          <div className="flex items-center gap-1 opacity-40">
            <button type="button" disabled className="p-2 rounded-lg text-secondary cursor-not-allowed">
              <FaImage size={16} />
            </button>
            <button type="button" disabled className="p-2 rounded-lg text-secondary cursor-not-allowed">
              <FaLink size={15} />
            </button>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="small"
            loading={isSubmitting || createPost.isPending}
          >
            {t("common.actions.publish")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
