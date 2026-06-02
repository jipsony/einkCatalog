"use client";
import { React } from "react";

import { Steps, Box, Flex, Heading, Stack } from "@chakra-ui/react";
import AppLink from "../toolsComponents/AppLink";

export default function AppHeaderLinks(props) {
  const renderAppHeaderLink = (title, href, isNew) => {
    return (
      <AppLink href={href} >
        <Flex
          justifyContent={{ lg: "center" }}
          alignItems={{ lg: "center" }}
          pr={".5rem"}
          pl={".5rem"}
          mb={{ base: "1rem", lg: "auto" }}
          height={"100%"}
          onClick={() => {
            if (props.closeHeaderDrawer) props.closeHeaderDrawer();
          }}
        >
          <Heading as="span" fontWeight={"600"} fontSize={"16px"} className="appHeaderLink">
            {title}
          </Heading>
          {isNew && (
            <Box
              color="white"
              // boxShadow="md"
              fontWeight={600}
              px={2}
              py={0}
              letterSpacing="wide"
              borderRadius={"full"}
              fontSize={9}
              lineHeight={2}
              mb={{ lg: "1rem" }}
              ml="1"
            >
              New{" "}
            </Box>
          )}
        </Flex>
      </AppLink>
    );
  };

  return (
    <>
      <Stack direction={{ base: "column", lg: "row" }} height={"100%"}>
        {renderAppHeaderLink("E-Readers", "/e-readers")}
        {renderAppHeaderLink("Categories", "/e-readers/categories")}
        {renderAppHeaderLink("Compare", "/e-readers/compare")}
      </Stack>
    </>
  );
}
