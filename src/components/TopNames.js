import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

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
  const [searchName, setSearchName] = useState("");
  const memoElement = useRef(null);

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
    setSearchName("");
    memoElement.current = null;
  }, [dptSelected, gender, years]);

  return (
    <div className="top-names">
      <div className="map-container">
        <France
          highlightColor={"#ff6e40"}
          dptSelected={dptSelected}
          setDptSelected={setDptSelected}
        />
      </div>
      <div className="results-container">
        <h1>
          {gender === "M"
            ? "Masculins"
            : gender === "F"
            ? "Féminins"
            : "Sexe indifférent"}
          {" : "} {years || "all"}
        </h1>
        {dptSelected ? (
          <h2>
            {getNameOfDpt(dptSelected.slice(4))}
            {" ("}
            {dptSelected.slice(4)}
            {")"}
          </h2>
        ) : (
          <h2>FRANCE entière</h2>
        )}
        <h6>(Cliquer sur la carte pour sélectionner un département)</h6>
        <div className="chart">
          <table>
            <thead>
              <tr>
                <th>Rang</th>
                <th>Prénom</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isReady ? (
                data[0]?._id ? (
                  data.map((item, index) => {
                    return (
                      <tr key={index + 1} id={item._id}>
                        <td>{index + 1}</td>
                        <td>{item._id} </td>
                        <td>{Number(item.total).toLocaleString()} </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>Pas de données</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={3}>Loading ...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="search-name">
          <TextField
            className="input-name"
            sx={{
              "& label.Mui-focused": {
                color: "#ff6e40",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#ff6e40",
                },
              },
            }}
            type="text"
            label="Rechercher un prénom"
            value={searchName}
            onChange={(event) => {
              setSearchName(event.target.value);
              const elem = document.getElementById(
                event.target.value.toUpperCase()
              );
              if (elem) {
                elem.scrollIntoView();
                memoElement.current = {
                  element: elem,
                  color: window.getComputedStyle(elem).color,
                };
                elem.style.color = "#ff6e40";
              } else {
                if (memoElement.current) {
                  memoElement.current.element.style.color =
                    memoElement.current.color;
                  memoElement.current = null;
                }
              }
            }}
          />
          {searchName && !memoElement.current && <p>non trouvé</p>}
        </div>
      </div>
    </div>
  );
};

export default TopNames;
