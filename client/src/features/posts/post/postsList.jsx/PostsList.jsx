import Post from "../Post";
import AddPostForm from "../../addPostForm/AddPostForm";
import "./postsList.scss";

const PostsList = () => {

  return (
    <section className="post-list">
      <AddPostForm />
      <Post />
    </section>
  );
};

export default PostsList;
