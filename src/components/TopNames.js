import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

// components
import France from "./Carte/France";
import Loader1 from "./Loader1";
import Spinner from "./Spinner";

// functions
import getNameOfDpt from "../assets/getNameOfDpt";

// style
import "../style/topNames.css";

const TopNames = ({
  years,
  gender,
  firstname,
  setFirstname,
  dptSelected,
  setDptSelected,
}) => {
  // UseStates
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);
  // const [searchName, setSearchName] = useState("");
  const memoElement = useRef(null);
  const [colorMap, setColorMap] = useState({ min: 0, max: 0, array: [] });
  const [mapName, setMapName] = useState("");
  const [loadingMap, setLoadingMap] = useState(false);

  // functions
  useEffect(() => {
    const elem = document.getElementById(firstname.toUpperCase());
    if (elem) {
      elem.scrollIntoView({
        block: "nearest",
      });
      memoElement.current = {
        element: elem,
        color: window.getComputedStyle(elem).color,
      };
      elem.style.color = "#ff6e40";
      setMapName(elem.id);
    } else {
      if (memoElement.current) {
        memoElement.current.element.style.color = memoElement.current.color;
        memoElement.current = null;
      }
    }
  }, [firstname, isReady]);

  useEffect(() => {
    const getMapColors = async () => {
      setColorMap({ min: 0, max: 0, array: [] });
      setLoadingMap(true);
      try {
        let url = "http://localhost:4000/name";
        // let url = "https://site--prenoms-back--gw6mlgwnmzwz.code.run/name";
        url += "?name=" + mapName;
        if (years) {
          url += "&years=" + years;
        }
        if (gender) {
          url += "&gender=" + gender;
        }
        const response = await axios.get(url);
        if (response.data.length > 0) {
          const maxTotal = response.data[0].total;
          const newColorMap = {
            max: maxTotal,
            min: response.data[response.data.length - 1].total,
            array: [],
          };
          for (let i = 0; i < response.data.length; i++) {
            const c =
              255 - Math.round((255 / maxTotal) * response.data[i].total);
            newColorMap.array.push({
              code: response.data[i]._id,
              color: `rgb(${c},${c},255)`,
            });
          }
          setColorMap(newColorMap);
          setLoadingMap(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (mapName) {
      getMapColors();
    }
  }, [mapName, gender, years]);

  useEffect(() => {
    const loadData = async () => {
      setIsReady(false);
      // window.scrollTo({ top: 100, behavior: "smooth" });
      try {
        // let url = "http://localhost:4000/top";
        let url = "https://site--prenoms-back--gw6mlgwnmzwz.code.run/top";
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
        // if (!firstname) {
        //   setfirstname(response.data[0]._id || "");
        // }
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData();
    memoElement.current = null;
  }, [dptSelected, gender, years]);

  return (
    <div className={isReady ? "top-names" : "top-names loading"}>
      <div className="map-container">
        <div className="map-title">
          {mapName ? (
            <>
              <h1>
                Répartition des {mapName} {gender && `(${gender})`} en {years}
              </h1>
              {colorMap.array.length > 0 && (
                <div className="legende">
                  <p>{colorMap.max}</p>
                  <div
                    style={{
                      background: `linear-gradient(to right, ${
                        colorMap.array[0].color
                      } 0%,${
                        colorMap.array[colorMap.array.length - 1].color
                      } 100%)`,
                    }}
                  ></div>
                  <p>{colorMap.min}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>Carte interactive</h1>
              <h2>
                (Cliquer ou rechercher un prénom pour voir la répartition)
              </h2>
            </>
          )}
        </div>
        <div className="map-svg">
          {loadingMap ? (
            <Loader1 />
          ) : (
            <France
              highlightColor={"#ff6e40"}
              dptSelected={dptSelected}
              setDptSelected={setDptSelected}
              departements={colorMap.array}
            />
          )}
        </div>
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
        <div className={isReady ? "chart" : "chart loading"}>
          {isReady ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Prénom</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data[0]?._id ? (
                  data.map((item, index) => {
                    return (
                      <tr
                        key={index + 1}
                        id={item._id}
                        onClick={() => {
                          setFirstname(item._id);
                          setMapName(item._id);
                          // setFirstname(item._id);
                          // navigate("/history");
                          if (memoElement.current) {
                            memoElement.current.element.style.color =
                              memoElement.current.color;
                            memoElement.current = null;
                          }
                        }}
                      >
                        <td>{Number(index + 1).toLocaleString()}</td>
                        <td>{item._id} </td>
                        <td>{Number(item.total).toLocaleString()} </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>Pas de données</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="array-navigation">
          <p
            onClick={() => {
              const elem = document.getElementById(data[0]._id);
              elem.scrollIntoView({ block: "nearest" });
            }}
          >
            ⏫ début
          </p>
          <p
            onClick={() => {
              const elem = document.getElementById(data[data.length - 1]._id);
              elem.scrollIntoView({ block: "nearest" });
            }}
          >
            fin ⏬
          </p>
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
            value={firstname}
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />
          {firstname.toUpperCase() !== mapName.toUpperCase() && (
            <p>non trouvé</p>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default TopNames;
