import { useTranslation } from "react-i18next";
import type { UseFormRegister, FieldErrors, FieldPath } from "react-hook-form";
import FormTextArea from "components/FormComponents/FormTextArea";
import Button from "components/ui/Button";
import type { CreateCommentFormData, EditCommentFormData } from "./types";

type CommentFormType = CreateCommentFormData | EditCommentFormData;

interface CommentFormFieldsProps<T extends CommentFormType> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  handleCancel?: () => void;
  isSubmittingOrPending?: boolean;
}

const CommentFormFields = <T extends CommentFormType>({
  register,
  errors,
  handleCancel,
  isSubmittingOrPending,
}: CommentFormFieldsProps<T>) => {
  const { t } = useTranslation();

  return (
    <>
      <FormTextArea
        {...register("content" as FieldPath<T>)}
        placeholder={t("comments.labels.placeholder")}
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

export default CommentFormFields;
