import React from "react";
import { compareColorsRender } from "@/lib/compare/compare";
import { iconMap } from "./CompareKeyValueIcon";

export default function CompareTagIcon({ compareColor }) {
  const color = compareColor();
  if (!color) return null;
  const Icon = iconMap[color];
  if (!Icon) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: compareColorsRender[color],
        position: "absolute",
        marginLeft: -18,
        marginTop: 2,
        color: "var(--appColorReverseText)",
      }}
    >
      <Icon />
    </span>
  );
}
