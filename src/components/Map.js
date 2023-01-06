import France from "./Carte/France";

// style
import "../style/mapTest2.css";

const Map = () => {
  return (
    <div className="map-container">
      <France
        departements={[
          { code: 75, color: "red" },
          { code: 89, color: "blue" },
          { code: 21, color: "green" },
          { code: "2a", color: "violet" },
          { code: 976, color: "salmon" },
        ]}
      />
    </div>
  );
};

export default Map;
