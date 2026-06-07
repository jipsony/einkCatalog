import React from "react";
import { Box } from "@chakra-ui/react";

export default function ItemCard({ children , ...props }) {
  return (
    <Box
      border="1px solid"
      borderColor="var(--appBorderColor)"
      backgroundColor={"var(--appColorCardBackground)"}
      borderRadius={"4px"}
      p="1rem"
      my="1rem"
      w="100%"
      boxShadow="sm"

      {...props}
    >
      {children}
    </Box>
  );
}
