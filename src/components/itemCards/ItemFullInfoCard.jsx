"use client";
import React from "react";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Flex,
  HStack,
  Heading,
  Separator,
  Center,
} from "@chakra-ui/react";
import FeatureTag from "../toolsComponents/FeatureTag";
import sections from "@/resources/sections";
import AppLink from "../toolsComponents/AppLink";
import { compareBool, compareColor } from "@/lib/compare/compare";
import ItemCard from "./ItemCard";
import ItemKeyValueAttributes from "./ItemKeyValueAttributes";
import { attributeMarginLeft, featureTagTemplateColumns } from "@/lib/sizes";
import CompareKeyValueIcon from "@/app/e-readers/compare/CompareKeyValueIcon";
import CompareTagIcon from "@/app/e-readers/compare/CompareTagIcon";

export default function ItemFullInfoCard(props) {
  const templateColumnsForFeaturesTag = props.isFullPage
    ? featureTagTemplateColumns
    : "repeat(2, 1fr)";

  const isCompareValueUndefined = (attribute) => {
    return (
      props.itemInfo?.[attribute] === "?" ||
      props.compareWithItemInfo?.[attribute] === "?"
    );
  };

  const renderCompareByType = (attribute) => {
    const isTag = attribute.type === "tag";

    const renderCompare = () => {
      if (isCompareValueUndefined(attribute.attribute)) return;
      if (isTag) {
        return compareColor(
          compareBool(
            props.itemInfo?.[attribute.attribute],
            props.compareWithItemInfo?.[attribute.attribute],
          ),
        );
      }
      const compareResult = attribute?.compareFunction(
        props.itemInfo?.[attribute.attribute],
        props.compareWithItemInfo?.[attribute.attribute],
      );
      return compareColor(compareResult);
    };

    if (
      props.compareWithItemInfo &&
      ((attribute?.compareFunction && !attribute.dontCompare) ||
        attribute.type === "tag")
    ) {
      if (isTag) {
        return (
          <CompareTagIcon
            attribute={attribute.attribute}
            compareColor={() => renderCompare()}
          />
        );
      }
      return (
        <CompareKeyValueIcon
          key={attribute.attribute}
          compareColor={() => renderCompare()}
        />
      );
    }
  };

  const renderValue = (attribute, value) => {
    return `${value && value !== " " && attribute.prefix ? attribute.prefix : ""}${value ? value?.toString() : ""}${value && value !== " " && attribute.unit ? `${attribute.unit}` : ""}`;
  };

  const renderTags = (tags) => {
    return (
      <Grid
        templateColumns={templateColumnsForFeaturesTag}
        rowGap={2}
        columnGap={2}
        // ml={props?.isFullPage && attributeMarginLeft}
      >
        {tags.map((attribute) => (
          <GridItem key={attribute.attribute}>
            {renderCompareByType(attribute)}
            <FeatureTag
              label={attribute.label}
              value={props.itemInfo[attribute.attribute]}
              detail={
                attribute?.detail && props.itemInfo[attribute?.detail]
                  ? props.itemInfo[attribute?.detail]
                  : undefined
              }
            />
          </GridItem>
        ))}
      </Grid>
    );
  };

  const renderAttributes = (sectionKey, section) => {
    const tags = section.attributes.filter(
      (attribute) =>
        attribute.type === "tag" && attribute.isFilterOnly !== true,
    );
    const kvs = section.attributes.filter((attribute) => {
      if (attribute.type === "tag") return false;
      if (attribute.hideIfEmpty && !props.itemInfo[attribute.attribute])
        return false;
      if (!props.isFullPage && !props.isComparePage)
        return !attribute.hideOnListPage;
      return true;
    });

    return (
      <Box>
        <Box>{renderTags(tags)}</Box>
        {tags?.length > 0 && kvs?.length > 0 && <Box mt={".5rem"} />}
        <ItemKeyValueAttributes
          kvs={kvs}
          itemInfo={props.itemInfo}
          compareWithItemInfo={props.compareWithItemInfo}
          isFullPage={props?.isFullPage}
        />
      </Box>
    );
  };

  const renderSectionTitle = (section) => {
    const Icon = section.icon;
    return (
      <>
        <Center
          as="span"
          flex="1"
          textAlign="left"
          fontWeight={"bold"}
          // color="var(--appColorDarkerGrey)"
          color="var(--appColorAccent)"
          // textTransform={"uppercase"}
          // letterSpacing={"1.5px"}
          fontSize={"lg"}
          mb="1rem"
        >
          <HStack mb={1} borderRadius={3} alignItems="center">
            {Icon && (
              <Icon
                // fontSize={"2xl"}
                opacity=".7"
              />
            )}
            <Box
              fontWeight={"bold"}
              as={props.isFullPage ? "h2" : "h3"}
              fontFamily={"var(--font-roboto-mono), Arial, sans-serif"}
              // fontFamily={"Newsreader Variable, Georgia, serif"}
            >
              {section.label}
            </Box>
          </HStack>
        </Center>
        {/* <Separator borderColor="var(--appBorderColor)" mb="1rem"/> */}
      </>
    );
  };

  return (
    <>
      {/* <ItemCard> */}
      {/* {props?.withTitle && (
        <Box textAlign="center" fontWeight={"bold"} as="h1" fontSize={"xl"}>
          <Box as="span">{props?.itemInfo?.brand}</Box>
          <Box as="span"> {props?.itemInfo?.name}</Box>
          <Separator my="1rem"></Separator>
        </Box>
      )} */}
      {Object.entries(sections).map(([sectionKey, section]) => (
        <ItemCard
          key={sectionKey}
          borderTop={0}
          borderBottom={0}
          p={"2rem"}
          // pl={"1rem"}
          // pb=".5rem"
          pt="1.4rem"
        >
          <Box>{renderSectionTitle(section)}</Box>
          <Box pb={4} pt={1}>
            {props.itemInfo && renderAttributes(sectionKey, section)}
          </Box>
        </ItemCard>
      ))}

      {props.itemInfo && props.clickable && (
        <Flex alignItems={"stretch"}>
          <Flex
            flexWrap={"wrap"}
            // position="absolute"
            bottom="0.6rem"
            pb={0}
            mb={0}
            px="1rem"
          >
            <Box
              color="var(--appColorAccent)"
              display={"inline"}
              // fontSize={".9rem"}
            >
              <AppLink href={`/e-readers/${props.itemInfo.id}`}>
                <HStack
                  gap={1}
                  _hover={{ color: "var(--foreground)" }}
                  textDecor={"underline"}
                  fontWeight={"600"}
                >
                  <Box>More details</Box>
                </HStack>
              </AppLink>
            </Box>
          </Flex>
        </Flex>
      )}
      {/* </ItemCard> */}
    </>
  );
}
