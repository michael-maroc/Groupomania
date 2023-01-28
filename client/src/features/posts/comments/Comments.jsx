import { useAddCommentMutation, useGetPostCommentsQuery } from "../post/postApiSlice";
import img1 from "/profile.png";
import { useForm } from "react-hook-form";
import './comments.scss';
import { COMMENT_REGEX } from "../../../common/utils/Regex";

const Comments = ({ post }) => {
  const { data: comments } = useGetPostCommentsQuery(post.id);

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
              <img src={img1} alt="profile-pic" />
              <div>
                <p className="author">{comment.author}</p>
                <p className="comment">{comment.comment}</p>
              </div>
            </div>
          )
        })}
        <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
          <img src={img1} alt="profile-pic" />
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
          })} />
          <button type="submit">Submit</button>
        </form>
          <p className="danger">{errors?.comment?.message}</p>
      </section>
    </footer>
  )

  return content;
};

export default Comments;