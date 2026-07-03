import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { allFeatures } from "@/resources/sections";

export default function ItemAttributeIcons(props) {
  const iconFeatures = allFeatures.filter(
    (f) => f.icon && props.itemInfo?.[f.attribute],
  );
  if (!iconFeatures.length) return null;
  return (
    <Flex gap="4px" alignItems="center" {...props}>
      {iconFeatures.map((f) => {
        const Icon = f.icon;
        return (
          <Box key={f.attribute} as="span" title={f.label} display="inline-flex">
            <Icon size={props?.size ?? 14} />
          </Box>
        );
      })}
    </Flex>
  );
}
