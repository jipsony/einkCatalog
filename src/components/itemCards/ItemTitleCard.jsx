import React from "react";
import { Box, Text } from "@chakra-ui/react";

const DashLine = () => (
  <Box
    fontFamily="mono"
    letterSpacing="widest"
    overflow="hidden"
    whiteSpace="nowrap"
    opacity={0.2}
    userSelect="none"
    aria-hidden="true"
    mt="-0.5"
  >
    {"-".repeat(200)}
  </Box>
);

export default function ItemTitleCard(props) {
  return (
    <Box width="100%" py={3}>
      {/* <DashLine /> */}

      <Text
        fontSize="2xl"
        textAlign="center"
        fontFamily="var(--font-lora)"
        fontStyle="italic"
        fontWeight={"bold"}
      >
        {props?.itemInfo?.brand} {props?.itemInfo?.name}
      </Text>
      {/* <DashLine /> */}
    </Box>
  );
}
