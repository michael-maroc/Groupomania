import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { storage } from "../../config/Firebase";
import { getCurrentToken } from "../auth/authSlice";
import { useGetOneAvatarQuery, useUpdateAvatarMutation } from "./profileApiSlice";
import './profile.scss';
import { useGetOneUserQuery } from "../users/usersApiSlice";

const Profile = () => {
  const token = useSelector(getCurrentToken);
  const decoded = jwt_decode(token);

  const [updateAvatar] = useUpdateAvatarMutation();

  const { data: oldAvatar } = useGetOneAvatarQuery(decoded.id);
  const { data: currentUser } = useGetOneUserQuery(decoded.id);

  const date = new Date(currentUser?.createdAt);
  const convertedDate = date.toLocaleDateString();
  
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
        reset();
      } else {
        reset();
        console.log("No image found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="profile">
      <h1>Username: {decoded?.username}</h1>
      <h2>Registered since: {convertedDate}</h2>

      <div className="avatar-container">
          <img src={oldAvatar.avatarUrl} alt="profile" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="avatar">Add your avatar:</label>
          <input type="file" { ...register('avatar')}/>
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Profile;
