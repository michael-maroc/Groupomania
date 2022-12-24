import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEraser, faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import CommentsList from "../commentsList/CommentList";
import { Image } from "cloudinary-react";
import { useDeletePostMutation, useUpdatePostMutation } from "../../slices/postApiSlice";
import { useState } from "react";
import "./post.scss";
import { useAddLikeMutation } from "../../slices/likesApiSlice";

const PostList = ({ post }) => {
  // Editing states
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  // Mutations
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addLike] = useAddLikeMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
    await updatePost({ ...post, description: newDescription }).then(() => {
      setNewDescription("");
      setIsEdit(false);
    })
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deletePost({ id: post.id }).then((res) => console.log(res.data))
    /* Need to add the deletion of the picture in the DB */
  };

  const handleLikes = async (e) => {
    e.preventDefault();
    await addLike({ PostId: post.id }).then((res) => console.log(res.data))
  };

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
              <button onClick={handleUpdate}>Validate</button>
            </div>
          )}
        </div>
      </header>
      <main className="post-main">
        <Image cloudName={import.meta.env.VITE_CLOUD_NAME} publicId={post.imageUrl} />
      </main>
      <footer className="post-footer">
        <div className="actions">
          <FontAwesomeIcon 
            className="thumbs-up" 
            icon={faThumbsUp} 
            onClick={handleLikes} 
          />
          <FontAwesomeIcon 
            className="heart" 
            icon={faHeart} 
          />
        </div>
        <CommentsList post={post} />
      </footer>
    </article>
  );
};

export default PostList;
