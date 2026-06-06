import React from "react";
import { Box, Center, Image } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import xteinkX4 from "@/resources/images/xteink-x4.webp";

export default function ItemImageCard(props) {
  return (
    <ItemCard
      minH="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image maxH={"10rem"} src={xteinkX4?.src}></Image>
    </ItemCard>
  );
}
