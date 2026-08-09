import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Separator,
  Stack,
} from "@chakra-ui/react";
import React from "react";

import jipsony from "@/resources/images/Jipsony.webp";
import kofiIcon from "@/resources/images/kofi_symbol.webp";
import AppLink from "../toolsComponents/AppLink";
import { FaEnvelope, FaHeart, FaRegCopyright } from "react-icons/fa6";
import { layoutPaddingX } from "@/lib/sizes";
export default function AppFooter() {
  const renderFooterLink = (link, content) => {
    return (
      <AppLink
        // display="inline"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {content}
      </AppLink>
    );
  };
  return (
    <Box
      fontSize={"12px"}
      height={"100%"}
      width={{ base: "100%", lg: "auto" }}
      //   backgroundColor={"var(--appColorAccent)!important"}
      alignItems={"center"}
      id={"appFooter"}
    //   color="var(--appColorDarkerGrey)"
      maxHeight="6rem"
      color="var(--appColorDarkerGrey)"
      opacity={.8}
    >
      <Separator borderColor="var(--appBorderColor)"></Separator>
      <Grid
      px={layoutPaddingX}
        py={{ base: ".2rem", md: ".5rem" }}
        // width={"100%"}
        // height={"100%"}
        templateColumns={"1fr 1fr"}
        // alignItems={"center"}
      >
        <GridItem>
          <HStack>
            <Stack gap={0}>
              <Box _hover={{ opacity: 0.8 }}>
                <AppLink href="/">E-READER CATALOG</AppLink>
              </Box>
              <HStack gap={"0.2rem"} 
              >
                <Box as="span">Contact: </Box>
                <a
                  href={"mailto:jipsony@retrocatalog.com"}
                  aria-label="Send email to site owner"
                >
                  <Box _hover={{ opacity: 0.8 }}>
                    <FaEnvelope></FaEnvelope>
                  </Box>
                </a>
              </HStack>

              {/* <Flex opacity={".7"} gap={"0.2rem"}>
                <FaRegCopyright></FaRegCopyright>
                <Box>{new Date().getFullYear()}. All rights reserved.</Box>
              </Flex> */}
              {/* <HStack opacity={".7"}>
                <Box> {renderInternalLink("About", "/articles/about")} </Box>
                <Box>{" | "}</Box>{" "}
                <Box>
                  {" "}
                  {renderInternalLink("Policies", "/articles/policies")}
                </Box>
              </HStack> */}
            </Stack>
          </HStack>
        </GridItem>
        <GridItem
          alignSelf={"flex-start"}
          justifySelf={"flex-end"}
          textAlign={"end"}
          // color={"#0000009c"}
        >
          <HStack justifyContent={"flex-end"} fontStyle={"italic"}>
            {/* <Box>Made</Box> */}
            <Box>{`Made with `}</Box>
            <FaHeart></FaHeart>
            <Box>{`by Jipsony`}</Box>
            <Image
              mt={"-4px"}
              alt="Jipsony"
              src={jipsony.src}
              height={"16px"}
              borderRadius={"20%"}
            />
          </HStack>
          <HStack
            justifyContent={"flex-end"}
            mr={"-4px"}
          >
            {/* <Box display={{ base: "none", md: "inline" }}> */}
            <Box>Support the project: </Box>
            {renderFooterLink(
              "https://ko-fi.com/jipsony",
              <Image
                alt="Support the project on ko-fi"
                src={kofiIcon.src}
                height={"16px"}
                borderRadius={"20%"}
                _hover={{ opacity: 0.8 }}

                // mr={"-3px"}
              />,
            )}
          </HStack>
          {/* <HStack justifyContent={"flex-end"}>
            <Box>Contact: </Box>
            <a
              href={"mailto:jipsony@retrocatalog.com"}
              aria-label="Send email to site owner"
            >

            </a>
            <Box>{" | "}</Box>
            {renderFooterLink(
              "https://www.instagram.com/retro.catalog/",
              <Box _hover={{ opacity: 0.8 }} aria-label="Visit our Instagram page">
                <IconsWrapper
                  color={"white"}
                  size={"lg"}
                  icon={"fa-brands fa-instagram"}
                ></IconsWrapper>
              </Box>
            )}
          </HStack> */}
        </GridItem>
      </Grid>

      {/* <Center >

      </Center> */}
    </Box>
  );
}
