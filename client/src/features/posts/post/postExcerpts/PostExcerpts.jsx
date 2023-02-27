import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getCurrentToken } from "features/auth/authSlice";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDeletePostMutation, useUpdatePostMutation } from "features/posts/post/postApiSlice";
import { v4 } from "uuid";
import { storage } from "config/Firebase";
import { formatDistanceToNow} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import './postExcerpts.css';
import { useGetOneAvatarQuery } from "features/profile/profileApiSlice";
import { useGetOneUserQuery } from "features/users/usersApiSlice";

const PostExcerpts = ({ post }) => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  // Image Reference for firebase
  const imageRef = ref(storage, `images/${post.imageName}`);

  // States
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newDescription, setNewDescription] = useState(null);

  // Mutations
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // Queries
  const { data: avatar } = useGetOneAvatarQuery(post.UserId);
  const { data: user } = useGetOneUserQuery(post.UserId);

  // Defining posts date and creation time variables
  const date = new Date(post.createdAt).toISOString();
  const timeZone = 'Europe/Paris';
  const formatedDate = utcToZonedTime(date, timeZone);
  const timePeriod = formatDistanceToNow(formatedDate);

  // Reset states function
  function resetFields(){
    setImage(null);
    setIsEdit(false);
    setNewDescription(null);
  }

  // Post update validation function
  async function postUpdate(){
    const newImageRef = ref(storage, `images/${image.name + v4()}`);
    const snapshot = await uploadBytes(newImageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    if (newDescription) {
      return (
        await updatePost({ ...post, 
          description: newDescription,
          imageName: snapshot.metadata.name, 
          imageUrl: url 
        }),
        resetFields()
      )
    }
    await updatePost({ ...post, 
      imageName: snapshot.metadata.name, 
      imageUrl: url 
    });
    resetFields();
  }

  // Update function
  const handleUpdate = async () => {
    try {
      if (image && !post.imageUrl && !post.imageName){
        postUpdate();
      } else if (image && post.imageUrl && post.imageName) {
        await deleteObject(imageRef)
        postUpdate();
      } else {
        await updatePost({ ...post, 
          description: newDescription
        });
        resetFields()
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete function
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

  // Update and Delete buttons
  const PostExcerptsButtons = (
    <div>
      <button onClick={() => setIsEdit((prev) => !prev)}>
        <FontAwesomeIcon icon={faFilePen} />
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
          <img src={avatar?.avatarUrl} alt="profile" />
          <div>
            {user?.isAdmin
              ? <h1 className="post-author" style={{ color: "#FD2D01"}}>{`[${post.author}]`}</h1>
              : <h1 className="post-author">{post.author}</h1>
            }
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