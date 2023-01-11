import { useCallback, useEffect, useState } from "react";

// functions
import { debounce } from "lodash";

// components
import HistoryGraph from "../components/HistoryGraph";
import HeadTitle from "../components/HeadTitle";
import Selections from "../components/Selections";

// style
import "../style/history.css";

const History = () => {
  // Use STATES
  const [searchName, setSearchName] = useState("");
  const [gender, setGender] = useState("");

  const [debouncedName, setDebouncedName] = useState("");

  // functions
  const debounceName = useCallback(
    debounce(() => {
      setDebouncedName(searchName);
    }, 800),
    [searchName]
  );

  const handleNameInput = (value) => {
    setSearchName(value);
  };

  // Use EFFECT
  useEffect(() => {
    debounceName();
    return debounceName.cancel;
  }, [searchName, debounceName]);

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

      <HistoryGraph searchName={debouncedName} gender={gender} />
    </div>
  );
};

export default History;
