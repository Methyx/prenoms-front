// components
import HistoryGraph from "../components/HistoryGraph";

// style
import "../style/history.css";

const History = () => {
  return (
    <div className="history container">
      <HistoryGraph searchName="marie" gender="" />
    </div>
  );
};

export default History;
