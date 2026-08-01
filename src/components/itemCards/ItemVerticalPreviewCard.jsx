import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { buildFrontImageUrl } from "@/lib/images";
import { buildItemFullInfoLink } from "@/lib/appGlobals";
import ItemAttributeIcons from "./ItemAttributeIcons";
import ItemScreenSpecsPreview from "./ItemScreenSpecsPreview";
import { staffPicks } from "@/resources/staffPicks";

export default function ItemVerticalPreviewCard(props) {
  const categories = props.itemInfo?.categories ?? [];
  const isStaffPick = staffPicks.includes(props.itemInfo?.id);

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
    <>
      <ItemCard
        minH={"18rem"}
        p={0}
        _hover={{ borderColor: "var(--foreground)" }}
        h="100%"
      >
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
            {/* {isStaffPick && (
              <Box position="absolute" top="8px" right="8px">
                <AppTooltip
                  label="Staff Pick"
                  content={
                    <Box color="var(--appColorAccent)" opacity={.6}>
                      <RxStarFilled size="20" />
                    </Box>
                  }
                ></AppTooltip>
              </Box>
            )} */}
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
                <ItemScreenSpecsPreview
                  itemInfo={props?.itemInfo}
                ></ItemScreenSpecsPreview>
              </Flex>
            </Box>
          </Box>

          <Box
            minHeight="6rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap="2px"
            flexGrow={1}
          >
            <Text fontSize="sm" textAlign="center" fontWeight={800}>
              {props.itemInfo?.fullName}
            </Text>
            <Text
              fontSize="xs"
              textAlign="center"
              color="var(--appColorDarkGrey)"
            >
              {[
                props.itemInfo?.releaseDate?.split("/")?.[0] ?? null,
                props.itemInfo?.screenType ?? null,
                props.itemInfo?.price != null
                  ? <Box as="span">{`$${props.itemInfo.price}`}</Box>
                  : null,
              ]
                .filter(Boolean)
                .reduce((acc, item, idx) => idx === 0 ? [item] : [...acc, " • ", item], [])}
            </Text>
          </Box>

          {/* {renderCategories()} */}
        </Box>
      </ItemCard>
      {/* <Box
        onClick={async () =>
          await navigator?.clipboard?.writeText(props?.itemInfo?.name)
        }
        mb={"2rem"}
        cursor={"pointer"}
        _hover={{ color: "var(--appColorLink)" }}
      >
        {" "}
        {props?.itemInfo?.name}
      </Box>
      <Box
        onClick={async () =>
          await navigator?.clipboard?.writeText(props?.itemInfo?.id)
        }
        mb={"2rem"}
        cursor={"pointer"}
        _hover={{ color: "var(--appColorLink)" }}
      >
        {" "}
        {props?.itemInfo?.id}
      </Box> */}
    </>
  );
}
