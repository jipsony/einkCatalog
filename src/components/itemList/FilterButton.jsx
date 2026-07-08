"use client";
import React from "react";
import { useTransition } from "react";
import { Button } from "@chakra-ui/react";
import { FaSliders } from "react-icons/fa6";

export default function FilterButton(props) {
  const [isPending, startTransitionFilter] = useTransition();

  return (
    <Button
      variant={"outline"}
      borderColor={"var(--appColorDarkGrey)"}
      onClick={() => {
        startTransitionFilter(() => {
          props.setIsLoadingFilter(true);
          props.setFiltersToOpenByDefault(null);
          props.setIsOpenFilters(true);
        });
      }}
      width={"100%"}
      // loading={isPending || props.isPendingFilter || props.isLoadingFilter}
    >
      <FaSliders />
      Filter
    </Button>
  );
}
