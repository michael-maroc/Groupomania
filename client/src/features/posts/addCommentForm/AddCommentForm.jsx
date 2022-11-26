import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCommentMutation } from "../comments/commentsApiSlice";
import img1 from "/profile.png";

const AddCommentForm = ({ post }) => {
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
  return (
    <div className="add-comment">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={img1} alt="profile-pic" />
          <input type="text" placeholder="Add your comment..." {...register("comment")} />
          <button type="submit">Submit</button>
        </div>
        <p className="errMsg">{errors?.comment?.message}</p>
      </form>
    </div>
  );
};

export default AddCommentForm;
