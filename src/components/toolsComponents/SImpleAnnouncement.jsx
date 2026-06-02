import React from "react";
import IconsWrapper from "./IconsWrapper";
import { Steps, Box, Text } from "@chakra-ui/react";

export default function SimpleAnnouncement({ children, ...props }) {
  return (
    <Box
      color={props.color ?? "white"}
      _dark={{
        backgroundColor: props?.backgroundColor ?? "var(--appColorReverseAccent)",
      }}
      _light={{
        backgroundColor: props?.backgroundColor ?? "var(--appColorReverseAccent)",
      }}
      borderColor={"var(--appColorDarkGrey)"}
      border="1px solid"
      px={4}
      py={2}
      borderRadius="md"
      textAlign="center"
      fontWeight={props.fontWeight ?? "medium"}
      boxShadow="md"
    >
      {children}
    </Box>
  );
}
