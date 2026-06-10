import { compareColorsRender } from "@/lib/compare/compare";
import React from "react";
import { circleSize, iconMap } from "./CompareKeyValueIcon";

export default function CompareTagIcon(props) {
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
        boxSizing: "content-box",
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "var(--appColorCardBackground, white)",
        position: "absolute",
        marginLeft: -6,
        marginBottom: 2,
        color: "var(--background)",
        zIndex: 2,
        
      }}
    >
      <Icon />
    </span>
  );
}
