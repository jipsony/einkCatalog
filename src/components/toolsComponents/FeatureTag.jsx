import React from "react";
import { Box } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import { ImCheckmark } from "react-icons/im";

export default function FeatureTag({ label, value, detail }) {
  const isActive =
    value === true ||
    value === "true" ||
    (value && value !== false && value !== "false" && value !== "");

  const accessibleLabel =
    value && value !== "?"
      ? `${label}: Supported${detail ? ` (${detail})` : ""}`
      : `${label}: ${value === "?" ? "Unconfirmed" : "Not supported"}`;

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap="6px"
      px={3}
      py={1}
      borderRadius="full"
      width={"100%"}
      border="1px solid"
      fontSize="12px"
      borderColor={isActive ? "var(--appColorAccent)" : "var(--appBorderColor)"}
      // bg={isActive ? "var(--appColorLight)" : "transparent"}
      color={isActive ? "var(--appColorAccent)" : "currentColor"}
      opacity={isActive ? 1 : 0.6}
      whiteSpace="nowrap"
      justifyContent="center"
      position="relative"
      title={accessibleLabel}
      aria-label={accessibleLabel}
      fontWeight={isActive ? 600 : 400}
      pr={7}
    >
      {label}
      {detail && (
        <Box as="span" opacity={0.6}>
          &nbsp;· {detail}
        </Box>
      )}
      {isActive && (
        <Box
          flexShrink={0}
          position="absolute"
          right={3}
          display="inline-flex"
          alignItems="center"
        >
          {/* <LuCheck size={14} fontWeight={800} /> */}
          <ImCheckmark size={10}></ImCheckmark>
        </Box>
      )}
      {/* <Box
        w="7px"
        h="7px"
        borderRadius="full"
        bg={isActive ? "currentColor" : "transparent"}
        border="1px solid"
        borderColor="currentColor"
        flexShrink={0}
        position="absolute"
        right={3}
      /> */}
    </Box>
  );
}
