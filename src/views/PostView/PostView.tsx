import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { usePost } from "hooks/posts/usePost";
import Button from "components/ui/Button";
import NotFound from "components/NotFound";
import LoadingIndicator from "components/ui/Loading";
import Post from "components/Post/Post";
import CommentsSection from "views/PostView/components/CommentsSection";

const PostView = () => {
  const { t } = useTranslation();
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = usePost(postId || "");

  if (isLoading) {
    return (
      <div className="my-10 flex min-h-48 items-center justify-center">
        <LoadingIndicator
          loadingMessage={t("loading.copy.withData", {
            data: t("post.labels.title").toLowerCase(),
          })}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {t("post.errors.load")} {error.message}
      </div>
    );
  }

  if (!post) {
    return <NotFound message={t("notFound.copy.message")} />;
  }

  return (
    <div>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 backdrop-blur-md bg-surface-base/85 border-b border-border-subtle">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </Button>
        <span className="font-display font-bold text-base text-primary">Post</span>
      </div>

      <Post postId={post.id} enableHover={false}>
        <Post.Header avatar={post.avatar} name={post.name} createdAt={post.createdAt} />
        <Post.Content title={post.title} content={post.content} />
        <Post.Footer />
      </Post>

      <CommentsSection postId={postId} />
    </div>
  );
};

export default PostView;
