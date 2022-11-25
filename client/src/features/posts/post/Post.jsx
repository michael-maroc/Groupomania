import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import img1 from "/profile.png";
import img2 from "/pexels-maria-loznevaya-14026383.jpg";
import "./post.scss";
import Comments from "../comments/Comments";
import { useGetAllPostsQuery } from "./postApiSlice";

const Post = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetAllPostsQuery();

  console.log(posts);

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <section>
        {posts.map((post) => {
          return (
            <article className="post" key={post.id}>
              <header className="post-header">
                <div className="heading">
                  <img src={img1} alt="profile" />
                  <div>
                    <h1>{post.author}</h1>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
                <div className="description">
                  <p>{post.description}</p>
                </div>
              </header>
              <main className="post-main">
                <img src={img2} alt="post" />
              </main>
              <footer className="post-footer">
                <div className="actions">
                  <div>
                    <p>Like</p>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  <div>
                    <p>Comment</p>
                    <FontAwesomeIcon icon={faComment} />
                  </div>
                </div>
                <Comments post={post} />
              </footer>
            </article>
          );
        })}
      </section>
    );
  } else if (isError) {
    <p>{error}</p>;
  }
  return content;
};

export default Post;
