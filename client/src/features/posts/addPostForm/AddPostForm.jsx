import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../../components/navBar/NavBar";
import "./addPostForm.scss";

const AddPostForm = () => {
  return (
    <section className="add-post">
      <div className="add-post-container">
        <NavBar />
        <form className="add-post-form">
          <p>Description:</p>
          <textarea className="post-description" name="description" cols="30" rows="10" placeholder="Express yourself..."></textarea>
          <div className="post-image-container">
            <p>
              Add an image <FontAwesomeIcon icon={faImage} />
            </p>
          </div>
          <input type="file" />
          <button className="post-btn">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AddPostForm;
