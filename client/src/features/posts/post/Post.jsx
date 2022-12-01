import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import CommentsList from "../commentsList/CommentList";
import { Image } from "cloudinary-react";
import "./post.scss";
import { useDeletePostMutation } from "../postsList.jsx/postApiSlice";

const PostList = ({ post }) => {
  const [deletePost] = useDeletePostMutation();

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-heading" style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <img src={img1} alt="profile" />
            <div>
              <h1 className="post-author">{post.author}</h1>
              <span className="post-timestamp">Published the: {post.createdAt}</span>
            </div>
          </div>
          <button onClick={() => deletePost({ id: post.id })}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
        <div className="post-description">
          <p>{post.description}</p>
        </div>
      </header>
      <main className="post-main">
        <Image cloudName="dzvogj6gm" publicId={post.imageUrl} />
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
