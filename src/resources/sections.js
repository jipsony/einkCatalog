import {
  compareFloat,
  compareOrder,
  compareScreenSize,
  compareWithUnitOrder,
} from "@/lib/compare/compare";
import {
  FaHandSparkles,
  FaMobileScreen,
  FaTabletScreenButton,
} from "react-icons/fa6";
import { IoMdRadioButtonOn, IoMdResize } from "react-icons/io";
import {
  LuStar,
  LuCpu,
  LuBluetooth,
  LuPen,
  LuWifi,
  LuSun,
  LuAppWindow,
} from "react-icons/lu";
import { MdColorLens, MdFullscreen, MdOutlineTouchApp } from "react-icons/md";
import { TbHandClick, TbMobiledata } from "react-icons/tb";
import screenTypeRanking from "@/resources/screenTypeRanking.json" with { type: "json" };
import { HiOutlinePencil } from "react-icons/hi";
import { IoColorPalette } from "react-icons/io5";
const sections = {
  features: {
    label: "Features",
    icon: LuStar,
    attributes: [
      //   { attribute: "frontLight", label: "Front Light", type: "tag" },
      //   { attribute: "backlight", label: "Back Light", type: "tag" },

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
      {
        attribute: "wirelessCharging",
        label: "Wireless Chg.",

        type: "tag",
      },
      { attribute: "audioOutput", label: "Audio Jack", type: "tag" },
      { attribute: "microphone", label: "Microphone", type: "tag" },

      // { attribute: "textToSpeech", label: "Text To Speech", type: "tag" },
      //   { attribute: "waterproofRating", label: "Waterproof Rating" },
      //   { attribute: "wirelessCharging", label: "Wireless Charging" },
    ],
  },
  display: {
    label: "Screen",
    icon: FaTabletScreenButton,
    attributes: [
      {
        attribute: "screenLight",
        label: "Screen Light",
        type: "tag",
        icon: LuSun,
      },
      { attribute: "warmLight", label: "Warm Light", type: "tag" },

      //   { attribute: "frontLightCold", label: "Front Light (Cold)", type: "tag" },
      {
        attribute: "colorDisplay",
        label: "Color Display",
        type: "tag",
        icon: IoColorPalette,
      },
      { attribute: "darkMode", label: "Dark Mode", type: "tag" },
      {
        attribute: "screenSize",
        label: "Screen Size",
        unit: '"',
        compareFunction: (a, b) => compareScreenSize(a, b),
      },
      {
        attribute: "resolution",
        label: "Resolution",
        compareFunction: (a, b) => {
          const parsePixels = (r) =>
            r
              ?.split("x")
              ?.map(Number)
              .reduce((acc, v) => acc * v, 1);
          return compareFloat(parsePixels(a), parsePixels(b));
        },
      },
      {
        attribute: "aspectRatio",
        label: "Aspect Ratio",
      },
      {
        attribute: "screenType",
        label: "Technology",
        compareFunction: (a, b) => compareOrder(screenTypeRanking, a, b, false),
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

  controls: {
    label: "Controls",
    icon: IoMdRadioButtonOn,
    attributes: [
      {
        attribute: "touchscreen",
        label: "Touchscreen",
        type: "tag",
        icon: TbHandClick,
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
        // icon: LuPen,
        icon: HiOutlinePencil,
      },
    ],
  },
  software: {
    label: "Built-In Apps",
    icon: LuAppWindow,
    attributes: [
      { attribute: "cloudStorage", label: "Cloud Storage", type: "tag" },
      { attribute: "bookStore", label: "Book Store", type: "tag" },
      { attribute: "browser", label: "Browser", type: "tag" },
      { attribute: "email", label: "E-mail", type: "tag" },
      { attribute: "libby", label: "Libby", type: "tag" },
      // { attribute: "audioBooks", label: "AudioBooks", type: "tag" },
      // { attribute: "libby", label: "Libby", type: "tag" },
    ],
  },

  ergonomics: {
    label: "Size",
    icon: IoMdResize,
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
        compareFunction: (a, b) => compareFloat(a, b),
      },
      {
        attribute: "storage",
        label: "Storage",
        compareFunction: (a, b) =>
          compareWithUnitOrder(["KB", "MB", "GB", "TB"], a, b),
      },

      {
        attribute: "ram",
        label: "RAM",
        compareFunction: (a, b) => {
          return compareWithUnitOrder(["KB", "MB", "GB", "TB"], a, b);
        },
      },
      {
        attribute: "cpu",
        label: "CPU",
        compareFunction: (a, b) => {
          return compareWithUnitOrder(["Hz", "MHz", "GHz"], a, b);
        },
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
