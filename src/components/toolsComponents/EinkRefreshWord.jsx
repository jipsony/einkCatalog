"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

const FLASH_BLACK_MS = 220;
const FLASH_WHITE_MS = 200;
const SETTLE_MS = 600;
const HOLD_MS = 2500;

/**
 * Cycles through `props.words`, swapping the word with a full e-ink page
 * refresh: black flash, white flash, then the new word settling in with ghosting.
 */
export default function EinkRefreshWord(props) {
  const words = props.words;
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState("idle");

  React.useEffect(() => {
    if (!words || words.length < 2) return;

    let timeout;
    const schedule = (fn, ms) => {
      timeout = setTimeout(fn, ms);
    };

    const refresh = () => {
      setPhase("black");
      schedule(() => {
        setPhase("white");
        // Swap only once the black has fully faded out (transition is 120 ms)
        schedule(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("settle");
          schedule(() => {
            setPhase("idle");
            schedule(refresh, HOLD_MS);
          }, SETTLE_MS);
        }, FLASH_WHITE_MS);
      }, FLASH_BLACK_MS);
    };

    schedule(refresh, HOLD_MS);
    return () => clearTimeout(timeout);
  }, [words]);

  const inverted = phase === "black";
  const blank = phase === "white";

  // The site font is monospace, so reserving the longest word's width in `ch`
  // (plus the 0.03em letter-spacing set on the subtitle) keeps the surrounding
  // text still without rendering the other words.
  const longest = Math.max(...words.map((word) => word.length));

  return (
    <Box
      as="span"
      display="inline-block"
      mx="-0.15em"
      minW={`calc(${longest} * (1ch + 0.03em) + 0.3em)`}
      textAlign="left"
      verticalAlign="top"
    >
      <Box
        as="span"
        px="0.15em"
        bg={inverted ? "var(--foreground)" : "transparent"}
        color={
          inverted
            ? "var(--background)"
            : blank
              ? "transparent"
              : "var(--appColorDarkGrey)"
        }
        className={phase === "settle" ? "einkSettle" : undefined}
        transition="background-color 120ms ease-out, color 120ms ease-out"
      >
        {words[index]}
      </Box>
    </Box>
  );
}
