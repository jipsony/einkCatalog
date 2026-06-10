import creditCard from "@/resources/images/compareSizes/credit-card.webp";
import butter from "@/resources/images/compareSizes/butter.webp";
import rootBeer from "@/resources/images/compareSizes/root-beer.webp";
import pokerCard from "@/resources/images/compareSizes/poker-card.webp";
import basketball from "@/resources/images/compareSizes/basketball.webp";
import banana from "@/resources/images/compareSizes/banana.webp";
import rootBeerTechDweeb from "@/resources/images/compareSizes/tdrootbeer.webp";
import egg from "@/resources/images/compareSizes/egg.webp";
import football from "@/resources/images/compareSizes/football.webp";
import threeds from "@/resources/images/compareSizes/3ds.webp";
import analoguePocket from "@/resources/images/compareSizes/analogue-pocket.webp";
import atariLinx from "@/resources/images/compareSizes/atari-linx.webp";
import ds from "@/resources/images/compareSizes/ds.webp";
import gameBoyAdvanceSp from "@/resources/images/compareSizes/game-boy-advance-sp.webp";
import gameBoyAdvance from "@/resources/images/compareSizes/game-boy-advance.webp";
import gameBoyColor from "@/resources/images/compareSizes/game-boy-color.webp";
import gameBoy from "@/resources/images/compareSizes/game-boy.webp";
import gameBoyMicro from "@/resources/images/compareSizes/gameboy-micro.webp";
import gameGear from "@/resources/images/compareSizes/game-gear.webp";
import nGage from "@/resources/images/compareSizes/n-gage.webp";
import neoGeoPocket from "@/resources/images/compareSizes/neo-geo-pocket.webp";
import playstationVita from "@/resources/images/compareSizes/playstation-vita.webp";
import psp3000 from "@/resources/images/compareSizes/psp-3000.webp";
import switchConsole from "@/resources/images/compareSizes/switch.webp";
import switchLite from "@/resources/images/compareSizes/switch-lite.webp";
import switch2 from "@/resources/images/compareSizes/switch-2.webp";
import wiiu from "@/resources/images/compareSizes/wiiu.webp";
import wonderswan from "@/resources/images/compareSizes/wonderswan.webp";

import googlePixel10ProXl from "@/resources/images/compareSizes/phones/google-pixel-10-pro-xl.webp";
import googlePixel10Pro from "@/resources/images/compareSizes/phones/google-pixel-10-pro.webp";
import googlePixel10 from "@/resources/images/compareSizes/phones/google-pixel-10.webp";
import iphone17Pro from "@/resources/images/compareSizes/phones/iphone-17-pro.webp";
import iphone17 from "@/resources/images/compareSizes/phones/iphone-17.webp";
import iphone6 from "@/resources/images/compareSizes/phones/iphone-6.webp";
import iphoneAir from "@/resources/images/compareSizes/phones/iphone-air.webp";
import samsungGalaxyA16 from "@/resources/images/compareSizes/phones/samsung-galaxy-a16.webp";
import samsungGalaxyA55 from "@/resources/images/compareSizes/phones/samsung-galaxy-a55.webp";
import samsungGalaxyS25Fe from "@/resources/images/compareSizes/phones/samsung-galaxy-s25-fe.webp";
import samsungGalaxyS25Plus from "@/resources/images/compareSizes/phones/samsung-galaxy-s25-plus.webp";
import samsungGalaxyS25 from "@/resources/images/compareSizes/phones/samsung-galaxy-s25.webp";

const everydayItems = [
  {
    id: "egg",
    name: "Egg",
    dimensionsH: 56,
    dimensionsL: 44,
    dimensionsW: 44,
    weight: 50,
    image: egg.src,
    isFromClient: true,
  },
  {
    id: "credit-card",
    name: "Credit Card",
    dimensionsH: 53.9,
    dimensionsL: 85.6,
    dimensionsW: 1,
    weight: 5,
    image: creditCard.src,
    isFromClient: true,
  },
  {
    id: "poker-card",
    name: "Playing Card",
    dimensionsH: 88.8,
    dimensionsL: 63.5,
    dimensionsW: 1,
    weight: 5,
    image: pokerCard.src,
    isFromClient: true,
  },
  {
    id: "butter",
    name: "Kerrygold Butter",
    dimensionsH: 63.5,
    dimensionsL: 127,
    dimensionsW: 63.5,
    image: butter.src,
    isFromClient: true,
    weight: 227,
  },
  {
    id: "root-beer",
    name: "Soda Can",
    dimensionsH: 122,
    dimensionsL: 66.2,
    dimensionsW: 66.2,
    image: rootBeer.src,
    imageAlts: [rootBeerTechDweeb.src],
    isFromClient: true,
  },
  {
    id: "banana",
    name: "Banana",
    dimensionsH: 155,
    dimensionsL: 100,
    image: banana.src,
    isFromClient: true,
    weight: 118,
  },
  // {
  //   id: "football",
  //   name: "Football (size 5)",
  //   image: football.src,
  //   isFromClient: true,
  // },
  {
    id: "basketball",
    name: "Basketball (size 7)",
    dimensionsH: 242,
    dimensionsL: 242,
    dimensionsW: 242,
    image: basketball.src,
    isFromClient: true,
    weight: 600,
  },
]

const originalHardware = [
  {
    id: "switch-2-oh",
    name: "Nintendo Switch 2",
    dimensionsH: 116,
    dimensionsL: 272,
    dimensionsW: 13.9,
    weight: 401,
    image: switch2.src,
    isFromClient: true,
  },
  {
    id: "analogue-pocket-oh",
    name: "Analogue Pocket",
    dimensionsH: 149.5,
    dimensionsL: 88.5,
    dimensionsW: 22,
    weight: 275,
    image: analoguePocket.src,
    isFromClient: true,
  },
  {
    id: "switch-lite-oh",
    name: "Nintendo Switch Lite",
    dimensionsH: 91,
    dimensionsL: 208,
    dimensionsW: 14,
    weight: 277,
    image: switchLite.src,
    isFromClient: true,
  },
  {
    id: "switch-oh",
    name: "Nintendo Switch",
    dimensionsH: 102,
    dimensionsL: 238,
    dimensionsW: 14,
    weight: 297,
    image: switchConsole.src,
    isFromClient: true,
  },
  {
    id: "wiiu-oh",
    name: "WII U",
    dimensionsH: 135,
    dimensionsL: 259,
    dimensionsW: 50,
    weight: 490,
    image: wiiu.src,
    isFromClient: true,
  },
  {
    id: "playstation-vita-oh",
    name: "PlayStation Vita",
    dimensionsH: 85,
    dimensionsL: 183.6,
    dimensionsW: 15.0,
    weight: 219,
    image: playstationVita.src,
    isFromClient: true,
  },
  {
    id: "3ds-oh",
    name: "Nintendo 3DS",
    dimensionsH: 74,
    dimensionsL: 134,
    dimensionsW: 22,
    weight: 235,
    image: threeds.src,
    isFromClient: true,
  },
  {
    id: "psp-3000-oh",
    name: "PSP-3000",
    dimensionsH: 71,
    dimensionsL: 169,
    dimensionsW: 19,
    weight: 189,
    image: psp3000.src,
    isFromClient: true,
  },

  {
    id: "ds-oh",
    name: "Nintendo DS",
    dimensionsH: 84.7,
    dimensionsL: 148.7,
    dimensionsW: 28.9,
    weight: 275,
    image: ds.src,
    isFromClient: true,
  },
    {
    id: "game-boy-micro-oh",
    name: "Game Boy Micro",
    dimensionsH: 50,
    dimensionsL: 101,
    dimensionsW: 17.2,
    weight: 80,
    image: gameBoyMicro.src,
    isFromClient: true,
  },
  {
    id: "game-boy-advance-sp-oh",
    name: "Game Boy Advance SP",
    dimensionsH: 155,
    dimensionsL: 82,
    dimensionsW: 24.4,
    weight: 142,
    image: gameBoyAdvanceSp.src,
    isFromClient: true,
  },
  // {
  //   id: "n-gage",
  //   name: "N-Gage",
  //   dimensionsH: 70,
  //   dimensionsL: 134,
  //   dimensionsW: 20,
  //   weight: 137,
  //   image: nGage.src,
  //   isFromClient: true,
  // },
  {
    id: "game-boy-advance-oh",
    name: "Game Boy Advance",
    dimensionsH: 82,
    dimensionsL: 144,
    dimensionsW: 24.5,
    weight: 142,
    image: gameBoyAdvance.src,
    isFromClient: true,
  },
  // {
  //   id: "wonderswan",
  //   name: "WonderSwan",
  //   image: wonderswan.src,
  //   dimensionsH: 74.3,
  //   dimensionsL: 121,
  //   dimensionsW: 24.3,
  //   weight: 110,
  //   isFromClient: true,
  // },
  {
    id: "game-boy-color-oh",
    name: "Game Boy Color",
    dimensionsH: 133.5,
    dimensionsL: 78,
    dimensionsW: 27.4,
    weight: 138,
    image: gameBoyColor.src,
    isFromClient: true,
  },
  // {
  //   id: "neo-geo-pocket",
  //   name: "Neo Geo Pocket",
  //   dimensionsH: 74,
  //   dimensionsL: 122,
  //   dimensionsW: 24,
  //   weight: 130,
  //   image: neoGeoPocket.src,
  //   isFromClient: true,
  // },
  {
    id: "game-gear-oh",
    name: "Game Gear",
    dimensionsH: 113,
    dimensionsL: 210,
    dimensionsW: 38,
    weight: 400,
    image: gameGear.src,
    isFromClient: true,
  },
  {
    id: "atari-linx-oh",
    name: "Atari Lynx",
    dimensionsH: 108,
    dimensionsL: 235,
    dimensionsW: 51,
    weight: 441,
    image: atariLinx.src,
    isFromClient: true,
  },
  {
    id: "game-boy-oh",
    name: "Game Boy",
    dimensionsH: 148,
    dimensionsL: 90,
    dimensionsW: 32,
    weight: 220,
    image: gameBoy.src,
    isFromClient: true,
  },
];

const phones = [
  {
    id: "iphone-6-phone",
    name: "iPhone 6",
    dimensionsH: 138.1,
    dimensionsL: 67,
    dimensionsW: 6.9,
    weight: 129,
    image: iphone6.src,
    isFromClient: true,
  },
  {
    id: "iphone-17-phone",
    name: "iPhone 17",
    dimensionsH: 149.6,
    dimensionsL: 71.5,
    dimensionsW: 7.95,
    weight: 177,
    image: iphone17.src,
    isFromClient: true,
  },
  {
    id: "iphone-17-pro-phone",
    name: "iPhone 17 Pro",
    dimensionsH: 150,
    dimensionsL: 71.9,
    dimensionsW: 8.75,
    weight: 206,
    image: iphone17Pro.src,
    isFromClient: true,
  },
    {
    id: "iphone-17-pro-max-phone",
    name: "iPhone 17 Pro Max",
    dimensionsH: 163.4,
    dimensionsL: 78,
    dimensionsW: 8.8,
    weight: 233,
    image: iphone17Pro.src,
    isFromClient: true,
  },
  {
    id: "iphone-air-phone",
    name: "iPhone Air",
    dimensionsH: 156.2,
    dimensionsL: 74.7,
    dimensionsW: 5.64,
    weight: 165,
    image: iphoneAir.src,
    isFromClient: true,
  },
  {
    id: "samsung-galaxy-s25-phone",
    name: "Samsung Galaxy S25",
    dimensionsH: 146.9,
    dimensionsL: 70.5,
    dimensionsW: 7.2,
    weight: 162,
    image: samsungGalaxyS25.src,
    isFromClient: true,
  },
  {
    id: "samsung-galaxy-s25-plus-phone",
    name: "Samsung Galaxy S25+",
    dimensionsH: 158.4,
    dimensionsL: 75.8,
    dimensionsW: 7.3,
    weight: 190,
    image: samsungGalaxyS25Plus.src,
    isFromClient: true,
  },
  {
    id: "samsung-galaxy-s25-fe-phone",
    name: "Samsung Galaxy S25 FE",
    dimensionsH: 159.1,
    dimensionsL: 76.1,
    dimensionsW: 7.8,
    weight: 195,
    image: samsungGalaxyS25Fe.src,
    isFromClient: true,
  },
  {
    id: "samsung-galaxy-a55-phone",
    name: "Samsung Galaxy A55",
    dimensionsH: 161.1,
    dimensionsL: 77.4,
    dimensionsW: 8.2,
    weight: 213,
    image: samsungGalaxyA55.src,
    isFromClient: true,
  },
  {
    id: "samsung-galaxy-a16-phone",
    name: "Samsung Galaxy A16",
    dimensionsH: 164.4,
    dimensionsL: 77.9,
    dimensionsW: 7.9,
    weight: 200,
    image: samsungGalaxyA16.src,
    isFromClient: true,
  },
  {
    id: "google-pixel-10-phone",
    name: "Google Pixel 10",
    dimensionsH: 152.8,
    dimensionsL: 72,
    dimensionsW: 8.6,
    weight: 204,
    image: googlePixel10.src,
    isFromClient: true,
  },
  {
    id: "google-pixel-10-pro-phone",
    name: "Google Pixel 10 Pro",
    dimensionsH: 152.8,
    dimensionsL: 72,
    dimensionsW: 8.5,
    weight: 207,
    image: googlePixel10Pro.src,
    isFromClient: true,
  },
  {
    id: "google-pixel-10-pro-xl-phone",
    name: "Google Pixel 10 Pro XL",
    dimensionsH: 162.8,
    dimensionsL: 76.6,
    dimensionsW: 8.5,
    weight: 232,
    image: googlePixel10ProXl.src,
    isFromClient: true,
  },
];

const initialReferences = [
  ...everydayItems,
  ...originalHardware.map(r => ({...r, originalHardware: true})),
  ...phones.map(r => ({...r, phone: true}))
]?.map(r => ({...r, isFromClient: true}))

export { initialReferences}