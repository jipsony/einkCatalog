"use client";
import { React, useTransition } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import IconsWrapper from "./IconsWrapper";
import { sortOptions } from "@/app/lib/sorting";
import { Steps, Menu, Button, Box, Portal } from "@chakra-ui/react";

export default function Sorting(props) {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateUrlWithSorting = (sortKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("sorting", sortKey);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {props.displayReady && (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant={"outline"}
              bgColor={"var(--appColorCardBackground)"}
              color={"var(--appColorCardBackgroundInvert)"}
              className="hoverFloat hoverColor"
              borderColor={"var(--appColorDarkGrey)"}
              borderBottomWidth={props.showBorderBottom ? "0.4rem" : undefined}
              width={"100%"}
              loading={isPending}
            >
              <IconsWrapper
                icon="fa-arrow-down-wide-short"
                style={{ width: "2rem" }}
              ></IconsWrapper>
              Sort
              {props.showSelectedInButton && (
                <Box style={{ display: "inline" }}>{` (${
                  sortOptions[props.selectedSorting]?.label
                })`}</Box>
              )}
            </Button>
          </Menu.Trigger>
          {/* <Menu.ItemGroup> */}
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {Object.entries(sortOptions).map(([sortKey, sort], idx) => {
                  return (
                    <Menu.Item
                      key={sortKey}
                      onSelect={() => {
                        startTransition(() => {
                          updateUrlWithSorting(sortKey);
                          props.handleSortingChange(sortKey);
                        });
                      }}
                      backgroundColor={
                        props.selectedSorting === sortKey
                          ? "var(--appColorAccent)"
                          : undefined
                      }
                      value={sortKey}
                      // value="item-0"
                    >
                      {sort.label + " - " + sort.labelChoice + " first"}
                    </Menu.Item>
                  );
                })}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
          {/* </Menu.ItemGroup> */}
        </Menu.Root>
      )}
    </>
  );
}
