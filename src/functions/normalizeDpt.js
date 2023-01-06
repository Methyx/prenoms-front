const normalizeDpt = (dpt) => {
  const dtpNumber = Number(dpt);
  if (isNaN(dtpNumber)) {
    return dpt.toUpperCase(); // 2A, 2B
  }
  if (dtpNumber < 10) {
    return "0" + dpt;
  }
  return dtpNumber;
};

export default normalizeDpt;
