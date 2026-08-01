import React from "react";
import { Box } from "@chakra-ui/react";
import FrontPage from "./FrontPage";

export const metadata = {
  title: "E-Reader Catalog",
  description: "Browse and compare e-reader features and specifications"
};

export default function Home() {
  return <FrontPage></FrontPage>;
}
