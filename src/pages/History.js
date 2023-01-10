// components
import HistoryGraph from "../components/HistoryGraph";

// style
import "../style/history.css";

const History = () => {
  return (
    <div className="history container">
      <div className="head-title">
        <h1>L'historique d'un prénom</h1>
      </div>
      <HistoryGraph searchName="marie" gender="F" />
    </div>
  );
};

export default History;
