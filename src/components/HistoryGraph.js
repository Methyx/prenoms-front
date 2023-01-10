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

const HistoryGraph = ({ searchName, gender }) => {
  // UseStates
  const [isReady, setIsReady] = useState(false);
  const [dptSelected, setDptSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async (name) => {
      setIsReady(false);
      try {
        let url = "http://localhost:4000/history";
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
    }
  }, [searchName, dptSelected, gender]);

  // --------
  return (
    <div className="history-graph">
      <div className="map-container">
        <France
          highlightColor={"#ff6e40"}
          dptSelected={dptSelected}
          setDptSelected={setDptSelected}
        />
      </div>
      <div className="results-container">
        <h2>
          {searchName.toUpperCase()} {gender && `  (${gender})`}
        </h2>
        {dptSelected ? (
          <h3>
            {getNameOfDpt(dptSelected.slice(4))}
            {" ("}
            {dptSelected.slice(4)}
            {")"}
          </h3>
        ) : (
          <h3>FRANCE entière</h3>
        )}
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
                <XAxis dataKey="_id" interval={9} tickMargin={10} />
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
          <p>Loading ...</p>
        )}
      </div>
    </div>
  );
};

export default HistoryGraph;
