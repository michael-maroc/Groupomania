import Comments from "./comments/Comments";
import PostExcerpts from "./postExcerpts/PostExcerpts";
import PostImage from "./postImage/PostImage";
import "./post.css";

const Post = ({ post }) => {

  const content = (
    <section className="post-card" key={post.id}>
      <PostExcerpts post={post} />
      <PostImage post={post} />
      <Comments post={post} />
    </section>      
  )

  return content;
};

export default Post;
