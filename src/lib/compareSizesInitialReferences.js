import creditCard from "@/resources/images/compareSizes/credit-card.webp";
import butter from "@/resources/images/compareSizes/butter.webp";
import rootBeer from "@/resources/images/compareSizes/root-beer.webp";
import pokerCard from "@/resources/images/compareSizes/poker-card.webp";
import basketball from "@/resources/images/compareSizes/basketball.webp";
import banana from "@/resources/images/compareSizes/banana.webp";
import rootBeerTechDweeb from "@/resources/images/compareSizes/tdrootbeer.webp";
import egg from "@/resources/images/compareSizes/egg.webp";

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
  ...phones.map(r => ({...r, phone: true}))
]?.map(r => ({...r, isFromClient: true}))

export { initialReferences}