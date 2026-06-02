const cardSize = 454;
const cardPadding = 30;
const gap = 12;
const sizes = {
  gridWidths: {
    base: cardSize - 2 * gap,
    md: cardSize * 2 - 2 * gap,
    "2xl": cardSize * 3 - 2 * gap,
  },
  gap: gap,
};

const headerHeight = "4.6rem";
const cardHeight = "15em";
const cardHeightPixels = parseFloat(cardHeight) * 16;

const mdScreen = "768px";
const lgScreen = "1024px";

export {
  sizes,
  cardSize,
  gap,
  headerHeight,
  cardHeight,
  cardHeightPixels,
  cardPadding,
  mdScreen,
  lgScreen
};
