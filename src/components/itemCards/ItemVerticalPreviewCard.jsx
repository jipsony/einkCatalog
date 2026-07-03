import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { buildFrontImageUrl } from "@/lib/images";
import { buildItemFullInfoLink } from "@/lib/appGlobals";
import ItemAttributeIcons from "./ItemAttributeIcons";

export const renderScreenSpecsPreview = (itemInfo) => {
  return (
    <Box flexShrink={0} overflow="hidden" as="span">
      <Box as="span" title="Screen Size">{itemInfo?.screenSize}&quot;</Box>
      {" "}&bull;{" "}
      <Box as="span" title="Aspect Ratio">{itemInfo?.aspectRatio}</Box>
    </Box>
  );
};

export default function ItemVerticalPreviewCard(props) {
  const categories = props.itemInfo?.categories ?? [];

  const renderCategories = () => {
    <Flex
      flexWrap="wrap"
      gap="6px"
      justifyContent="center"
      mt=".5rem"
      mb="1rem"
      px="4px"
    >
      {categories.map((cat, idx) => (
        <Box
          key={cat}
          display="inline-flex"
          alignItems="center"
          fontSize="10px"
          whiteSpace="nowrap"
          color="var(--appColorAccent)"
        >
          {cat}

          {idx !== categories?.length - 1 && ","}
        </Box>
      ))}
    </Flex>;
  };

  return (
    <ItemCard minH={"18rem"} p={0} _hover={{ borderColor: "var(--foreground)" }} h="100%">
      <Box
        as="a"
        height="100%"
        display="flex"
        flexDirection="column"
        href={buildItemFullInfoLink(props?.itemInfo?.id)}
      >
        <Box
          mx="1rem"
          mt="1rem"
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"var(--appColorLightGrey)"}
          borderRadius={"md"}
          minH={"20rem"}
          position={"relative"}
        >
          <Image src={buildFrontImageUrl(props.itemInfo?.id)} />
          <Box
            fontSize="11px"
            position="absolute"
            bottom={"4px"}
            color={"var(--appColorAccent)"}
            opacity={0.7}
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
              {renderScreenSpecsPreview(props.itemInfo)}
            </Flex>
          </Box>
        </Box>

        <Box
          minHeight="6rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}

        >
          <Text fontSize="sm" textAlign="center" fontWeight={800}>
            {props.itemInfo?.fullName}
          </Text>
        </Box>

        {/* {renderCategories()} */}
      </Box>
    </ItemCard>
  );
}
