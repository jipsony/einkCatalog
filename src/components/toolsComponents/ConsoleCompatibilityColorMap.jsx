const colorMap = {
  A: { color: "green", tooltip: "Great emulation performance" },
  B: {
    customColor: "var(--consoleCompatibilityBCustomColor)",
    customBackgroundColor: "var(--consoleCompatibilityBCustomBackgroundColor)",
    tooltip: "Good emulation performance for most games",
  },
  C: {
    color: "orange",
    tooltip: "Good emulation performance with some limitations",
  },
  D: { color: "red", tooltip: "Playable with heavy limitations" },
  F: {
    color: undefined,
    tooltip: "Unplayable, terrible emulation performance",
  },
  "?": {
    color: undefined,
    tooltip: "Unplayable, terrible emulation performance",
  },
};

export default colorMap;
