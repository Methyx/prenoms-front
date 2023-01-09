import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

// components
import TopNames from "../components/TopNames";

// style
import "../style/home.css";

const Home = () => {
  // Use States
  const [years, setYears] = useState("2020");
  const [year, setYear] = useState("2020");
  const [gender, setGender] = useState("");

  return (
    <div className="container home-page">
      <div className="selections">
        <div>
          <TextField
            label="Année"
            type="number"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
              if (
                Number(event.target.value) >= 1900 &&
                Number(event.target.value) < 2022
              ) {
                setYears(event.target.value);
              }
            }}
          />
          {years !== year && <p>entrée incorrecte</p>}
        </div>
        <FormControl>
          <RadioGroup
            row
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <FormControlLabel
              value="F"
              control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
              label="Femme"
            />
            <FormControlLabel
              value="M"
              control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
              label="Homme"
            />
            <FormControlLabel
              value=""
              control={<Radio sx={{ "&.Mui-checked": { color: "#ff6e40" } }} />}
              label="Indifférent"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <TopNames years={years} gender={gender} />
    </div>
  );
};
export default Home;
