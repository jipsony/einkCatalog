"use client";
import { Steps, Box, Flex } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";
import { Tag, TagLabel } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { LuTag, LuX } from "react-icons/lu";
import { itemMainRoute } from "@/lib/appGlobals";

export default function FilterRecapTag(props) {
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  const isLoading =
    (hasClickedEdit && isPendingEdit) || (hasClickedEdit && isPendingDelete);

  const FilterIcon = props.filter.icon || LuTag;
  const filterValue =
    props.filter.type === "slider" && Array.isArray(props.filter.value)
      ? `${props.filter.value[0]}${props.filter.unit ?? ""} - ${props.filter.value[1]}${props.filter.unit ?? ""}`
      : props.filter.value;

  return (
    <Flex position="relative">
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="none"
        >
          <Spinner size="xs" />
        </Box>
      )}
      <Tag.Root
        cursor={ "pointer"}
        fontSize={"11px"}
        userSelect={"none"}
        opacity={isLoading ? 0.3 : 1}
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
      >
        <Tag.Label >
          <Flex alignItems={"center"}>
            <Flex
              alignItems={"center"}
              onClick={() => {
                if (props.filter.doNotRender) return;
                setHasClickedEdit(true);
                startTransitionEdit(() => {
                  props.onTileClick([props.filter.key]);
                });
              }}
            >
              <FilterIcon />
              <Box pl={".5rem"} pr={".5rem"}>
                {props.filter.type === "checkbox" ? (
                  props.filter.label
                ) : (
                  <>
                    <b>
                      {props.filter.shortLabel
                        ? props.filter.shortLabel
                        : props.filter.label}
                    </b>
                    <span>{`: ${filterValue}`}</span>
                  </>
                )}
              </Box>
            </Flex>
            <Box
              cursor={"pointer"}
              onClick={() => {
                setHasClickedEdit(true);
                startTransitionDelete(() => {
                  props.onDeleteTileClick(props.filter);
                });
              }}
            >
              <LuX />
            </Box>
          </Flex>
        </Tag.Label>
      </Tag.Root>
    </Flex>
  );
}
