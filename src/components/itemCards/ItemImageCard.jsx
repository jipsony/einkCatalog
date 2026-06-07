import React from "react";
import { Box, Center, Image } from "@chakra-ui/react";
import ItemCard from "./ItemCard";

import xteinkX4 from "@/resources/images/xteink-x4.webp";
import koboLibraColor from "@/resources/images/kobo-libra-color.webp";
import kindleColorSoft from "@/resources/images/kindle-colorsoft.webp";

const images = {
  "xteink-x4": xteinkX4,
  "kobo-libra-color": koboLibraColor,
  "kindle-colorsoft": kindleColorSoft,
};
export default function ItemImageCard(props) {
  const image = images[props?.itemInfo?.id]?.src;
  return (
    <ItemCard
      minH="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image maxH={"10rem"} src={image}></Image>
    </ItemCard>
  );
}
