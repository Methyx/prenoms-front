//style
import "../style/headTitle.css";

const HeadTitle = ({ title }) => {
  return (
    <div className="head-title">
      <img
        src={require("../assets/papier-dechire-4.png")}
        alt="papier déchiré"
      />
      <h1>{title}</h1>
    </div>
  );
};

export default HeadTitle;
