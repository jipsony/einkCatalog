export const appName = "E-Reader Catalog";
export const appDomain = "https://ereadercatalog.com";
export const imagesURLDomain = "https://ereadercatalog.com/images";
export const itemMainRoute = "/e-readers";
export const itemsLabel = "E-readers";
export const individualItemLabel = "E-reader";
export const individualItem = "e-reader";

export const generateCompareTitle = (compareName, compareWithName) => {
  return compareName && compareWithName
    ? `${compareName} vs. ${compareWithName} E-Reader Comparison - E-Reader Catalog`
    : "-Reader Comparison - E-Reader Catalog";
};

export const buildFullName = (itemInfo) => {
  return itemInfo?.name;
};

export const buildItemFullInfoLink = (id) => {
  return `${itemMainRoute}/${id}`;
};
