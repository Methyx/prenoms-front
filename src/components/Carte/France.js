import PropTypes from "prop-types";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { useEffect, useState } from "react";

// functions
import normalizeDpt from "../../functions/normalizeDpt";
import listOfDepartements from "../../assets/listOfDepartements";

import Carte from "./Carte";

import "../../style/france.css";

const France = ({
  defaultColor,
  departements,
  highlightColor,
  setDptSelected,
}) => {
  // Use States
  const [dptColor, setDptColor] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [oldSelected, setOldSelected] = useState(null);

  //
  useEffect(() => {
    const tabColor = {};
    for (let i = 0; i < listOfDepartements.length; i++) {
      tabColor[normalizeDpt(listOfDepartements[i])] = defaultColor;
    }
    for (let i = 0; i < departements.length; i++) {
      tabColor[normalizeDpt(departements[i].code)] = departements[i].color;
    }
    setDptColor({ ...tabColor });
    setIsReady(true);
  }, []);

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
          const colors = { ...dptColor };
          if (oldSelected) {
            colors[oldSelected.id.slice(4)] = oldSelected.color;
            if (oldSelected.id === e.target.id) {
              setOldSelected(null);
              setDptSelected(null);
              unselect = true;
            }
          }
          if (!unselect) {
            setOldSelected({
              id: e.target.id,
              color: e.target.attributes.fill.nodeValue,
            });
            setDptSelected(e.target.id);
            colors[e.target.id.slice(4)] = highlightColor;
          }
          setDptColor(colors);
        }
      }}
    >
      {isReady &&
        listOfDepartements.map((dpt) => {
          return (
            <SvgProxy
              key={`default_${dpt}`}
              selector={`#dpt-${normalizeDpt(dpt)}`}
              fill={dptColor[normalizeDpt(dpt)]}
            />
          );
        })}
    </SvgLoader>
  );
};

France.propTypes = {
  defaultColor: PropTypes.string,
  departements: PropTypes.array,
  highlightColor: PropTypes.string,
};

France.defaultProps = {
  defaultColor: "#c1c1c1",
  departements: [],
  highlightColor: "#b3ff75",
};

export default France;
