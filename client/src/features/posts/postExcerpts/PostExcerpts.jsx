import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEraser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getCurrentToken } from "../../auth/authSlice";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDeletePostMutation, useUpdatePostMutation } from "../post/postApiSlice";
import { v4 } from "uuid";
import { storage } from "../../../config/Firebase";
import { formatDistanceToNow} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import img1 from "/profile.png";
import './postExcerpts.scss';
import { useGetOneAvatarQuery } from "../../profile/profileApiSlice";

const PostExcerpts = ({ post }) => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  const [image, setImage] = useState(null);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const { data: avatar } = useGetOneAvatarQuery(post.UserId);

  // Editing states
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  // Image References for firebase
  const imageRef = ref(storage, `images/${post.imageName}`);

  // Defining posts date variables for date and time creation
  const date = new Date(post.createdAt).toISOString();
  const timeZone = 'Europe/Paris';
  const formatedDate = utcToZonedTime(date, timeZone);
  const timePeriod = formatDistanceToNow(formatedDate);

  // Handle functions 
  const handleUpdate = async () => {
    try {
      if (image) {
        await deleteObject(imageRef);
        const newImageRef = ref(storage, `images/${image.name + v4()}`);
        const snapshot = await uploadBytes(newImageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        await updatePost({ ...post, 
          description: newDescription, 
          imageName: snapshot.metadata.name, 
          imageUrl: url 
        });
        setImage(null);
        setNewDescription("");
        setIsEdit(false);
      } else {
        return (
          await updatePost({ ...post, description: newDescription }),
          setNewDescription(""),
          setIsEdit(false)
        )
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (post.imageUrl && post.imageName) {
        const result = await deletePost({ id: post.id });
          console.log(result.data.message);
          deleteObject(imageRef);
          console.log("Image successfuly deleted from firebase");
      } else {
        const result = await deletePost({ id: post.id });
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PostExcerptsButtons = (
    <div>
      <button onClick={() => setIsEdit((prev) => !prev)}>
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );

  const content = (
    <header className="post-excerpts">
      <div className="post-heading">
        <div>
          <img 
            src={avatar?.UserId === post?.UserId ? avatar.avatarUrl : img1} 
            alt="profile" />
          <div>
            <h1 className="post-author">{post.author}</h1>
            <span className="post-timestamp">Published {timePeriod} ago</span>
          </div>
        </div>
        <div className="post-edit-btn">
          {decoded?.id === post.UserId || decoded?.isAdmin 
          ? PostExcerptsButtons : null}
        </div>
      </div>
      <div className="post-description">
        <p>{post.description}</p>
        {isEdit && (
          <div>
            <textarea 
              type="text" 
              placeholder="New description..." 
              cols="30" 
              onChange={(e) => setNewDescription(e.target.value)} 
            />
            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
            />
            <button onClick={handleUpdate}>Validate</button>
          </div>
        )}
      </div>
    </header>
  );

  return content;
};

export default PostExcerpts;