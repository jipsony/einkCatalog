import React from "react";
import { Steps, Heading, Card, Center, Box, HStack, Text } from "@chakra-ui/react";
import { navigate } from "@/app/navigate";
import { getNameWithoutCompany } from "@/app/lib/globalFuncs";
import IconsWrapper from "../toolsComponents/IconsWrapper";
import Link from "next/link";
import AppLink from "../toolsComponents/AppLink";

export default function HandheldTitleCard(props) {
  const renderTitleWithCompany = () => {
    const name = getNameWithoutCompany(props.handheldInfo);
    return (
      <Box as={props.isFullPage ? "h1" : "h2"}>
        {props.handheldInfo?.company &&
          props.handheldInfo.company !== "Unknown" &&
          props.handheldInfo.company !== "" && (
            <Heading
              color={"var(--appColorDarkGrey)"}
              fontSize={"1.5em"}
              cursor={"pointer"}
              _hover={{ color: "var(--appColorAccent)" }}
              as={"span"}
            >
              <AppLink href={`/companies/${props.handheldInfo.company}`}>
                {props.handheldInfo.company}
              </AppLink>
            </Heading>
          )}{" "}
        {props.clickable ? (
          <Heading
            fontSize={"1.5em"}
            cursor={"pointer"}
              _hover={{ color: "var(--appColorAccent)" }}
            as={"span"}
          >
            <AppLink href={"/retro-handhelds/" + props.handheldInfo?.id}>
              {name}
            </AppLink>
          </Heading>
        ) : (
          <Heading fontSize={"1.5em"} as={"span"}>
            {name}
          </Heading>
        )}
      </Box>
    );
  };

  const renderActionButton = () => {
    if (props?.actionButton?.render) {
      return (
        <Box height={"100%"} ml="auto">
          {props?.actionButton?.render()}
        </Box>
      );
    }
    return (
      <Box
        ml="auto"
        color={props.actionButton.color}
        height={"100%"}
        cursor={"pointer"}
        onClick={props.actionButton.onClick}
        _hover={props.actionButton._hover}
      >
        <IconsWrapper icon={props.actionButton.icon} size="xl" />
      </Box>
    );
  };
  return (
    <Card.Root
      alignSelf="stretch"
      minH="3.5em"
      variant="outline"
      borderBottomWidth="0.4rem"
      borderColor={props.borderColor}
    >
      <Card.Body p="0.8em">
        <HStack justify="space-between" align="center" w="100%">
          <Center flex="1" id="title">
            {renderTitleWithCompany() ?? <Box />}
          </Center>
          {props.actionButton && renderActionButton()}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
