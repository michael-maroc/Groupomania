import { useAddCommentMutation, useGetPostCommentsQuery } from "./commentsApiSlice";
import img1 from "/profile.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./comments.scss";

const Comments = ({ post }) => {
  const { data: comments, isLoading, isSuccess, isError, error } = useGetPostCommentsQuery(post.id);

  const schema = yup.object({
    comment: yup.string().required("You must input a comment"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [addComment] = useAddCommentMutation();

  /* Need to understand that part... QUICK... */
  const onSubmit = async ({ comment }) => {
    await addComment({ comment, PostId: post.id }).then((res) => {
      console.log(res);
    });
  };

  let content;

  if (isLoading) {
    <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <section className="comments">
        <h1>Post ID: {post.id}</h1>

        {comments?.map((comment) => {
          return (
            <div className="comments-container" key={comment.id}>
              <img src={img1} alt="profile-pic" />
              <div>
                <p className="author">{post.author}</p>
                <p className="comment">{comment.comment}</p>
              </div>
            </div>
          );
        })}
        <div className="add-comment">
          <form onSubmit={handleSubmit(onSubmit)}>
            <img src={img1} alt="profile-pic" />
            <input type="text" placeholder="Add your comment..." {...register("comment")} />
            <button type="submit">Submit</button>
          </form>
          <p className="errMsg">{errors?.comment?.message}</p>
        </div>
      </section>
    );
  } else if (isError) {
    <p>{error}</p>;
  }

  return content;
};

export default Comments;
