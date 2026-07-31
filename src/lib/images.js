import { imagesURLDomain, individualItem } from "./appGlobals";


export const getPreviewImageUrl = (item) => {
  return getItemThumbnailImageUrl(item);
};

export const getItemThumbnailImageUrl = (item) => {
  return `${imagesURLDomain}/${individualItem}_thumbnail_${item?.id}`;
};

export const buildFrontImageUrl = (itemId) => {
  return `${imagesURLDomain}/${individualItem}_front_${itemId}`;
};

export const buildFittedImageUrl = (itemId) => {
  return `${imagesURLDomain}/${individualItem}_fitted_${itemId}`;
};
