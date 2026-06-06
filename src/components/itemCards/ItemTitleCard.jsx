import React from "react";
import { Box, Text } from "@chakra-ui/react";

const dottedLine = (color) =>
  `linear-gradient(90deg, ${color} 5px, transparent 5px)`;

export default function ItemTitleCard(props) {
  return (
    <Box
      width="100%"
      py={3}
      style={{
        backgroundImage: `${dottedLine("gray")}, ${dottedLine("gray")}`,
        backgroundSize: "8px 1px",
        backgroundPosition: "top left, bottom left",
        backgroundRepeat: "repeat-x, repeat-x",
      }}
    >
      <Text
        fontSize="xl"
        textAlign="center"
        fontFamily="var(--font-lora)"
        fontStyle="italic"
        fontWeight={"bold"}
      >
        {props?.itemInfo?.brand}
        {" "}
        {props?.itemInfo?.name}
      </Text>
    </Box>
  );
}
