"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { compareBool, compareColor } from "@/lib/compare/compare";
import { attributeMarginLeft } from "@/lib/sizes";
import CompareKeyValueIcon from "@/app/e-readers/compare/CompareKeyValueIcon";
import CompareTagIcon from "@/app/e-readers/compare/CompareTagIcon";

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
    <Box as="dl" m={0} divideY={"1px"} divideStyle="dashed">
      {props.kvs.map((attribute, idx) => {
        const value = props.itemInfo[attribute.attribute];
        return (
          <Flex
            alignItems="baseline"
            key={`${idx}KV`}
            ml={props?.isFullPage && attributeMarginLeft}
            pt="6px"
            //
          >
            {renderCompareByType(attribute)}
            <Box
              as="dt"
              fontWeight="600"
              w={{ md: "40%" }}
              //   minWidth={{sm:}}
            >
              {attribute.label}
            </Box>
            <Box
              as="dd"
              m={0}
              flex="1"
              textAlign={
                props?.isFullPage ? { base: "right", lg: "left" } : "right"
              }
            >
              {renderValue(attribute, value)}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}
