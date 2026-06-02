import { Steps, Box } from "@chakra-ui/react";
import React from "react";
import IconsWrapper from "./IconsWrapper";

export default function CircularActionIcon(props) {
  return (
    <Box
      position={"relative"}
      zIndex={1}
      width="26px"
      height="26px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
      borderRadius="full"
      className="hoverGrow"
      cursor="pointer"
      textAlign="center"
      fontSize="15px"
      fontWeight={800}
      {...props}
      asChild><button
        onClick={() => {
          props.onClick();
        }}>
        <IconsWrapper icon={props.icon} />
      </button></Box>
  );
}
