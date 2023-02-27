import Post from "./post/Post";
import AddPostForm from "./addPostForm/AddPostForm";
import "./posts.css";
import { useGetAllPostsQuery } from "./post/postApiSlice";
import Footer from "common/components/footer/Footer";
import Header from "common/components/header/Header";

const Posts = () => {
  const { data: posts, isLoading, isSuccess, error } = useGetAllPostsQuery();

  return (
    <section className="posts">
      <Header />
      <AddPostForm />
      <article className="post">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>There was an error</h1>}
        {isSuccess && (
          <>
            {posts?.length 
              ? posts.map((post) => <Post post={post} key={post.id} />)
              : <h1>No posts to display !</h1>
            }
          </>
        )}
      </article>
      <Footer />
    </section>
  );
};

export default Posts;
