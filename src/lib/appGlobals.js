export const appName = "E-Ink Catalog";
export const appDomain = "https://einkcatalog.com";
export const imagesURLDomain = "https://dev.einkcatalog.com/images"; ////////////////////////////////////////////////// TODO remove the .dev once DNS is done
export const itemMainRoute = "/e-readers";
export const itemsLabel = "E-readers";
export const individualItemLabel = "E-reader";
export const individualItem = "e-reader";

export const generateCompareTitle = (compareName, compareWithName) => {
  return compareName && compareWithName
    ? `${compareName} vs. ${compareWithName} Handheld Comparison - Retro Catalog`
    : "Handheld Comparison - Retro Catalog";
};

export const buildFullName = (itemInfo) => {
  return itemInfo?.name;
};

export const buildItemFullInfoLink = (id) => {
  return `${itemMainRoute}/${id}`;
};
