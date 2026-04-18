import { useTranslation } from "react-i18next";
import type { UseFormRegister, FieldErrors, FieldPath } from "react-hook-form";
import FormInput from "components/FormComponents/FormInput";
import FormTextArea from "components/FormComponents/FormTextArea";
import Button from "components/ui/Button";
import type { CreatePostFormData, EditPostFormData } from "./types";

type PostFormData = CreatePostFormData | EditPostFormData;

interface PostFormFieldsProps<T extends PostFormData> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  handleCancel?: () => void;
  isSubmittingOrPending?: boolean;
}

const PostFormFields = <T extends PostFormData>({
  register,
  errors,
  handleCancel,
  isSubmittingOrPending,
}: PostFormFieldsProps<T>) => {
  const { t } = useTranslation();

  return (
    <>
      <FormInput
        {...register("title" as FieldPath<T>)}
        placeholder={t("post.labels.titlePlaceholder")}
        error={errors.title?.message ? t(errors.title.message as string) : undefined}
      />
      <FormTextArea
        {...register("content" as FieldPath<T>)}
        placeholder={t("post.labels.placeholder")}
        error={errors.content?.message ? t(errors.content.message as string) : undefined}
      />
      <div className="flex justify-end gap-2">
        {handleCancel && (
          <Button
            type="button"
            variant="outlined"
            disabled={isSubmittingOrPending}
            onClick={handleCancel}
          >
            {t("common.actions.cancel")}
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isSubmittingOrPending}>
          {handleCancel ? t("common.actions.save") : t("common.actions.publish")}
        </Button>
      </div>
    </>
  );
};

export default PostFormFields;
