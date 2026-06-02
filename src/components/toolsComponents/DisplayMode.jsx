"use client";
import { React, useEffect, useState, useTransition } from "react";

import { Steps, Button, Box, Menu, Portal } from "@chakra-ui/react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import IconsWrapper from "./IconsWrapper";

export default function DisplayMode(props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const updateUrlWithDisplayMode = (displayModeKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("displayMode", displayModeKey);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {props.displayReady && (
        <Menu.Root>
          <Menu.Trigger asChild><Button
              variant={"outline"}
              bgColor={"var(--appColorCardBackground)"}
              color={"var(--appColorCardBackgroundInvert)"}
              className="hoverFloat hoverColor"
              borderColor={"var(--appColorDarkGrey)"}
              borderBottomWidth={props.showBorderBottom ? "0.4rem" : undefined}
              width={"100%"}
              loading={isPending}>
              <IconsWrapper
                icon={"fa-list"}
                style={{ width: "2rem" }}
              ></IconsWrapper>Layout
                          {props.showSelectedInButton && (
                <Box style={{ display: "inline" }}>{` (${
                  props.displayModeOptions[props.selectedDisplayMode]?.label
                })`}</Box>
              )}
            </Button></Menu.Trigger>
          <Menu.ItemGroup>
            <Portal><Menu.Positioner><Menu.Content>
                  {Object.entries(props.displayModeOptions).map(
                    ([displayModeKey, displayMode], idx) => {
                      return (
                        <Menu.Item
                          key={displayModeKey}
                          onSelect={() => {
                            startTransition(() => {
                              updateUrlWithDisplayMode(displayModeKey);
                              props.handleDisplayModeChange(displayModeKey);
                            });
                          }}
                          backgroundColor={
                            props.selectedDisplayMode === displayModeKey
                              ? "var(--appColorAccent)"
                              : undefined
                          }
                          value={displayModeKey}
                          >
                          {displayMode.label}
                        </Menu.Item>
                      );
                    }
                  )}
                </Menu.Content></Menu.Positioner></Portal>
          </Menu.ItemGroup>
        </Menu.Root>
      )}
    </>
  );
}
