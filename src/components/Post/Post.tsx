import { useState, type PropsWithChildren } from "react";
import { PostContext } from "./context";
import PostHeader from "./components/PostHeader";
import PostFooter from "./components/PostFooter";
import PostContent from "./components/PostContent";

interface PostProps extends PropsWithChildren {
  postId?: string;
  enableHover?: boolean;
  editable?: boolean;
  onClick?: () => void;
}

const PostRoot = ({
  postId,
  enableHover = true,
  editable = true,
  onClick,
  children,
}: PostProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (!dropdownOpen && onClick) {
      onClick();
    }
  };

  return (
    <PostContext.Provider
      value={{ postId, dropdownOpen, setDropdownOpen, isEditing, setIsEditing, editable }}
    >
      <div
        onClick={handleClick}
        className={`text-primary bg-surface-secondary border-border-subtle relative border ${enableHover && !dropdownOpen ? "hover:border-border-interactive" : ""} ${onClick && !dropdownOpen ? "cursor-pointer" : ""} m-2 rounded-sm p-4 shadow-sm transition duration-200 ease-in-out`}
      >
        {children}
      </div>
    </PostContext.Provider>
  );
};

type PostComponent = typeof PostRoot & {
  Header: typeof PostHeader;
  Content: typeof PostContent;
  Footer: typeof PostFooter;
};

const Post = PostRoot as PostComponent;
Post.Header = PostHeader;
Post.Content = PostContent;
Post.Footer = PostFooter;

export default Post;
