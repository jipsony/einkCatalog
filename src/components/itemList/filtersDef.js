import sections from "@/resources/sections";
import {
  FaMoneyBill1Wave,
  FaUpRightAndDownLeftFromCenter,
  FaGear,
  FaBuilding,
  FaPlus,
  FaEye,
} from "react-icons/fa6";
import { MdEventAvailable, MdOutlineEventAvailable } from "react-icons/md";

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

const numericRangeFilterFunction = (row, key, value) => {
  if (!Array.isArray(value) || value.length !== 2) return true;

  const [minimum, maximum] = value.map(Number);
  const rowValue = Number(row?.[key]);

  return (
    Number.isFinite(minimum) &&
    Number.isFinite(maximum) &&
    Number.isFinite(rowValue) &&
    rowValue >= minimum &&
    rowValue <= maximum
  );
};

const initSliderFilters = (filterList) => {
  return filterList.map((filter) => ({
    ...filter,
    value: false,
    filterFunction: (row, value) => {
      if (filter.filterFunction)
        return filter.filterFunction(row, filter.key, value);
      return numericRangeFilterFunction(row, filter.key, value);
    },
    active: false,
    type: "slider",
  }));
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
    icon: MdEventAvailable,
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
    children: ["screenSize", "aspectRatio", "screenType"],
  },
  {
    key: "screenSize",
    label: "Screen Size",
    icon: FaEye,
    type: "slider",
    unit: '"',
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

const specialCategories = [
  { key: "Staff Pick", label: "Staff Pick" },
  { key: "For Reading", label: "For Reading", titleRenderType: "suffix" },
  {
    key: "For Note-taking",
    label: "For Note-taking",
    titleRenderType: "suffix",
  },
  { key: "Phone-Like", label: "Phone-Like", titleRenderType: "prefix" },
  { key: "Kindle Alternative", label: "Kindle Alternative", titleRenderType: "prefix",  },
];
const specialCategoryFilters = [
  ...specialCategories.map((s) => ({
    key: s.key,
    label: s.label,
    value: false,
    filterFunction: (row) => row.categories.includes(s.key),
    active: false,
    type: "checkbox",
    titleRenderType: s?.titleRenderType ?? "none",
  })),
];

const sectionFilters = initSectionFilters();
const categoryFilters = specialCategoryFilters;

let filtersDef = [
  ...initRadioFilters(generalFilters.filter((f) => f.type !== "slider")),
  ...initSliderFilters(generalFilters.filter((f) => f.type === "slider")),
  ...sectionFilters,
  ...initRadioFilters(
    additionalSectionFilters.filter((f) => f.type === "radio"),
  ),
  ...initSliderFilters(
    additionalSectionFilters.filter((f) => f.type === "slider"),
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
