import Filters from "components/Filters";
import CreatePostForm from "components/PostForm/CreatePostForm";
import PostsList from "./PostsList";

const MainView = () => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 px-4 py-3 backdrop-blur-md border-b border-border-subtle">
        <h2 className="font-display font-bold text-lg text-primary">Home</h2>
      </div>
      <CreatePostForm />
      <Filters />
      <PostsList />
    </div>
  );
};

export default MainView;
