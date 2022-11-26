import { useGetAllPostsQuery } from "./postApiSlice";
import Post from "../post/Post";
import NavBar from "../../../components/navBar/NavBar";
import "./PostsList.scss";

const PostsList = () => {
  const { data: posts, isLoading, isSuccess, isError, isFetching, error } = useGetAllPostsQuery();
  console.log(posts);

  return (
    <section className="post-list">
      <div className="post-list-container">
        <NavBar />
        {isFetching && <h1>Fetching data...</h1>}
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>There was an error</h2>}
        {isSuccess && (
          <section>
            {posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default PostsList;
