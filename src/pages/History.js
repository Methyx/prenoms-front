import { useRef, useState } from "react";

// functions
import { debounce } from "lodash";

// components
import HistoryGraph from "../components/HistoryGraph";
import HeadTitle from "../components/HeadTitle";
import Selections from "../components/Selections";

// style
import "../style/history.css";

const History = ({
  firstname,
  setFirstname,
  gender,
  setGender,
  dptSelected,
  setDptSelected,
}) => {
  // Use STATES
  const [searchName, setSearchName] = useState(firstname);

  // functions
  const debounceName = useRef(
    debounce((text) => {
      setFirstname(text);
    }, 800)
  ).current;

  const handleNameInput = (value) => {
    setSearchName(value);
    debounceName(value);
  };

  // ---------
  return (
    <div className="history container">
      <HeadTitle title="L'historique d'un prénom" />
      <Selections
        labelInput={"Prénom"}
        valueInput={searchName}
        handleValueInput={handleNameInput}
        checkInput={() => {
          return true;
        }}
        errorMessage={""}
        gender={gender}
        setGender={setGender}
      />

      <HistoryGraph
        searchName={firstname}
        gender={gender}
        dptSelected={dptSelected}
        setDptSelected={setDptSelected}
      />
    </div>
  );
};

export default History;
