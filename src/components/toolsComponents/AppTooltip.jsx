"use client";;
import React from "react";

import { Steps, Box, useDisclosure } from "@chakra-ui/react";

import { Tooltip } from '@/components/ui/tooltip';

export default function AppTooltip(props) {
  const { open, onOpen, onToggle, onClose } = useDisclosure();

  const onOpenMouse = (event) => {
    if (
      !props.isDisabled &&
      !event?.nativeEvent?.sourceCapabilities?.firesTouchEvents
    ) {
      return onOpen(event);
    }
  };
  return (
    <Tooltip
      isOpen={open}
      disabled={props.isDisabled}
      content={props.label}
      showArrow
      fontSize="md"
      positioning={{
        placement: "top"
      }}
    >
      <Box
        display="block"
        onMouseEnter={onOpenMouse}
        onMouseLeave={onClose}
        onClick={onToggle}
      >
        {props.content}
      </Box>
    </Tooltip>
  );
}
