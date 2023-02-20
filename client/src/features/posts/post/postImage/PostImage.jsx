import './postImage.scss';

const PostImage = ({ post }) => {
  const content = (
    <main className="post-image">
      {post?.imageUrl ? <img src={post.imageUrl} alt="post" /> : null}
    </main>
  )

  return content;
};

export default PostImage;