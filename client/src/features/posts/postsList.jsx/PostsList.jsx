import { useGetAllPostsQuery } from "../post/postApiSlice";
import Post from "../post/Post";
import AddPostForm from "../addPostForm/AddPostForm";
import "./PostsList.scss";

const PostsList = () => {
  const { data: posts, isLoading, isSuccess, error } = useGetAllPostsQuery();

  return (
    <section className="post-list">
      {isLoading && <h1>Loading...</h1>}
      {error && <h2>There was an error</h2>}
      {isSuccess && (
        <>
          <AddPostForm />
          {posts.length 
            ? posts.map((post) => <Post post={post} key={post.id} />) 
            : <h1>No posts to display !</h1>
          }
        </>
      )}
    </section>
  );
};

export default PostsList;
