import { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// components
import France from "./Carte/France";

// functions
import getNameOfDpt from "../assets/getNameOfDpt";

// style
import "../style/historyGraph.css";

const HistoryGraph = ({ searchName, gender, dptSelected, setDptSelected }) => {
  // UseStates
  const [isReady, setIsReady] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async (name) => {
      setIsReady(false);
      // window.scrollTo({ top: 100, behavior: "smooth" });
      try {
        // let url = "http://localhost:4000/history";
        let url = "https://site--prenoms-back--gw6mlgwnmzwz.code.run/history";
        url += "?name=" + name;
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
    if (searchName) {
      loadData(searchName);
    } else {
      setData(null);
      setIsReady(false);
    }
  }, [searchName, dptSelected, gender]);

  // --------
  return (
    <div className={isReady ? "history-graph" : "history-graph loading"}>
      <div className="map-container">
        <France
          highlightColor={"#ff6e40"}
          dptSelected={dptSelected}
          setDptSelected={setDptSelected}
        />
      </div>
      <div className="results-container">
        <h1>
          {searchName.toUpperCase()} {gender && `  (${gender})`}
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
        {isReady ? (
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6e40" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff6e40" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="_id"
                  ticks={
                    window.innerWidth >= 1150
                      ? [
                          1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980,
                          1990, 2000, 2010, 2020,
                        ]
                      : window.innerWidth >= 900
                      ? [1900, 1920, 1940, 1960, 1980, 2000, 2020]
                      : [1900, 1940, 1980, 2020]
                  }
                  // minTickGap={19}
                  interval="preserveStart"
                  tickMargin={10}
                  // angle={-45}
                />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#1e3d59"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="message-container">
            {searchName ? (
              <p>Loading ...</p>
            ) : (
              <p>Entrez un prénom à rechercher</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryGraph;
