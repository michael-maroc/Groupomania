import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCommentMutation } from "../../slices/commentsApiSlice";
import img1 from "/profile.png";
import "./addCommentForm.scss";

const AddCommentForm = ({ post }) => {
  const schema = yup.object({
    comment: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [addComment] = useAddCommentMutation();

  /* Need to understand that part... QUICK... */
  const onSubmit = async ({ comment }) => {
    await addComment({ comment, PostId: post.id }).then(() => {
      reset();
    });
  };
  
  return (
    <form className="add-comment-form" onSubmit={handleSubmit(onSubmit)}>
      <img src={img1} alt="profile-pic" />
      <input type="text" placeholder="Add your comment..." {...register("comment")} />
      <button type="submit">Submit</button>
      <p className="add-comment-error errMsg">{errors?.comment?.message}</p>
    </form>
  );
};

export default AddCommentForm;
