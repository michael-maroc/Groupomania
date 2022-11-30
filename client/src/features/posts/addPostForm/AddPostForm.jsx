import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation } from "../postsList.jsx/postApiSlice";
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [createPost] = useCreatePostMutation();

  const onSubmit = async (data) => {
    if (imageUrl[0]) {
      const formData = new FormData();
      formData.append("file", imageUrl[0]);
      formData.append("upload_preset", "hpln9zd8");

      axios.post("https://api.cloudinary.com/v1_1/dzvogj6gm/image/upload", formData).then((res) => {
        console.log(res);

        const filename = res.data.public_id;
        console.log(filename);

        const response = createPost({ description: data.description, imageUrl: filename });
        console.log(response);
      });
    } else {
      const response = createPost({ description: data.description });
      console.log(response);
    }
  };

  return (
    <section className="add-post">
      <form className="add-post-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="post-form-description">Description:</label>
        <textarea id="post-form-description" className="post-form-description" cols="30" placeholder="Express yourself..." {...register("description")}></textarea>
        <label htmlFor="post-form-image">
          Add an image <FontAwesomeIcon icon={faImage} />
        </label>
        <input id="post-form-image" type="file" onChange={(e) => setImageUrl(e.target.files)} />
        <button type="submit" className="post-btn">
          Submit
        </button>
        <p className="add-post-error errMsg">{errors?.description?.message}</p>
      </form>
    </section>
  );
};

export default AddPostForm;
