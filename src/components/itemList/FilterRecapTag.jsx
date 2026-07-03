"use client";
import { Steps, Box, Flex } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";
import { Tag, TagLabel } from "@chakra-ui/react";
import IconsWrapper from "./IconsWrapper";
import { Spinner } from "@chakra-ui/react";

export default function FilterRecapTag(props) {
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  const isLoading = (hasClickedEdit && isPendingEdit) || (hasClickedEdit && isPendingDelete);

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
        variant={props.filter.doNotRender && "unstyled"}
        _hover={
          !props.filter.doNotRender && { filter: "brightness(90%)" }
        }
        cursor={!props.filter.doNotRender && "pointer"}
        fontSize={"11px"}
        userSelect={"none"}
        opacity={isLoading ? 0.3 : 1}
      >
        <Tag.Label>
          <Flex>
            <Flex
              onClick={() => {
                if (props.filter.doNotRender) return;
                setHasClickedEdit(true);
                startTransitionEdit(() => {
                  props.onTileClick([props.filter.key]);
                });
              }}
              pt="1px"
            >
              <IconsWrapper
                icon={props.filter.icon ? props.filter.icon : "fa-tag"}
              ></IconsWrapper>
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
                    <span>{`: ${props.filter.value}`}</span>
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
              pt="1px"
            >
              <IconsWrapper
                color="var(--appColorLightGrey)"
                icon="fa-xmark"
                cursor={"pointer"}
              ></IconsWrapper>
            </Box>
          </Flex>
        </Tag.Label>
      </Tag.Root>
    </Flex>
  );
}
