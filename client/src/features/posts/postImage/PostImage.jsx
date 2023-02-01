import { useAddLikeMutation, useGetPostLikesQuery } from "../post/postApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import './postMain.scss';

const PostImage = ({ post }) => {
  const [addLike] = useAddLikeMutation();

  const { data: likes } = useGetPostLikesQuery(post.id);

  const handleLikes = async () => {
    const result = await addLike({ PostId: post.id });
    console.log(result.data.message);
  };

  const content = (
    <main className="post-image">
      {post?.imageUrl ? <img src={post.imageUrl} alt="post" /> : null}
      <div className="actions">
      <FontAwesomeIcon 
        className="thumbs-up" 
        icon={faThumbsUp} 
        onClick={handleLikes} 
      />
      {likes?.length === 0 && <span>{likes.length} like</span>}
      {likes?.length === 1 && <span>{likes.length} like</span>}
      {likes?.length >= 2 && <span>{likes.length} likes</span>}
      </div>
    </main>
  )

  return content;
};

export default PostImage;