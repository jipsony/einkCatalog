"use client";
import { React, useTransition } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { sortOptions } from "@/lib/sorting";
import { Menu, Button, Box, Portal } from "@chakra-ui/react";

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
              borderColor={"var(--appColorDarkGrey)"}
              width={"100%"}
              loading={isPending}
            >
              <FaArrowDownWideShort />
              Sort
              {props.showSelectedInButton && (
                <Box style={{ display: "inline" }}>{` (${
                  sortOptions[props.selectedSorting]?.label
                })`}</Box>
              )}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="var(--reference-width)">
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
                          ? "var(--appColorAccentLight)"
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
