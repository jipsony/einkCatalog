import { compareFloat, compareScreenSize } from "@/lib/compare/compare";
import {
  FaHandSparkles,
  FaMobileScreen,
} from "react-icons/fa6";
import { IoMdRadioButtonOn } from "react-icons/io";
import {
  LuStar,
  LuCpu,
  LuBluetooth,
  LuPen,
  LuWifi,
  LuSun,
  LuAppWindow,
} from "react-icons/lu";
import { MdColorLens, MdOutlineTouchApp } from "react-icons/md";
import { TbMobiledata } from "react-icons/tb";

const sections = {
  features: {
    label: "Features",
    icon: LuStar,
    attributes: [
      //   { attribute: "frontLight", label: "Front Light", type: "tag" },
      //   { attribute: "backlight", label: "Back Light", type: "tag" },
      {
        attribute: "screenLight",
        label: "Screen Light",
        type: "tag",
        icon: LuSun,
      },
      //   { attribute: "frontLightCold", label: "Front Light (Cold)", type: "tag" },
      {
        attribute: "colorDisplay",
        label: "Color Display",
        type: "tag",
        icon: MdColorLens,
      },
      { attribute: "darkMode", label: "Dark Mode", type: "tag" },
      { attribute: "wifi", label: "WiFi", type: "tag", icon: LuWifi },

      {
        attribute: "bluetooth",
        label: "Bluetooth",
        type: "tag",
        icon: LuBluetooth,
      },
      {
        attribute: "mobileData",
        label: "Mobile Data",
        type: "tag",
        icon: TbMobiledata,
      },
      { attribute: "usbc", label: "USB C", type: "tag" },

      { attribute: "sdCard", label: "SD Card Slot", type: "tag" },
      { attribute: "waterproof", label: "Waterproofing", type: "tag" },

      { attribute: "speakers", label: "Speakers", type: "tag" },
      { attribute: "audioOutput", label: "Audio Jack", type: "tag" },
      {
        attribute: "wirelessCharging",
        label: "Wireless Charging",
        type: "tag",
      },

      // { attribute: "textToSpeech", label: "Text To Speech", type: "tag" },
      //   { attribute: "waterproofRating", label: "Waterproof Rating" },
      //   { attribute: "wirelessCharging", label: "Wireless Charging" },
    ],
  },


  display: {
    label: "Screen",
    icon: FaMobileScreen,
    attributes: [
      {
        attribute: "screenSize",
        label: "Screen Size",
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
        attribute: "screenType",
        label: "Technology",
      },
      {
        attribute: "pixelDensity",
        label: "Pixel Density",
        unit: " PPI",
        compareFunction: (a, b) => compareFloat(a, b),
      },
    ],
  },
  //   portsAndConnectivity: {
  //     label: "Ports and Connectivity",
  //     icon: FaPlugCircleBolt,
  //     attributes: [
  //       { attribute: "wifi", label: "WiFi", type: "tag" },
  //       { attribute: "bluetooth", label: "Bluetooth", type: "tag" },
  //       { attribute: "mobileData", label: "Mobile Data", type: "tag" },
  //       { attribute: "sdCard", label: "SD Card Slot", type: "tag" },
  //       { attribute: "speakers", label: "Speakers", type: "tag" },
  //       { attribute: "usbc", label: "USB C", type: "tag" },
  //     ],
  //   },

  ergonomics: {
    label: "Build & Ergonomics",
    icon: FaHandSparkles,
    attributes: [
      {
        attribute: "dimensions",
        label: "Dimensions",
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
    icon: IoMdRadioButtonOn,
    attributes: [
      {
        attribute: "touchscreen",
        label: "Touchscreen",
        type: "tag",
        icon: MdOutlineTouchApp,
      },
      { attribute: "pageTurnButtons", label: "Page Buttons", type: "tag" },
      {
        attribute: "automaticRotation",
        label: "Auto-Rotation",
        type: "tag",
      },
      //       {
      //   attribute: "microphone",
      //   label: "Auto-Rotation",
      //   type: "tag",
      // },
      {
        attribute: "stylusSupport",
        label: "Stylus Support",
        type: "tag",
        icon: LuPen,
      },
    ],
  },
    software: {
    label: "Apps",
    icon: LuAppWindow,
    attributes: [
      { attribute: "cloudStorage", label: "Cloud Storage", type: "tag" },
      { attribute: "browser", label: "Browser", type: "tag" },
      { attribute: "email", label: "E-mail", type: "tag" },
      // { attribute: "audioBooks", label: "AudioBooks", type: "tag" },
      // { attribute: "libby", label: "Libby", type: "tag" },

    ],
  },
  techSpecs: {
    label: "Technical Specs",
    icon: LuCpu,
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
  ?.map((s) =>
    s.attributes?.filter((r) => r?.type === "tag" && !r?.isFilterOnly),
  )
  ?.flat();

export default sections;
export { allFeatures };
