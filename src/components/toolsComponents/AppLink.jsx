"use client";
import { Steps, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function AppLink({ children, ...props }) {
  if (props.href) {
    return (
      <Link {...props}>
        {children}
      </Link>
    );
  }
  return <Box {...props}>{children}</Box>;
}
