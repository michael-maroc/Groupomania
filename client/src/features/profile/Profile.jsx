import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { storage } from "../../config/Firebase";
import { getCurrentToken } from "../auth/authSlice";
import { useAddAvatarMutation, useGetOneAvatarQuery, useUpdateAvatarMutation } from "./profileApiSlice";

const Profile = () => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  const [addAvatar] = useAddAvatarMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  const { data: oldAvatar } = useGetOneAvatarQuery(decoded.id)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const avatar = data.avatar[0];
    try {
      if (avatar) {
        if (oldAvatar) {
          const imageRef = ref(storage, `avatar/${oldAvatar.avatarName}`);
          await deleteObject(imageRef)
          .then(() => console.log("object succesfuly deleted"))
          .catch(err => console.log(err))
        }
        const imageRef = ref(storage, `avatar/${avatar.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, avatar);
        const url = await getDownloadURL(snapshot.ref);
        await updateAvatar({
          avatarName: snapshot.metadata.name, avatarUrl: url
        });
        console.log("image uploaded");
      } else {
        console.log("No image found");
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <section className="profile-page">
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" { ...register('username')}/>
        </div>

        <div>
          <label htmlFor="avatar">Add your avatar </label>
          <input type="file" { ...register('avatar')}/>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default Profile;
