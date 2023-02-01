import { useAddCommentMutation, useGetPostCommentsQuery } from "../post/postApiSlice";
import img1 from "/profile.png";
import { useForm } from "react-hook-form";
import { COMMENT_REGEX } from "../../../common/utils/Regex";
import './comments.scss';
import { useGetAllAvatarsQuery, useGetOneAvatarQuery } from "../../profile/profileApiSlice";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../../auth/authSlice";

const Comments = ({ post }) => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  const { data: comments } = useGetPostCommentsQuery(post.id);
  const { data: avatar } = useGetOneAvatarQuery(decoded.id);
  const { data: commentAvatar } = useGetOneAvatarQuery(post.UserId);
  const { data: commentAvatar2 } = useGetAllAvatarsQuery();

  const [addComment] = useAddCommentMutation();

  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  const onSubmit = async (data) => {
    await addComment({ comment: data.comment, PostId: post.id })
    reset();
  };

  const content = (
    <footer className="post-footer">
      <section className="comments">
        <p>There is {comments?.length} comments</p>
        {comments?.map((comment) => {
          return (
            <div className="comments-container" key={comment.id}>
              {commentAvatar2?.map((el) => {
                return (
                  <img 
                    src={el?.UserId === comment?.UserId ? el.avatarUrl : null} 
                    alt="profile-pic" 
                  />
                )
              })}
              <div>
                <p className="author">{comment.author}</p>
                <p className="comment">{comment.comment}</p>
              </div>
            </div>
          )
        })}
        <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
          <img 
            src={avatar?.UserId === decoded?.id ? avatar?.avatarUrl : img1} 
            alt="profile-pic" 
          />
          <input 
            type="text" 
            placeholder="Add your comment..." 
            {...register("comment", {
              required: "Please add a comment before validation",
              minLength: {
                value: 2,
                message: "The comment should have at least 2 characters"
              },
              pattern: {
                value: COMMENT_REGEX,
                message: "Please enter valid characters"
              }
            })} 
          />
          <button type="submit">Submit</button>
        </form>
        <span className="danger">{errors?.comment?.message}</span>
      </section>
    </footer>
  )

  return content;
};

export default Comments;