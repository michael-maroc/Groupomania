import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation } from "../../slices/postApiSlice";
import "./addPostForm.scss";
import { useState } from "react";
import axios from "axios";

const AddPostForm = () => {
  const [imageUrl, setImageUrl] = useState([]);

  const schema = yup.object({
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [createPost, { isLoading }] = useCreatePostMutation();

  const onSubmit = async (data) => {
    if (imageUrl[0]) {
      const formData = new FormData();
      formData.append("file", imageUrl[0]);
      formData.append("upload_preset", `${import.meta.env.VITE_CLOUD_PRESETS}`);

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);
      const filename = await res.data.public_id;
      await createPost({ description: data.description, imageUrl: filename });
      reset();
      
    } else {
      await createPost({ description: data.description });
      reset();
    }
  };

  return (
    <section className="add-post">
      <form className="add-post-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="post-form-description">Description:</label>
        <textarea
          id="post-form-description"
          className="post-form-description"
          cols="30"
          placeholder="Express yourself..."
          {...register("description")}
        ></textarea>
        <label htmlFor="post-form-image">
          Add an image <FontAwesomeIcon icon={faImage} />
        </label>
        <input
          id="post-form-image"
          type="file"
          onChange={(e) => setImageUrl(e.target.files)}
        />
        <button type="submit" className="post-btn">
          Submit
        </button>
        <p className="add-post-error errMsg">{errors?.description?.message}</p>
        {isLoading}
      </form>
    </section>
  );
};

export default AddPostForm;
