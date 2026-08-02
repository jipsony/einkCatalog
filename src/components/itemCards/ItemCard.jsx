import React from "react";
import { Box } from "@chakra-ui/react";

export default function ItemCard({ children, ...props }) {
  return (
    <Box
      // border={ "1px solid"}
      // borderColor="var(--appBorderColor)"
      _dark={{
        border: "1px solid",
        borderColor: "var(--appBorderColor)",
      }}
      border={"1px solid"}
      borderColor={"#00000000"}
      backgroundColor={"var(--appColorCardBackground)"}
      borderRadius={"4px"}
      p="1rem"
      mb="1rem"
      w="100%"
      boxShadow="sm"
      {...props}
      className="appTextFont"
      position={"relative"}
      display={"flex"}
      flexDir={"column"}
    >
      {props?.paddedBackground ? (
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"var(--appColorLightGrey)"}
          backgroundSize={"cover"}
          borderRadius={"md"}
          position={"relative"}
          height="100%"
          w="100%"
        >
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
