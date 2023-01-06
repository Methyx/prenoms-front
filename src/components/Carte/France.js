import PropTypes from "prop-types";
import { SvgLoader, SvgProxy } from "react-svgmt";

// functions
import normalizeDpt from "../../functions/normalizeDpt";
import listOfDepartements from "../../assets/listOfDepartements";

import Carte from "./Carte";

import "../../style/france.css";

const France = ({ defaultColor, departements, highlightColor }) => {
  // Init
  let selected = null;
  let oldSelectedColor = "";

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
          if (selected) {
            selected.attributes.fill.nodeValue = oldSelectedColor;
            if (selected.id === e.target.id) {
              selected = null;
              oldSelectedColor = "";
              unselect = true;
            }
          }
          if (!unselect) {
            selected = e.target;
            oldSelectedColor = selected.attributes.fill.nodeValue;
            e.target.attributes.fill.nodeValue = highlightColor;
          }
        }
      }}
    >
      {listOfDepartements.map((dpt) => {
        return (
          <SvgProxy
            key={`default_${dpt}`}
            selector={`#dpt-${normalizeDpt(dpt)}`}
            fill={defaultColor}
          />
        );
      })}
      {/* <SvgProxy selector="#carte" fill={defaultColor} /> */}
      {departements.map((dpt) => (
        <SvgProxy
          key={`colorized_${dpt.code}`}
          selector={`#dpt-${normalizeDpt(dpt.code)}`}
          fill={dpt.color}
        />
      ))}
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
