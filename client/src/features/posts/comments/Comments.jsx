import img1 from "/profile.png";
import "./comments.scss";

const Comments = ({ comment }) => {
  return (
    <div className="comments-container" key={comment.id}>
      <img src={img1} alt="profile-pic" />
      <div>
        <p className="author">{comment.author}</p>
        <p className="comment">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comments;
