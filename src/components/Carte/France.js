import { SvgLoader, SvgProxy } from "react-svgmt";
import { useEffect, useState } from "react";

// functions
import normalizeDpt from "../../functions/normalizeDpt";
import listOfDepartements from "../../assets/listOfDepartements";

import Carte from "./Carte";

// style
import "../../style/france.css";

const France = ({
  defaultColor,
  departements,
  highlightColor,
  dptSelected,
  setDptSelected,
}) => {
  // Use States
  const [dptColor, setDptColor] = useState({});

  //
  useEffect(() => {
    const tabColor = {};
    for (let i = 0; i < listOfDepartements.length; i++) {
      tabColor[normalizeDpt(listOfDepartements[i].num_dep)] = defaultColor;
    }
    for (let i = 0; i < departements.length; i++) {
      if (departements[i].code === 20) {
        tabColor["2A"] = departements[i].color;
        tabColor["2B"] = departements[i].color;
      } else {
        tabColor[normalizeDpt(departements[i].code)] = departements[i].color;
      }
    }
    if (dptSelected) {
      if (dptSelected === "dpt-20") {
        tabColor["2A"] = highlightColor;
        tabColor["2B"] = highlightColor;
      } else {
        tabColor[dptSelected.slice(4)] = highlightColor;
      }
    }
    setDptColor({ ...tabColor });
  }, [defaultColor, highlightColor, departements, dptSelected]);

  //
  return (
    <SvgLoader
      svgXML={Carte}
      onClick={(e) => {
        if (
          e.target.id &&
          e.target.id !== "sous-cadre_Île-de-France" &&
          e.target.id !== "dpt-75-92-93-94"
        ) {
          let unselect = false;
          if (dptSelected) {
            if (
              dptSelected === e.target.id ||
              (dptSelected === "dpt-20" &&
                (e.target.id === "dpt-2A" || e.target.id === "dpt-2B"))
            ) {
              setDptSelected(null);
              unselect = true;
            }
          }
          if (!unselect) {
            if (e.target.id === "dpt-2A" || e.target.id === "dpt-2B") {
              setDptSelected("dpt-20");
            } else {
              setDptSelected(e.target.id);
            }
          }
        }
      }}
    >
      {listOfDepartements.map((dpt) => {
        return (
          <SvgProxy
            key={`default_${dpt.num_dep}`}
            selector={`#dpt-${normalizeDpt(dpt.num_dep)}`}
            fill={dptColor[normalizeDpt(dpt.num_dep)]}
          />
        );
      })}
    </SvgLoader>
  );
};

France.defaultProps = {
  defaultColor: "#c1c1c1",
  departements: [],
  highlightColor: "#b3ff75",
  dptSelected: null,
  setDptSelected: () => {},
};

export default France;
