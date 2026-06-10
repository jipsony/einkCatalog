import { compareColorsRender } from "@/lib/compare/compare";
import React from "react";

const viewBox = "0 0 8 8";
const iconSize = 10;
export const circleSize = 18;
const PlusIcon = ({ size = iconSize } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none">
    <path
      d="M4 1v6M1 4h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MinusIcon = ({ size = iconSize } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none">
    <path
      d="M1 4h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const EqualsIcon = ({ size = iconSize } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none">
    <path
      d="M1 2.4h6M1 5.6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Arrow pointing up (chevron)
const ArrowUpIcon = ({ size = iconSize } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none">
    <path
      d="M1.5 5.25L4 2.75L6.5 5.25"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Arrow pointing down (chevron)
const ArrowDownIcon = ({ size = iconSize } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none">
    <path
      d="M1.5 2.75L4 5.25L6.5 2.75"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// Set 1: Plus / Minus / Equals (current)
export const plusMinusIcons = {
  green: PlusIcon,
  red: MinusIcon,
  yellow: EqualsIcon,
};
// Set 2: Single arrows
export const arrowIcons = {
  green: ArrowUpIcon,
  red: ArrowDownIcon,
  yellow: EqualsIcon,
};

// Active icon set — change this line to switch styles
export const iconMap = arrowIcons;

export default function CompareKeyValueIcon(props) {
  const color = props.compareColor();
  if (!color) return null;
  const Icon = iconMap[color];
  if (!Icon) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: circleSize,
        height: circleSize,
        borderRadius: "50%",
        backgroundColor: compareColorsRender[color],
        position: "absolute",
        marginLeft: -24,
        marginTop: 1,
        // color: "var(--appColorReverseText)",
        color: "var(--background)",
        // opacity: .9
      }}
    >
      <Icon />
    </span>
  );
}
