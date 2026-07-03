import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import ItemCard from "./ItemCard";
import { renderScreenSpecsPreview } from "./ItemVerticalPreviewCard";
import ItemAttributeIcons from "./ItemAttributeIcons";
import { buildFrontImageUrl } from "@/lib/images";
import { buildItemFullInfoLink } from "@/lib/appGlobals";
import { LuArrowLeftRight } from "react-icons/lu";

export default function ItemHorizontalPreviewCard(props) {
  return (
    <ItemCard p={0} _hover={{ borderColor: "var(--foreground)" }} h="100%">
      <HStack gap={0} h="100%">
        <a
          href={buildItemFullInfoLink(props?.itemInfo?.id)}
          style={{ flex: 1, minWidth: 0, display: "flex", height: "100%" }}
        >
          <HStack gap={0} flex={1} minW={0} h={"100%"}>  
            <Box
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor={"var(--appColorLightGrey)"}
              w={"8rem"}
              // h={"100%"}
              // minH={"6rem"}
              h={"100%"}
              // p={"0.5rem"}
              borderLeftRadius={"4px"}
            >
              <Image
                src={buildFrontImageUrl(props.itemInfo?.id)}
                maxH={"5rem"}
                objectFit="contain"
              />
            </Box>

            <Stack gap={1} px={3} py={2} flex={1} minW={0}>
              <Text fontSize="sm" fontWeight={800} lineClamp={2}>
                {props.itemInfo?.fullName}
              </Text>
              <Box
                fontSize="11px"
                color={"var(--appColorAccent)"}
                opacity={0.8}
              >
                <ItemAttributeIcons itemInfo={props.itemInfo} />
              </Box>
              <Box
                fontSize="11px"
                color={"var(--appColorAccent)"}
                opacity={0.7}
              >
                {renderScreenSpecsPreview(props.itemInfo)}
              </Box>
            </Stack>
          </HStack>
        </a>

        {props.compareLink && (
          <Box as="a" href={props.compareLink} alignSelf="stretch" minW="4rem">
            <Box
              h="100%"
              px={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderLeft="1px solid"
              borderColor="var(--appBorderColor)"
              color="var(--appColorAccent)"
              opacity={0.7}
              _hover={{ backgroundColor: "var(--appColorLightGrey)" }}
            >
              <LuArrowLeftRight size={16} />
            </Box>
          </Box>
        )}
      </HStack>
    </ItemCard>
  );
}
