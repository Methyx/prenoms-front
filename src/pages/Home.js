import { useState } from "react";

// components
import TopNames from "../components/TopNames";
import HeadTitle from "../components/HeadTitle";
import Selections from "../components/Selections";

// style
import "../style/home.css";

const Home = ({
  setFirstname,
  gender,
  setGender,
  years,
  setYears,
  dptSelected,
  setDptSelected,
}) => {
  // Use States

  const [yearsInput, setYearsInput] = useState(years);

  // Functions
  const handleYearsInput = (yearEntry) => {
    setYearsInput(yearEntry);
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

  const checkInput = () => {
    return years !== yearsInput || years === "all";
  };

  // ==============
  return (
    <div className="container home-page">
      <HeadTitle title="Le classement des prénoms" />
      <Selections
        labelInput={"Année(s)"}
        valueInput={yearsInput}
        handleValueInput={handleYearsInput}
        checkInput={checkInput}
        errorMessage={"ex.: 2015 ou 2010-2020"}
        gender={gender}
        setGender={setGender}
      />
      <TopNames
        years={years}
        gender={gender}
        setFirstname={setFirstname}
        dptSelected={dptSelected}
        setDptSelected={setDptSelected}
      />
    </div>
  );
};
export default Home;
