"use client";
import React from "react";
import { useState, useEffect, useTransition } from "react";
import { Steps, Button, Box } from "@chakra-ui/react";
import IconsWrapper from "./IconsWrapper";

export default function FilterButton(props) {
  const [isPending, startTransitionFilter] = useTransition();

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        startTransitionFilter(() => {
          props.setIsLoadingFilter(true);
          props.setFiltersToOpenByDefault(null);
          props.setIsOpenFilters(true);
        });
      }}
      bgColor={"var(--appColorCardBackground)"}
      color={"var(--appColorCardBackgroundInvert)"}
      className="hoverFloat hoverColor borderDarkGrey"
      borderBottomWidth={"0.4rem"}
      width={"100%"}
      loading={isPending || props.isPendingFilter || props.isLoadingFilter}
    >
      <IconsWrapper icon="fa-sliders" style={{ width: "2rem" }}></IconsWrapper>Filter  
          </Button>
  );
}
