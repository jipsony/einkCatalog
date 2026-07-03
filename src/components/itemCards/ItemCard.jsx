import React from "react";
import { Box } from "@chakra-ui/react";

export default function ItemCard({ children, ...props }) {
  return (
    <Box
      border="1px solid"
      borderColor="var(--appBorderColor)"
      backgroundColor={"var(--appColorCardBackground)"}
      borderRadius={"4px"}
      p="1rem"
      mb="1rem"
      w="100%"
      boxShadow="sm"
      {...props}
      className="appTextFont"
    >
      {props?.paddedBackground ? (
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"var(--appColorLightGrey)"}
          borderRadius={"md"}
          position={"relative"}
          
        >
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
