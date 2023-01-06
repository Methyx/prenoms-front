import { useState, useEffect } from "react";
import axios from "axios";

// components
import France from "./Carte/France";

// style
import "../style/map.css";

const MapTopNameOfYears = ({ years, gender }) => {
  // UseStates
  const [isReady, setIsReady] = useState(false);
  const [dptSelected, setDptSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        let url = "http://localhost:4000/top";
        url += "?years=" + years;
        if (gender) {
          url += "&gender=" + gender;
        }
        const response = await axios.get(url);
        setData(response.data.slice(4));
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData(years);
    setIsReady(true);
  }, []);

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

export default MapTopNameOfYears;
