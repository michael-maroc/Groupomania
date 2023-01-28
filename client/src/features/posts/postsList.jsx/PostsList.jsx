import Post from "../post/Post";
import AddPostForm from "../addPostForm/AddPostForm";
import "./PostsList.scss";

const PostsList = () => {

  return (
    <section className="post-list">
      <AddPostForm />
      <Post />
    </section>
  );
};

export default PostsList;
