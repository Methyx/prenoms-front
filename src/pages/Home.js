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
  const [yearsInput, setYearsInput] = useState("2020");
  const [gender, setGender] = useState("");

  // Functions
  const handleYearsInput = (yearEntry) => {
    if (yearEntry === "all") {
      setYears("");
    } else {
      const yearsArray = yearEntry.split("-");
      if (Number(yearsArray[0]) >= 1900 && Number(yearsArray[0]) < 2022) {
        if (yearsArray.length === 1) {
          setYears(yearEntry);
        } else if (yearsArray.length === 2) {
          if (
            Number(yearsArray[1]) >= Number(yearsArray[0]) &&
            Number(yearsArray[1]) < 2022
          ) {
            setYears(yearEntry);
          }
        }
      }
    }
  };

  // ==============
  return (
    <div className="container home-page">
      <div className="title">
        <h1>Le site des prénoms donnés en France entre 1900 et 2021</h1>
        <p>Source : fichier des prénoms de l'INSEE</p>
      </div>
      <div className="selections">
        <div>
          <TextField
            label="Année(s)"
            type="text"
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
            value={yearsInput}
            onChange={(event) => {
              setYearsInput(event.target.value);
              handleYearsInput(event.target.value);
            }}
          />
          {(years !== yearsInput || years === "all") && (
            <p>ex.: 2015 ou 2010-2020</p>
          )}
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
