"use client";
import { useColorMode } from "../ui/color-mode";
import { Center, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function AppHeaderColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lightModeRender = (
    <Icon
      boxSize={"1.5rem"}
      // mt={{ base: "0", lg: "2px" }}
      asChild
    >
      <LuSun />
    </Icon>
  );
  return (
    <Center
      height={"100%"}
      cursor={"pointer"}
      onClick={toggleColorMode}
      // color={{ base: "white", lg: "black" }}
      // _dark={{ color: "white" }}
      className="appHeaderLink"
    >
      {mounted ? (
        colorMode === "light" ? (
          lightModeRender
        ) : (
          <Icon boxSize="1.4rem" asChild>
            <LuMoon />
          </Icon>
        )
      ) : (
        lightModeRender
      )}
    </Center>
  );
}
