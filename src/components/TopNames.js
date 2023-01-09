import { useState, useEffect } from "react";
import axios from "axios";

// components
import France from "./Carte/France";

// functions
import getNameOfDpt from "../assets/getNameOfDpt";

// style
import "../style/topNames.css";

const TopNames = ({ years, gender }) => {
  // UseStates
  const [isReady, setIsReady] = useState(false);
  const [dptSelected, setDptSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsReady(false);
      try {
        let url = "http://localhost:4000/top";
        url += "?start=1";
        // url += "&number=10";
        if (years) {
          url += "&years=" + years;
        }
        if (gender) {
          url += "&gender=" + gender;
        }
        if (dptSelected) {
          url += "&dptCode=" + dptSelected.slice(4);
        }
        const response = await axios.get(url);
        setData(response.data);
        setIsReady(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData(years);
  }, [dptSelected, gender, years]);

  return (
    <div className="top-names">
      <div className="map-container">
        <France dptSelected={dptSelected} setDptSelected={setDptSelected} />
      </div>
      <div className="results-container">
        <h1>Classement des Prénoms</h1>
        {dptSelected ? (
          <h1>
            dans le département {dptSelected.slice(4)} :{" "}
            {getNameOfDpt(dptSelected.slice(4))}{" "}
          </h1>
        ) : (
          <h1>en FRANCE</h1>
        )}
        <div className="chart">
          {isReady ? (
            data[0]?._id ? (
              data.map((item, index) => {
                return (
                  <p key={index}>
                    N° {index + 1} : {item._id} - {item.total}
                  </p>
                );
              })
            ) : (
              <p>Pas de données</p>
            )
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNames;
