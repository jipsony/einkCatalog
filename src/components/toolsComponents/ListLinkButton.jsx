import { Steps, Box, Button } from "@chakra-ui/react";
import React from "react";
import IconsWrapper from "./IconsWrapper";

export default function ListLinkButton(props) {
  // (text, link, icon, isOutline
  return (
    <Box>
      <Button
        backgroundColor={
          props.isOutline
            ? "var(--appColorCardBackground)"
            : "var(--appColorAccentButton)"
        }
        // variant={props.isOutline && "outline"}
        borderColor={"var(--appColorDarkGrey)!important"}
        borderWidth={props.isOutline ? "1px" : 0}
        borderBottom={props.isOutline ? "4px" : 0}
        boxShadow="0 1px 4px rgba(0,0,0,0.1)"
        color={"var(--appColorCardBackgroundInvert)"}
        _hover={{
          backgroundColor: "var(--appColorAccentButtonHover)",
          // color=""
        }}
        fontSize={"15px"}
        minH={"2.5rem"}
        width={"100%"}
        aria-label={props.text}
        asChild
      >
        <a href={props.link}>
          {props.image && (
            <Box mr=".5rem" flexShrink={0}>
              <img
                src={props.image}
                alt=""
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
          {props.icon && !props.image && (
            <Box
              mr=".5rem"
              color={"var(--appColorText)"}
              _light={{ opacity: ".4" }}
              _dark={{ opacity: ".6" }}
            >
              <IconsWrapper icon={props.icon}></IconsWrapper>
            </Box>
          )}
          {props.text}
        </a>
      </Button>
    </Box>
  );
}
