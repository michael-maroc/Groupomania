import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEraser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import img1 from "/profile.png";
import { useDeletePostMutation, useUpdatePostMutation } from "./postApiSlice";
import { useState } from "react";
import "./post.scss";
import { useAddLikeMutation, useGetPostLikesQuery } from "./postApiSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../config/Firebase";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../../auth/authSlice";
import jwt_decode from "jwt-decode";
import { useAddCommentMutation, useGetPostCommentsQuery } from "./postApiSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const PostList = ({ post }) => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  // Defining posts date variables for date and time creation
  const date = new Date(post.createdAt).toLocaleDateString();
  const time = new Date(post.createdAt).toLocaleTimeString();

  // Editing states
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  // Queries
  const { data: likes } = useGetPostLikesQuery(post.id);
  const { data: comments, isLoading, isSuccess, error } = useGetPostCommentsQuery(post.id);

  // Mutations
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [addLike] = useAddLikeMutation();
  const [addComment] = useAddCommentMutation();

  // Image Reference for firebase
  const imageRef = ref(storage, `images/${post.imageName}`)

  // handle functions 
  const handleUpdate = async (e) => {
    setNewDescription(e.target.value);
    await updatePost({ ...post, description: newDescription })
    setNewDescription("");
    setIsEdit(false);
  };

  const handleDelete = async () => {
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

  const handleLikes = async () => {
    await addLike({ PostId: post.id }).then((res) => console.log(res.data))
  };
  // End of handle functions

  const postHeaderButtons = (
    <div>
      <button onClick={() => setIsEdit((prev) => !prev)}>
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )

  // Comments validation
  const schema = yup.object({
    comment: yup.string().required(),
  });
  const { register, handleSubmit, formState: { errors }, reset} = useForm({ resolver: yupResolver(schema) });

  // Comment Submit Function
  const onSubmit = async (data) => {
    await addComment({ comment: data.comment, PostId: post.id }).then(() => {
      reset();
    });
  };

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-heading">
          <div>
            <img src={img1} alt="profile" />
            <div>
              <h1 className="post-author">{post.author}</h1>
              <span className="post-timestamp">Published the: {date} at: {time}</span>
            </div>
          </div>
          <div className="post-edit-btn">
            {decoded?.id === post.UserId || decoded?.isAdmin ? postHeaderButtons : null}
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
        <section>
          {isLoading && <h1>Loading...</h1>}
          {error && <h2>There was an error</h2>}
          {isSuccess && (
            <section className="comments">
              <p>There is {comments?.length} comments</p>
              {comments?.map((comment) => {
                return (
                  <div className="comments-container" key={comment.id}>
                    <img src={img1} alt="profile-pic" />
                    <div>
                      <p className="author">{comment.author}</p>
                      <p className="comment">{comment.comment}</p>
                    </div>
                  </div>
                )
              })}
              <form className="add-comment-form" onSubmit={handleSubmit(onSubmit)}>
                <img src={img1} alt="profile-pic" />
                <input type="text" placeholder="Add your comment..." {...register("comment")} />
                <button type="submit">Submit</button>
                <p className="add-comment-error errMsg">{errors?.comment?.message}</p>
              </form>
            </section>
          )}
        </section>
      </footer>
    </article>
  );
};

export default PostList;
