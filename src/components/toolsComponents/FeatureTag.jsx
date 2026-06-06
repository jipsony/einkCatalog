import React from "react";
import { Box } from "@chakra-ui/react";

export default function FeatureTag({ label, value, detail }) {
  const isActive =
    value === true ||
    value === "true" ||
    (value && value !== false && value !== "false" && value !== "");
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap={1}
      px={2}
      py={0.5}
      borderRadius="2px"
      border="1px solid"
      fontSize="11px"
      fontWeight="500"
      borderColor={isActive ? "currentColor" : "var(--appBorderColor)"}
      opacity={isActive ? 1 : 0.4}
    >
      <Box
        w="6px"
        h="6px"
        borderRadius="full"
        bg={isActive ? "currentColor" : "transparent"}
        border="1px solid"
        borderColor="currentColor"
        flexShrink={0}
      />
      {label}
      {detail && (
        <Box as="span" opacity={0.7}>
          {" "}
          · {detail}
        </Box>
      )}
    </Box>
  );
}
