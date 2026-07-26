import { Box } from "@chakra-ui/react";
import React from "react";

export default function ItemScreenSpecsPreview(props) {
  return (
    <Box flexShrink={0} overflow="hidden" as="span">
      <Box as="span" title="Screen Size">
        {props?.itemInfo?.screenSize}&quot;
      </Box>{" "}
      &bull;{" "}
      <Box as="span" title="Aspect Ratio">
        {props?.itemInfo?.aspectRatio}
      </Box>
    </Box>
  );
}
