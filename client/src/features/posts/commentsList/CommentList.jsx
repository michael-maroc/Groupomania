import { useGetPostCommentsQuery } from "../comments/commentsApiSlice";
import Comments from "../comments/Comments";

import "./commentsList.scss";
import AddCommentForm from "../addCommentForm/AddCommentForm";

const CommentsList = ({ post }) => {
  const { data: comments, isLoading, isSuccess, isError, isFetching, error } = useGetPostCommentsQuery(post.id);

  return (
    <section>
      {isFetching && <h1>Fetching data...</h1>}
      {isLoading && <h1>Loading...</h1>}
      {error && <h2>There was an error</h2>}
      {isSuccess && (
        <section className="comments">
          <h1>Post ID: {post.id}</h1>
          <p>There is {comments.length} comments</p>
          {comments?.map((comment) => {
            return <Comments comment={comment} key={comment.id} />;
          })}
          <AddCommentForm post={post} />
        </section>
      )}
    </section>
  );
};

export default CommentsList;