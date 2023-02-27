import './postImage.css';

const PostImage = ({ post }) => {
  const content = (
    <main className="post-image-container">
      {post?.imageUrl
       ? <img src={post.imageUrl} alt="post" className="post-image" /> 
       : null
      }
    </main>
  )

  return content;
};

export default PostImage;