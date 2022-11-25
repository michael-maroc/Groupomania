import "./home.scss";
import NavBar from "../../../components/navBar/NavBar";
import Post from "../post/Post";

const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <NavBar />
        <Post />
      </div>
    </section>
  );
};

export default Home;
