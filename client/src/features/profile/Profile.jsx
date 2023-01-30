import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { storage } from "../../config/Firebase";
import { useAddAvatarMutation } from "./profileApiSlice";

const Profile = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [addAvatar] = useAddAvatarMutation();
  const onSubmit = async (data) => {
    const avatar = data.avatar[0];
    try {
      if (avatar) {
        const imageRef = ref(storage, `avatar/${avatar.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, avatar);
        const url = await getDownloadURL(snapshot.ref);
        await addAvatar({
          avatarName: snapshot.metadata.name, avatarUrl: url
        })
        console.log("image uploaded");
      } else {
       console.log("no image found");
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
