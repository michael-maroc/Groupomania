import { useAddCommentMutation, useAddLikeMutation, useGetPostCommentsQuery, useGetPostLikesQuery } from "features/posts/post/postApiSlice";
import { useForm } from "react-hook-form";
import { COMMENT_REGEX } from "common/utils/Regex";
import './comments.css';
import { useGetAllAvatarsQuery, useGetOneAvatarQuery } from "features/profile/profileApiSlice";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { getCurrentToken } from "features/auth/authSlice";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comments = ({ post }) => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  const { data: comments } = useGetPostCommentsQuery(post.id);
  const { data: avatar } = useGetOneAvatarQuery(decoded.id);
  const { data: avatarsList } = useGetAllAvatarsQuery();
  const { data: likes } = useGetPostLikesQuery(post.id);

  const [addLike] = useAddLikeMutation();
  const [addComment] = useAddCommentMutation();

  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  const handleLikes = async () => {
    const result = await addLike({ PostId: post.id });
    console.log(result.data.message);
  };

  const onSubmit = async (data) => {
    await addComment({ comment: data.comment, PostId: post.id })
    reset();
  };

  const content = (
    <footer className="post-footer">
      <section className="comments">
        <div className="actions">
          <div>
            <FontAwesomeIcon 
              className="thumbs-up" 
              icon={faThumbsUp} 
              onClick={handleLikes} 
            />
            {!likes?.length && <span>0</span>}
            {likes?.length === 1 && <span>{likes.length} like</span>}
            {likes?.length >= 2 && <span>{likes.length} likes</span>}
          </div>
          {!comments?.length && null}
          {comments?.length === 1 && <p>{comments.length} comment</p>}
          {comments?.length >= 2 && <p>{comments.length} comments</p>}
        </div>
        {comments?.map((comment) => {
          return (
            <div className="comments-container" key={comment.id}>
              {avatarsList?.map((avatar) => avatar?.UserId === comment?.UserId && (
                <img key={avatar.id} src={avatar.avatarUrl} alt="profile" />
              )
              )}
              <div>
                <p className="author">{comment.author}</p>
                <p className="comment">{comment.comment}</p>
              </div>
            </div>
          )
        })}
        <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
          <img 
            src={avatar?.avatarUrl} 
            alt="profile-pic" 
          />
          <input 
            type="text" 
            placeholder="Add your comment..." 
            {...register("comment", {
              required: true,
              minLength: 2,
              pattern: COMMENT_REGEX
            })} 
          />
          <button type="submit">Submit</button>
        </form>
        {errors.comment && 
          <span className="danger" aria-label="assertive">
            The comment should contain 2 chars min from a to z, 0 to 9, spaces and -_.()!$%@?&=+"'
          </span>
        }
      </section>
    </footer>
  )

  return content;
};

export default Comments;