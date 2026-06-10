import React from "react";
import { Steps, Box, Menu, Portal } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa6";

export default function CompareReferencesSubMenu({
  label,
  filterKey,
  references,
  objectsToCompare,
}) {
  return (
    <Menu.Item>
      <Menu.Root
        positioning={{
          placement: "left-start",
        }}
      >
        <Menu.Trigger key={filterKey}>
          <Box as="span" mr=".6rem">
            {/* <IconsWrapper icon={"fa-chevron-left"} /> */}
            <FaChevronLeft></FaChevronLeft>
          </Box>
          {label}
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup
                value={
                  references
                    .filter(
                      (menuRow) =>
                        menuRow[filterKey] &&
                        objectsToCompare?.findIndex(
                          (otcRow) => otcRow.id === menuRow.id,
                        ) >= 0,
                    )
                    ?.map((row) => row.id) ?? []
                }
              ></Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Menu.Item>
  );
}
