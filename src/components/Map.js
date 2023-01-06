import { useState } from "react";

// components
import France from "./Carte/France";

// style
import "../style/mapTest2.css";

const Map = () => {
  // UseStates
  const [dptSelected, setDptSelected] = useState(null);

  return (
    <>
      <div className="map-container">
        <France
          departements={[
            { code: 75, color: "red" },
            { code: 89, color: "blue" },
            { code: 21, color: "green" },
            { code: "2a", color: "violet" },
            { code: 976, color: "salmon" },
          ]}
          dptSelected={dptSelected}
          setDptSelected={setDptSelected}
        />
      </div>
      {dptSelected ? (
        <p>Vous avez selectionné : {dptSelected}</p>
      ) : (
        <p>Vous pouvez selectionner un département</p>
      )}
    </>
  );
};

export default Map;
