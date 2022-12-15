import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faEraser } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import CommentsList from "../commentsList/CommentList";
import { Image } from "cloudinary-react";
import { useDeletePostMutation, useUpdatePostMutation } from "../../slices/postApiSlice";
import { useState } from "react";
import "./post.scss";

const PostList = ({ post }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleClick = (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
    updatePost({ ...post, description: newDescription });
    setNewDescription("");
    setIsEdit(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deletePost({ id: post.id })
    /* Need to add the deletion of the picture in the DB */
  }

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-heading">
          <div>
            <img src={img1} alt="profile" />
            <div>
              <h1 className="post-author">{post.author}</h1>
              <span className="post-timestamp">Published the: {post.createdAt}</span>
            </div>
          </div>
          <div className="post-edit-btn">
            <button onClick={() => setIsEdit((prev) => !prev)}>
              <FontAwesomeIcon icon={faEraser} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <div className="post-description">
          <p>{post.description}</p>
          {isEdit && (
            <div>
              <textarea 
                type="text" 
                placeholder="New description..." 
                cols="30" 
                onChange={(e) => setNewDescription(e.target.value)} 
              />
              <button onClick={handleClick}>Submit</button>
            </div>
          )}
        </div>
      </header>
      <main className="post-main">
        <Image cloudName={import.meta.env.VITE_CLOUD_NAME} publicId={post.imageUrl} />
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
