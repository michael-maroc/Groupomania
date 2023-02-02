import Comments from "../comments/Comments";
import PostExcerpts from "./postExcerpts/PostExcerpts";
import { useGetAllPostsQuery } from "../post/postApiSlice";
import PostMain from "./postImage/PostImage";
import "./post.scss";

const Post = () => {
  const { data: posts, isLoading, isSuccess, error } = useGetAllPostsQuery();

  const content = (
    <article className="post">
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>There was an error</h1>}
      {isSuccess && (
        <>
          {posts?.length 
            ? posts.map((post) => {
              return (
                <section className="post-card" key={post.id}>
                  <PostExcerpts post={post} />
                  <PostMain post={post} />
                  <Comments post={post} />
                </section>
              )
            }) 
            : <h1>No posts to display !</h1>
          }
        </>
      )}
    </article>
  )

  return content;
};

export default Post;
