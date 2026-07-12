import sections from "@/resources/sections";
import {
  FaMoneyBill1Wave,
  FaUpRightAndDownLeftFromCenter,
  FaGear,
  FaBuilding,
  FaPlus,
  FaEye,
} from "react-icons/fa6";
import { MdOutlineEventAvailable } from "react-icons/md";

const initSectionFilters = () => {
  const filteredSections = Object.entries(sections).filter(
    ([k, section]) =>
      section.attributes.filter((row) => row.type === "tag")?.length > 0,
  );

  const tags = filteredSections.reduce((acc, [sectionKey, section]) => {
    return [...acc, ...section.attributes.filter((e) => e.type === "tag")];
  }, []);

  return initCheckboxFilters(tags);
};

const tagFilterFunction = (row, attribute) => {
  return row?.[attribute];
};

const initRadioFilters = (filterList) => {
  let radios = [];
  filterList.map((filter) => {
    radios.push({
      ...filter,
      value: false,
      filterFunction: (row, value) => {
        if (filter.filterFunction)
          return filter.filterFunction(row, filter.key, value);
        return row[filter.key] === value;
      },
      active: false,
      type: "radio",
    });
  });

  return radios.flat();
};

const initCheckboxFilters = (filterList) => {
  const sectionFilters = filterList.map((tag) => {
    return {
      ...tag,
      key: tag.attribute,
      value: false,
      filterFunction: (row) => tagFilterFunction(row, tag.attribute),
      active: false,
      type: "checkbox",
    };
  });

  return sectionFilters;
};

const defaultFilterFunction = (row, key, value) => {
  return row?.[key]?.toLowerCase()?.includes(value?.toLowerCase());
};

const generalFilters = [
  {
    key: "brand",
    label: "Brand",
    icon: FaBuilding,
  },
  {
    key: "availability",
    label: "Availability",
    shortLabel: "Availability",
    icon: MdOutlineEventAvailable,
  },
  {
    key: "priceCategory",
    label: "Price",
    icon: FaMoneyBill1Wave,
  },
  {
    key: "sizeCategory",
    label: "Size",
    icon: FaUpRightAndDownLeftFromCenter,
  },
  {
    key: "operatingSystem",
    label: "Operating System",
    shortLabel: "OS",
    filterFunction: (row, key, value) => {
      return row?.[key]?.includes(value);
    },
    icon: FaGear,
  },
];

const additionalSectionFilters = [
  {
    key: "display",
    label: "Screen",
    icon: FaPlus,
    children: ["screenSize", "screenType", "aspectRatio"],
  },
  {
    key: "aspectRatio",
    label: "Aspect Ratio",
    icon: FaPlus,
    filterFunction: (row, key, value) => {
      return row?.aspectRatio?.replace("~", "") === value;
    },

    type: "radio",
    parent: "screen",
  },
  // {
  //   key: "screenSize",
  //   label: "Screen Size",
  //   icon: FaEye,
  //   type: "radio",
  //   // parent: "screen",
  //   // doNotRender: true,
  //   // unit:"”"
  // },
  {
    key: "screenType",
    filterFunction: (row, key, value) => {
      return row?.[key]?.toLowerCase() === value?.toLowerCase();
    },
    label: "Technology",
    icon: FaPlus,
    type: "radio",
    parent: "screen",
    titleRenderType: "prefix",
  },
  // {
  //   key: "refreshRate",
  //   filterFunction: (row, key, value) => {
  //     let refreshRate;
  //     if (row?.[key]?.includes("Top")) {
  //       refreshRate = row?.[key]?.split("Top:")?.[1]?.split(" ")?.[0];
  //     } else refreshRate = row?.[key];

  //     const refreshRateMinValue = value?.split("Hz")?.[0];

  //     if (!isNaN(refreshRate) && !isNaN(refreshRateMinValue)) {
  //       return parseFloat(refreshRate) >= parseFloat(refreshRateMinValue);
  //     }
  //   },
  //   label: "Refresh Rate",
  //   icon: "fa-plus",
  //   type: "radio",
  //   parent: "screen",
  //   // unit: "Hz",
  // },
  //   {
  //     key: "shellMaterial",
  //     label: "Material",
  //     type: "radio",
  //     // parent: "ergonomics",
  //     doNotRender: true,
  //   },
];

const specialCategoryFilters = [
  {
    key: "staffPick",
    label: "Staff Pick",
    value: false,
    filterFunction: (row) => row.ratingCategory === "staffPick",
    active: false,
    type: "checkbox",
    titleRenderType: "none",
  },
  // {
  //   key: "isUpcoming",
  //   label: "Upcoming",
  //   value: false,
  //   filterFunction: (row) => row.isUpcoming === true,
  //   active: false,
  //   type: "checkbox",
  // },
  // {
  //   key: "isReleased",
  //   label: "available",
  //   value: false,
  //   filterFunction: (row) => !row.isUpcoming,
  //   active: false,
  //   type: "checkbox",
  // },
];

const sectionFilters = initSectionFilters();
const categoryFilters = specialCategoryFilters;

let filtersDef = [
  ...initRadioFilters(generalFilters),
  ...sectionFilters,
  ...initRadioFilters(
    additionalSectionFilters.filter((f) => f.type === "radio"),
  ),
  ...initCheckboxFilters(
    additionalSectionFilters.filter((f) => f.type === "checkbox"),
  ),
  ...categoryFilters,
];

export {
  filtersDef,
  specialCategoryFilters,
  additionalSectionFilters,
  generalFilters,
};
