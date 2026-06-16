import React from "react";
import { Icon, Menu, Portal } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa6";

export default function CompareReferencesSubMenu(props) {
  const filteredReferences =
    props.references?.filter((menuRow) => menuRow[props.filterKey]) ?? [];

  const selectedReferenceIds =
    filteredReferences
      .filter(
        (menuRow) =>
          props.objectsToCompare?.findIndex(
            (otcRow) => otcRow.id === menuRow.id,
          ) >= 0,
      )
      .map((row) => row.id) ?? [];

  return (
    <Menu.Root
      positioning={{
        placement: "left",
        gutter: 2,
      }}
    >
      <Menu.TriggerItem>
        <Icon asChild ml="1.5rem">
          <FaChevronLeft />
        </Icon>
        {props.label}
      </Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup value={selectedReferenceIds}>
              {filteredReferences.map((menuRow) => {
                return (
                  <Menu.CheckboxItem
                    key={menuRow.id}
                    value={menuRow.id}
                    checked={selectedReferenceIds.includes(menuRow.id)}
                    onCheckedChange={() => props.onSelectReference?.(menuRow.id)}
                  >
                    {menuRow.name}
                    <Menu.ItemIndicator />
                  </Menu.CheckboxItem>
                );
              })}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
