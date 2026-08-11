// export const compareColorsRender = {
//   red: "#e5534b",
//   green: "#3fb950",
//   yellow: "#ecc94b",
//   grey: "#525157",
// };

// export const compareColorsRender = {
//   red: "#b85c58",
//   green: "#4a8c63",
//   yellow: "#a07e2a",
//   grey: "#7a7680",
// };

export const compareColorsRender = {
  red: "#ce615b",
  green: "#52a371",
  yellow: "#dfb958",
  grey: "#7a7680",
};

export const compareFloat = (a, b) => {
  const aF = parseFloat(a);
  const bF = parseFloat(b);

  if (aF === undefined || bF === undefined) return undefined;
  if (aF > bF) return 1;
  if (aF < bF) return -1;
  return 0;
};

export const compareReleaseDate = (a, b) => {
  if (a === b) return 0;
  const splita = a.split("/");
  const yeara = splita[0];
  const montha = splita[1];

  const splitb = b.split("/");
  const yearb = splitb[0];
  const monthb = splitb[1];

  const currentYear = new Date().getFullYear();
  if (yeara > currentYear && yearb > currentYear) return 0;
  if (yeara > yearb) return 1;
  if (yeara < yearb) return -1;

  if (montha > monthb) return 1;
  if (montha < monthb) return -1;
  return 0;
};

export const compareScreenSize = (a, b) => {
  if (typeof a === "string" && typeof b === "string") {
    if (a === b) return 0;
    if (a?.toLowerCase()?.includes("secondary"))
      a = a?.toLowerCase()?.split("main:")?.[1]?.split("secondary:")?.[0];
    if (b?.toLowerCase()?.includes("bottom"))
      b = b?.toLowerCase()?.split("top:")?.[1]?.split("bottom:")?.[0];
  }
  return compareFloat(a, b);
};

export const compareColor = (compareResult) => {
  if (compareResult === 0) return "yellow"; // yellow

  // if (!compareResult) return "grey"
  if (compareResult > 0) return "green"; // green
  if (compareResult < 0) return "red"; // red
};

export const compareBool = (a, b) => {
  if (a === b) return 0;
  if (a && !b) return 1;
  if (!a && b) return -1;
  return 0;
};

export const compareOrder = (orderArray, a, b, useIncludes) => {
  let aIndex = orderArray.indexOf(a);
  let bIndex = orderArray.indexOf(b);

  if (useIncludes)
    aIndex = orderArray?.findLastIndex((e) =>
      a?.toLowerCase()?.includes(e?.toLowerCase())
    );
  if (useIncludes)
    bIndex = orderArray?.findLastIndex((e) =>
      b?.toLowerCase()?.includes(e?.toLowerCase())
    );
  if (aIndex === -1 || bIndex === -1) return null;
  if (aIndex === undefined || bIndex === undefined) return 0;
  if (aIndex === bIndex) return 0;
  if (aIndex > bIndex) return 1;
  if (aIndex < bIndex) return -1;
};

export const compareWithUnitOrder = (unitOrderArray, a, b) => {
  const aUnit = unitOrderArray.findLastIndex((unit) => a.includes(unit));
  const bUnit = unitOrderArray.findLastIndex((unit) => b.includes(unit));

  const aFloat = a.split(" ")?.[0];
  const bFloat = b.split(" ")?.[0];

  if (aUnit === bUnit) {
    return compareFloat(aFloat, bFloat);
  }
  if (aUnit > bUnit) {
    return 1;
  }
  if (aUnit < bUnit) {
    return -1;
  }
};