import React from "react";
import { Image } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { buildFrontImageUrl } from "@/lib/images";

export default function ItemImageCard(props) {
  return (
    <ItemCard
      minH="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image maxH={"10rem"} src={buildFrontImageUrl(props.itemInfo?.id)}></Image>
    </ItemCard>
  );
}
