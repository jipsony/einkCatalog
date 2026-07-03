"use client";
import { sizes } from "@/app/lib/sizes";
import { Steps, Box, Card, Flex, Spinner, useMediaQuery, Tag, TagLabel } from "@chakra-ui/react";
import React, { useTransition } from "react";
import IconsWrapper from "./IconsWrapper";
import FilterRecapTag from "./FilterRecapTag";

export default function FilterRecap(props) {
  const [isScreenSm] = useMediaQuery("(max-width: 767px)");
  const [isPendingPlus, startTransitionPlus] = useTransition();
  return (
    <Card.Root
      variant={"outline"}
      borderColor={"var(--appColorDarkGrey)!important"}
      height={"100%"}
      ml="1rem"
      mr="1rem"
      maxWidth={sizes.gridWidths}
    >
      <Card.Body
        fontWeight={"bold"}
        pt={isScreenSm ? ".5rem" : ".8rem"}
        pb={isScreenSm ? "1rem" : ".8rem"}
      >
        <Flex flexWrap={"wrap"} rowGap={"2"} columnGap={"2"}>
          <Box
            style={
              isScreenSm
                ? {
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : undefined
            }
          >
            Active Filters:{" "}
          </Box>
          {props.filters
            .sort((a, b) => {
              return a.index - b.index;
            })
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
                )
            )}
          <Tag.Root
            _hover={{ filter: "brightness(90%)" }}
            cursor={"pointer"}
            onClick={() => {
              startTransitionPlus(() => {
                props.onPlusClick(true);
              });
            }}
            fontSize={"11px"}
            userSelect={"none"}
          >
            <Tag.Label pt="1px">
              {isPendingPlus ? (
                <Spinner size="xs"></Spinner>
              ) : (
                <IconsWrapper icon={"fa-plus"}></IconsWrapper>
              )}
            </Tag.Label>
          </Tag.Root>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
