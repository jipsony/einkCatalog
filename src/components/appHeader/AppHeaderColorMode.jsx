"use client";
import { useColorMode } from "../ui/color-mode";
import { Center, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuMoon, LuSun } from 'react-icons/lu';

export default function AppHeaderColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Center
      height={"100%"}
      cursor={"pointer"}
      onClick={toggleColorMode}
      color={{ base: "white", lg: "black" }}
      _dark={{ color: "white" }}
      className="appHeaderLink"
    >
      {mounted ? (colorMode === "light" ? ( 
        <Icon
          boxSize={{ base: "2rem", lg: "1.6rem" }}
          mt={{ base: "0", lg: "2px" }}
          asChild><LuSun /></Icon>
      ) : (
        <Icon boxSize={{ base: "1.7rem", lg: "1.4rem" }} asChild><LuMoon /></Icon>
      )) : (
        <Icon boxSize={{ base: "2rem", lg: "1.6rem" }} mt={{ base: "0", lg: "2px" }} visibility="hidden" asChild><LuSun /></Icon>
      )}
    </Center>
  );
}
