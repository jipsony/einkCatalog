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
import { headerHeight } from "@/lib/sizes";

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
      backgroundColor={"var(--appColorAccent)"}
    >
      <Center
        pt={1}
        pb={1}
        m={0}
        height={headerHeight}
        width={{ base: "100%", lg: "100%" }}
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

          <HStack flexGrow={1} justifyContent={"flex-end"} userSelect={"none"}>
            {/* <AppHeaderSearch searchList={props.searchList}></AppHeaderSearch> */}

            <AppNavigationMenu />
            <HStack display={{ base: "none", lg: "flex" }} height={"100%"}>
              <AppHeaderLinks />
              {/* <AppHeaderAccountButton></AppHeaderAccountButton> */}

              <Box mr={{ lg: "1.5rem" }}>
                {" "}
                <AppHeaderColorMode />
              </Box>
            </HStack>
          </HStack>
        </Flex>
      </Center>
    </Flex>
  );
}
