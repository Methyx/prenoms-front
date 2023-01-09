// components
import TopNames from "../components/TopNames";

const Home = () => {
  return (
    <div className="container">
      <h1>HOME PAGE</h1>
      <TopNames years={2010} gender={"F"} />
    </div>
  );
};
export default Home;
