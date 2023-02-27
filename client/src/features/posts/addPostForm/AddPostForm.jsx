import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "features/posts/post/postApiSlice";
import { useState } from "react";
import { storage } from "config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { DESCRIPTION_REGEX } from "common/utils/Regex";
import "./addPostForm.css";

const AddPostForm = () => {
  const [image, setImage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  const [createPost] = useCreatePostMutation();

  const onSubmit = async (data) => {
    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        /* uploadBytes is the method from Firebase to upload things to the bucket */
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        await createPost({ 
          description: data.description, 
          imageName: snapshot.metadata.name, 
          imageUrl: url 
        });
        setImage(null);
        reset();
      } else {
        await createPost({ description: data.description });
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <section className="add-post">
      <form className="add-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="post-form-description">Description:</label>
          <textarea
            id="post-form-description"
            className="post-form-description"
            placeholder="Express yourself..."
            {...register("description", {
              required: true,
              minLength: 2,
              pattern: DESCRIPTION_REGEX
            })}
          ></textarea>
          {errors.description && 
            <span className="danger" aria-label="assertive">
              The description should contain 2 chars min from a to z, 0 to 9, spaces and -_.()!$%@?&=+"'
            </span>
          }
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
        </div>
      </form>
    </section>
  )

  return content;
};

export default AddPostForm;
