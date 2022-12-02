import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faEraser } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import CommentsList from "../commentsList/CommentList";
import { Image } from "cloudinary-react";
import { useDeletePostMutation, useUpdatePostMutation } from "../postsList.jsx/postApiSlice";
import "./post.scss";
import { useState } from "react";

const PostList = ({ post }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const onNewDescriptionChanged = (e) => setNewDescription(e.target.value);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleClick = (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
    updatePost({ ...post, description: newDescription });
    setNewDescription("");
    setIsEdit(false);
  };

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
          <div>
            <button onClick={() => setIsEdit((prev) => !prev)}>
              <FontAwesomeIcon icon={faEraser} />
            </button>
            <button onClick={() => deletePost({ id: post.id })}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <div className="post-description">
          <p>{post.description}</p>
          {isEdit && (
            <div>
              <textarea type="text" placeholder="New description..." cols="30" onChange={onNewDescriptionChanged} />
              <button onClick={handleClick}>Submit</button>
            </div>
          )}
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
