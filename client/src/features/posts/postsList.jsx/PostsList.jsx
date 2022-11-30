import { useGetAllPostsQuery } from "./postApiSlice";
import Post from "../post/Post";
import "./PostsList.scss";
import AddPostForm from "../addPostForm/AddPostForm";

const PostsList = () => {
  const { data: posts, isLoading, isSuccess, isError, isFetching, error } = useGetAllPostsQuery();
  console.log(posts);

  return (
    <section className="post-list">
      <div className="post-list-container">
        {isFetching && <h1>Fetching data...</h1>}
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>There was an error</h2>}
        {isSuccess && (
          <>
            <AddPostForm />
            <section>{posts.length ? posts.map((post) => <Post post={post} key={post.id} />) : <h1>No posts to display !</h1>}</section>
          </>
        )}
      </div>
    </section>
  );
};

export default PostsList;
