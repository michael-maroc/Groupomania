import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEraser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import CommentsList from "../commentsList/CommentList";
import { useDeletePostMutation, useUpdatePostMutation } from "../../slices/postApiSlice";
import { useState } from "react";
import "./post.scss";
import { useAddLikeMutation, useGetPostLikesQuery } from "../../slices/likesApiSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../config/Firebase";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../../slices/authSlice";
import jwt_decode from "jwt-decode";

const PostList = ({ post }) => {
  // /* trying to decoded the role to grant access to delete and update buttons */
  const token = useSelector(getCurrentToken);

  const decode = jwt_decode(token);
  // console.log("=====>decode");
  // console.log(decode);

  // Editing states
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  // Image Reference for firebase
  const imageRef = ref(storage, `images/${post.imageName}`)

  // Mutations
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addLike] = useAddLikeMutation();

  // Query
  const { data: likes, isLoading, isSuccess, isError, isFetching, error } = useGetPostLikesQuery(post.id);

  // handle functions 
  const handleUpdate = async (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
    await updatePost({ ...post, description: newDescription })
      setNewDescription("");
      setIsEdit(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (post.imageUrl && post.imageName) {
      await deletePost({ id: post.id }).then((res) => {
        console.log(res.data)
        deleteObject(imageRef)
        console.log("Image successfuly deleted from firebase")
      })
    } else {
      await deletePost({ id: post.id }).then((res) => console.log(res.data))
    }
  };

  const handleLikes = async (e) => {
    e.preventDefault();
    await addLike({ PostId: post.id }).then((res) => console.log(res.data))
  };

  const buttons = (
    <div>
      <button onClick={() => setIsEdit((prev) => !prev)}>
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>)

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
            {decode?.id === post.UserId || decode?.admin 
              ? buttons
              : null
            }
            {/* <button onClick={() => setIsEdit((prev) => !prev)}>
              <FontAwesomeIcon icon={faEraser} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button> */}
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
        {post?.imageUrl
          ? <img src={post.imageUrl} alt="post" />
          : null }
      </main>
      <footer className="post-footer">
        <div className="actions">
          <FontAwesomeIcon 
            className="thumbs-up" 
            icon={faThumbsUp} 
            onClick={handleLikes} 
          />
          {likes?.length === 0 && null}
          {likes?.length === 1 && <span>{likes.length} like</span>}
          {likes?.length >= 2 && <span>{likes.length} likes</span>}
        </div>
        <CommentsList post={post} />
      </footer>
    </article>
  );
};

export default PostList;
