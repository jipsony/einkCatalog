import { Steps, Flex, Heading, Text, Separator } from "@chakra-ui/react";
import React from "react";

export default function BigSectionTitle(props) {
  return (
    // <Flex px={{ base: ".4rem", lg: "0" }}>
    //   <Box
    //     fontSize={props.fontSize ?? "2rem"}
    //     //  fontWeight={"300"}
    //     style={{ textWrap: "nowrap" }}
    //     as="h2"
    //     // className="textDarkGrey"
    //   >
    //     {props.title}
    //   </Box>
    //   <Box
    //     width="100%"
    //     height="1px"
    //     bottom="0px"
    //     position="relative"
    //     alignSelf="center"
    //     marginLeft="2rem"
    //     className="backgroundDarkGrey"
    //   ></Box>
    // </Flex>

    <Flex
      mb=".8rem"
      textAlign="left"
      style={{ wordSpacing: "3px" }}
      fontWeight={"700"}
      color={"var(--appColorText)"}
      {...props}
      overflow={"hidden"}
      mawW="100%"
    >
      {props?.lineBefore && (
        <Separator
          mr="1rem"
          flex="1"
        opacity={.6}

          borderTopWidth="2px"
          borderRadius={"4px"}
          borderColor={"var(--appColorBlue)"}
          position="relative"
          alignSelf="center"
          display={Object.fromEntries(
            Object.entries(props?.lineBefore)?.map(([k, v]) => [
              k,
              v === true ? "block" : "none",
            ]),
          )}
        ></Separator>
      )}
      <Text
        position="relative"
        display="inline-block"
        style={{ textWrap: "nowrap" }}
        as={props?.as ?? "h2"}
        fontSize={props?.fontSize ?? { base: "1.6rem", lg: "1.9rem" }}
        pb="4px"
        flexShrink={0}
      >
        {props.title}
      </Text>
      <Separator
        ml="1rem"
        flex="1"
        borderTopWidth="2px"
        borderRadius={"4px"}
        borderColor={"var(--appColorBlue)"}
        position="relative"
        alignSelf="center"
        opacity={.6}
      ></Separator>
    </Flex>
  );
}
