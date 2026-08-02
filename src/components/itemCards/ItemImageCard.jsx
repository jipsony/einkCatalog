import React from "react";
import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { buildFrontImageUrl } from "@/lib/images";
import ItemAttributeIcons from "./ItemAttributeIcons";
import ItemScreenSpecsPreview from "./ItemScreenSpecsPreview";

export default function ItemImageCard(props) {
  return (
    <ItemCard
      minH="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddedBackground
    >
      <Stack w={"100%"}>
        <Image
          maxH={"15rem"}
          src={buildFrontImageUrl(props.itemInfo?.id)}
        ></Image>{" "}
        <Box
          fontSize="11px"
          color={"var(--appColorAccent)"}
          opacity={0.7}
          _dark={{opacity: 1}}
              w={"100%"}

        >
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              px=".5rem"
              overflow="hidden"
              whiteSpace="nowrap"
              flexWrap="nowrap"
            >
              <Box overflow="hidden" flexShrink={1} minW={0}>
                <ItemAttributeIcons itemInfo={props.itemInfo} />
              </Box>
              <ItemScreenSpecsPreview
                itemInfo={props?.itemInfo}
              ></ItemScreenSpecsPreview>
            </Flex>
        </Box>
      </Stack>
    </ItemCard>
  );
}
