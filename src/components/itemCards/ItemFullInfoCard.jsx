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
} from "@chakra-ui/react";
import FeatureTag from "../toolsComponents/FeatureTag";
import sections from "@/resources/sections";
import CompareKeyValueIcon from "../compare/CompareKeyValueIcon";
import CompareTagIcon from "../compare/CompareTagIcon";
import AppLink from "../toolsComponents/AppLink";
import { compareBool, compareColor } from "@/lib/compare/compare";
import ItemCard from "./ItemCard";
import ItemKeyValueAttributes from "./ItemKeyValueAttributes";

export default function ItemFullInfoCard(props) {
  const featureTagTemplateColumn = props.isFullPage
    ? { xl: "repeat(4,1fr)", lg: "repeat(3, 1fr)", base: "repeat(2, 1fr)" }
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
      <Grid templateColumns={featureTagTemplateColumn} rowGap={1} columnGap={2}>
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
        <Box pl={5}>{renderTags(tags)}</Box>
        {tags?.length > 0 && kvs?.length > 0 && <Box mt={".5rem"} />}
        <ItemKeyValueAttributes
          kvs={kvs}
          itemInfo={props.itemInfo}
          compareWithItemInfo={props.compareWithItemInfo}
        />
      </Box>
    );
  };

  const renderSectionTitle = (section) => {
    const Icon = section.icon;
    return (
      <>
        {Icon && (
          <Icon
            size="18"
            style={{ flexShrink: 0 }}
            color="var(--appColorDarkGrey)"
          />
        )}
        <Heading
          as={props.isFullPage ? "h2" : "h3"}
          fontSize={"lg"}
          fontFamily={"var(--font-roboto-mono), Arial, sans-serif"}
        >
          {section.label}
        </Heading>

        <Box
          ml="1rem"
          flex="1"
          borderTopWidth="1px"
          borderRadius={"4px"}
          borderColor={"var(--appBorderColor)"}
          position="relative"
          alignSelf="center"
          opacity={0.6}
        ></Box>
      </>
    );
  };

  return (
    <ItemCard>
      {Object.entries(sections).map(([sectionKey, section]) => (
        <Box
          key={sectionKey}
          borderTop={0}
          borderBottom={0}
          pr={"1rem"}
          pl={"1rem"}
          pb=".5rem"
        >
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            <HStack ml={"-0.4em"} p={1} mb={1} borderRadius={3}>
              {renderSectionTitle(section)}
            </HStack>
          </Box>
          <Box pb={4} pt={1}>
            {props.itemInfo && renderAttributes(sectionKey, section)}
          </Box>
        </Box>
      ))}

      {props.itemInfo && props.clickable && (
        <Flex alignItems={"stretch"}>
          <Flex
            flexWrap={"wrap"}
            position="absolute"
            bottom="0.6rem"
            pb={0}
            mb={0}
          >
            <Box
              color="var(--appColorLinkBlue)"
              display={"inline"}
              fontSize={".9rem"}
            >
              <AppLink href={`/e-readers/${props.itemInfo.id}`}>
                <HStack
                  gap={1}
                  _hover={{ color: "var(--appColorText)" }}
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
    </ItemCard>
  );
}
