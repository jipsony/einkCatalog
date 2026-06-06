import { compareFloat, compareScreenSize } from "@/lib/compare/compare";

const sections = {
  display: {
    label: "Screen",
    attributes: [
      {
        attribute: "screenSize",
        label: "Size",
        unit: "\"",
        compareFunction: (a, b) => compareScreenSize(a, b),
      },
      {
        attribute: "resolution",
        label: "Resolution",
      },
      {
        attribute: "screenType",
        label: "Technology",
      },
      {
        attribute: "pixelDensity",
        label: "PPI",
        unit: " PPI",
        compareFunction: (a, b) => compareFloat(a, b),
      },
    ],
  },
  ergonomics: {
    label: "Build & Ergonomics",
    attributes: [
      {
        attribute: "dimensions",
        label: "Size",
        unit: " mm",
      },
      {
        attribute: "weight",
        label: "Weight",
        unit: " g",
        compareFunction: (a, b) => parseFloat(-compareFloat(a, b)),
      },
      {
        attribute: "replaceableBattery",
        label: "Replaceable Battery",
        type: "tag",
      },
    ],
  },
  features: {
    label: "Features",
    attributes: [
      { attribute: "backlight", label: "Backlight", type: "tag" },
      { attribute: "textToSpeech", label: "Text To Speech", type: "tag" },
      { attribute: "frontLightWarm", label: "Front Light (Warm)", type: "tag" },
      { attribute: "frontLightCold", label: "Front Light (Cold)", type: "tag" },
      { attribute: "wifi", label: "WiFi", type: "tag" },
      { attribute: "bluetooth", label: "Bluetooth", type: "tag" },
      { attribute: "stylusSupport", label: "Stylus Support", type: "tag" },
      { attribute: "color", label: "Color Display", type: "tag" },
      { attribute: "waterproofRating", label: "Waterproof Rating" },
      { attribute: "speakers", label: "Speakers", type: "tag" },
      { attribute: "microphone", label: "Microphone", type: "tag" },
      { attribute: "sdCard", label: "MicroSD Card Slot", type: "tag" },
      { attribute: "browser", label: "Modern Browser", type: "tag" },
    ],
  },
  controls: {
    label: "Controls",
    attributes: [
      { attribute: "pageTurnButtons", label: "Page Buttons", type: "tag" },
      { attribute: "touchscreen", label: "Touchscreen", type: "tag" },
      { attribute: "automaticRotation", label: "Automatic Rotation", type: "tag" },
    ],
  },
  techSpecs: {
    label: "Specs",
    attributes: [
      {
        attribute: "storage",
        label: "Storage",
      },
      {
        attribute: "battery",
        label: "Battery",
      },
      {
        attribute: "batteryLife",
        label: "Battery Life",
      },
      {
        attribute: "ram",
        label: "RAM",
      },
      {
        attribute: "cpu",
        label: "CPU",
      },
    ],
  },
};

const allFeatures = Object.values(sections)
  ?.map((s) => s.attributes?.filter((r) => r?.type === "tag" && !r?.isFilterOnly))
  ?.flat();

export default sections;
export { allFeatures };
