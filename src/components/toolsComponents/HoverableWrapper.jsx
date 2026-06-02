import { Steps, Box } from "@chakra-ui/react";
import React from "react";

export default function HoverableWrapper (props) {
    return <Box _hover={{color:"var(--appColorAccentDark)"}} cursor={"pointer"}>{props.children}</Box>
}