import React from "react";
import { Box, Center } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import ItemAttributeIcons from "./ItemAttributeIcons";

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

export default function ItemTitle(props) {
  return (
    <ItemCard
      width="100%"
      //   p={0}
    >
      <Box textAlign="center" fontWeight={"bold"} as="h1" fontSize={"lg"}>
        {props?.itemInfo?.brand} {props?.itemInfo?.name}
      </Box>
      {/* <Center my={".5rem"}>
        <ItemAttributeIcons
          color={"var(--appColorAccent)"}
          itemInfo={props.itemInfo}
          size="16"
        ></ItemAttributeIcons>
      </Center> */}
    </ItemCard>
  );
}
