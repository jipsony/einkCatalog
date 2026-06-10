export const appName= "E-Ink Catalog"
export const appDomain = "https://einkcatalog.com"
export const itemRoute = "/e-readers"
export const items = "E-readers"

export const generateCompareTitle = (compareName, compareWithName) => {
  return compareName && compareWithName
    ? `${compareName} vs. ${compareWithName} Handheld Comparison - Retro Catalog`
    : "Handheld Comparison - Retro Catalog";
};

export const buildFullName = (itemInfo) => {
    return `${itemInfo?.brand} ${itemInfo?.name}`
}

export const buildItemFullInfoLink = (itemInfo) => {
    return `${itemRoute}/${itemInfo?.id}`
}