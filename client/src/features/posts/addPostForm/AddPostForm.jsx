import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation } from "../post/postApiSlice";
import "./addPostForm.scss";
import { useState } from "react";
import { storage } from "../../../config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"

const AddPostForm = () => {
  const [image, setImage] = useState(null);

  const schema = yup.object({
    description: yup.string().required(),
  });

  const { register, handleSubmit, reset, formState: { errors }} = useForm({ resolver: yupResolver(schema) });

  const [createPost, { isLoading }] = useCreatePostMutation();

  const onSubmit = async (data) => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
  
      /* uploadBytes is the method from Firebase to upload things to the bucket */
      await uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          createPost({ description: data.description, imageName: snapshot.metadata.name, imageUrl: url })
          setImage(null)
          reset();
        })
      })
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
          onChange={(e) => setImage(e.target.files[0])}
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
