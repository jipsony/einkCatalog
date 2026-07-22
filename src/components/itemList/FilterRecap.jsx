"use client";
import { Box, Flex, Separator, Spinner, Tag } from "@chakra-ui/react";
import React, { useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import FilterRecapTag from "./FilterRecapTag";

export default function FilterRecap(props) {
  const [isPendingPlus, startTransitionPlus] = useTransition();
  return (
    <>
      {/* <Separator borderColor="var(--appBorderColor)" mb="1rem"/> */}
      <Flex
        alignItems="center"
        flexWrap="wrap"
        rowGap="2"
        columnGap="2"
        //   fontSize="11px"
        fontWeight="bold"
      >
        <Box>Active Filters:</Box>
        {props.filters
          .sort((a, b) => a.index - b.index)
          .map(
            (filter) =>
              filter.active &&
              !!filter.value && (
                <FilterRecapTag
                  key={filter.key}
                  filter={filter}
                  onTileClick={props.onTileClick}
                  onDeleteTileClick={props.onDeleteTileClick}
                />
              ),
          )}
        <Flex position="relative" alignSelf={"stretch"}>
          <Tag.Root
            cursor={"pointer"}
            fontSize={"11px"}
            userSelect={"none"}
            opacity={isPendingPlus ? 0.3 : 1}
            as="a"
            fontFamily="var(--font-roboto-mono)"
            fontWeight={"bold"}
            letterSpacing="0.04em"
            borderRadius="20px"
            border="1px solid"
            color={"var(--appColorAccent)"}
            borderColor="var(--appColorAccent)"
            _hover={{
              borderColor: "var(--foreground)",
              color: "var(--foreground)",
            }}
            py="4px"
            px="10px"
            onClick={() => {
              startTransitionPlus(() => {
                props.onPlusClick(true);
              });
            }}
          >
            <Tag.Label>
              {isPendingPlus ? <Spinner size="xs" /> : <FaPlus />}
            </Tag.Label>
          </Tag.Root>
        </Flex>
      </Flex>

      {/* <Separator borderColor="var(--appBorderColor)" mt="1rem" mb="1rem" /> */}
    </>
  );
}
