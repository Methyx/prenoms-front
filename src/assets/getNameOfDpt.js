import listOfDepartements from "./listOfDepartements";

const getNameOfDpt = (dpt) => {
  if (!Number(dpt)) {
    return "inconnu";
  }
  const dptCode = Number(dpt);
  if (dptCode === 20) {
    return "Corse";
  }
  for (let i = 0; i < listOfDepartements.length; i++) {
    if (dptCode === listOfDepartements[i].num_dep) {
      return listOfDepartements[i].dep_name;
    }
  }
  return "inconnu";
};

export default getNameOfDpt;
