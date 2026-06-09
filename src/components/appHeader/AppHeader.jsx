import { React } from "react";
import { Image, Flex, HStack, Center, Box } from "@chakra-ui/react";

import AppNavigationMenu from "./AppNavigationMenu";
import AppHeaderLinks from "./AppHeaderLinks";
// import appLogo from "@/resources/images/appLogo/appLogo.webp";
// import appLogoText from "@/resources/images/appLogo/appLogoText.webp";
// import AppHeaderAccountButton from "./AppHeaderAccountButton";
// import AppHeaderSearch from "./AppHeaderSearch";
import AppHeaderColorMode from "./AppHeaderColorMode";
import AppLink from "../toolsComponents/AppLink";
import { headerHeight, layoutPaddingX } from "@/lib/sizes";
import AppHeaderSearch from "./AppHeaderSearch";

export default function AppHeader(props) {
  return (
    <Flex
      position={"sticky"}
      top={0}
      justifyContent={"center"}
      zIndex={1100}
      m={0}
      p={0}
      width={{ base: "100%", lg: "auto" }}
      backgroundColor={"var(--background)"}
    >
      <Center
        pt={1}
        pb={1}
        m={0}
        height={headerHeight}
        width={"100%"}
        px={layoutPaddingX}
        // pl={"1rem"}
      >
        <Flex width={"100%"} justifyContent={"space-between"} p={0}>
          <AppLink href="/" style={{ alignSelf: "center" }}>
            <HStack gap={0}>
              {props.logoComponent}
              {/* <Image
                alt="Retro Handhelds logo - Image"
                pl={{ lg: ".5rem" }}
                src={appLogo.src}
                height={"3.8rem"}
                _dark={{ filter: "hue-rotate(320deg)" }}
              />
              <Image
                alt="Retro Handhelds logo Text"
                pl={{ base: "3rem", lg: "3.4rem" }}
                mt={".3rem"}
                ml={".4rem"}
                src={appLogoText.src}
                height={"3.6rem"}
                position={"absolute"}
                _dark={{ filter: "hue-rotate(320deg)" }}
              /> */}
            </HStack>
          </AppLink>

          <HStack
            flexGrow={1}
            justifyContent= "flex-end"
            userSelect={"none"}
            gap="1rem"
            // {{base:, lg:".5rem"}}
          >
            <Box display={{ base: "block", lg: "none" }} order={4}>
              <AppNavigationMenu />
            </Box>
            <Box display={{ base: "none", lg: "block" }} order={1}>
              <AppHeaderLinks />
            </Box>
            <Box order={2}>
              <AppHeaderSearch></AppHeaderSearch>
            </Box>

            {/* <AppHeaderAccountButton></AppHeaderAccountButton> */}

            <Box order={3}>
              <AppHeaderColorMode />
            </Box>
          </HStack>
        </Flex>
      </Center>
    </Flex>
  );
}
