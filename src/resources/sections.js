import { compareFloat, compareScreenSize } from "@/lib/compare/compare";

const sections = {
  features: {
    label: "Features",
    attributes: [
      { attribute: "touchscreen", label: "Touchscreen", type: "tag" },
      { attribute: "stylusSupport", label: "Stylus Support", type: "tag" },

      { attribute: "frontLight", label: "Front Light", type: "tag" },
      { attribute: "backlight", label: "Back Light", type: "tag" },
      //   { attribute: "frontLightCold", label: "Front Light (Cold)", type: "tag" },
      { attribute: "colorDisplay", label: "Color Display", type: "tag" },
      { attribute: "wifi", label: "WiFi", type: "tag" },
      { attribute: "sdCard", label: "SD Card Slot", type: "tag" },
      { attribute: "browser", label: "Modern Browser", type: "tag" },

      { attribute: "bluetooth", label: "Bluetooth", type: "tag" },
      { attribute: "speakers", label: "Speakers", type: "tag" },
      { attribute: "textToSpeech", label: "Text To Speech", type: "tag" },

      //   { attribute: "waterproofRating", label: "Waterproof Rating" },
    ],
  },
  display: {
    label: "Screen",
    attributes: [
      {
        attribute: "screenSize",
        label: "Screen size",
        unit: '"',
        compareFunction: (a, b) => compareScreenSize(a, b),
      },
      {
        attribute: "resolution",
        label: "Resolution",
      },
      {
        attribute: "aspectRatio",
        label: "Aspect Ratio",
      },
      {
        attribute: "pixelDensity",
        label: "Pixel Density",
        unit: " PPI",
        compareFunction: (a, b) => compareFloat(a, b),
      },
      {
        attribute: "screenType",
        label: "Technology",
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
    //   {
    //     attribute: "replaceableBattery",
    //     label: "Replaceable Battery",
    //     type: "tag",
    //   },
    ],
  },

  controls: {
    label: "Controls",
    attributes: [
      { attribute: "touchscreen", label: "Touchscreen", type: "tag" },
      { attribute: "pageTurnButtons", label: "Page Buttons", type: "tag" },
      {
        attribute: "automaticRotation",
        label: "Automatic Rotation",
        type: "tag",
      },
    ],
  },
  techSpecs: {
    label: "Specs",
    attributes: [
      //   {
      //     attribute: "batteryLife",
      //     label: "Battery Life",
      //   },
      {
        attribute: "battery",
        label: "Battery",
      },
      {
        attribute: "storage",
        label: "Storage",
      },
      {
        attribute: "cpu",
        label: "CPU",
      },
      {
        attribute: "ram",
        label: "RAM",
      },
    ],
  },
};

const allFeatures = Object.values(sections)
  ?.map((s) =>
    s.attributes?.filter((r) => r?.type === "tag" && !r?.isFilterOnly),
  )
  ?.flat();

export default sections;
export { allFeatures };
