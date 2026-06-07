"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import CompareKeyValueIcon from "../compare/CompareKeyValueIcon";
import CompareTagIcon from "../compare/CompareTagIcon";
import { compareBool, compareColor } from "@/lib/compare/compare";

export default function ItemKeyValueAttributes(props) {
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

  return (
    <Box as="dl" m={0}>
      {props.kvs.map((attribute, idx) => {
        const value = props.itemInfo[attribute.attribute];
        return (
          <Flex
            alignItems="baseline"
            key={`${idx}KV`}
            ml={6}
            pt="6px"
            borderBottom={
              idx < props.kvs.length - 1
                ? "1px solid var(--appColorDivider)"
                : null
            }
          >
            {renderCompareByType(attribute)}
            <Box as="dt" width="40%" flexShrink={0} fontWeight="600">
              {attribute.label}
            </Box>
            <Box as="dd" m={0} textAlign={{ base: "right", md: "left" }}>
              {renderValue(attribute, value)}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}
