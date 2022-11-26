import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import img1 from "/profile.png";
import img2 from "/pexels-maria-loznevaya-14026383.jpg";
import CommentsList from "../commentsList/CommentList";
import "./post.scss";

const PostList = ({ post }) => {
  return (
    <article className="post">
      <header className="post-header">
        <div className="heading">
          <img src={img1} alt="profile" />
          <div>
            <h1>{post.author}</h1>
            <span>Published the: {post.createdAt}</span>
          </div>
        </div>
        <div className="description">
          <p>{post.description}</p>
        </div>
      </header>
      <main className="post-main">
        <img src={img2} alt="post" />
      </main>
      <footer className="post-footer">
        <div className="actions">
          <div>
            <p>Like</p>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div>
            <p>Comment</p>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>
        <CommentsList post={post} />
      </footer>
    </article>
  );
};

export default PostList;
