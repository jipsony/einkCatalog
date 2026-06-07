import React from "react";

import { Box } from "@chakra-ui/react";

export default function AppLogo(props) {
  return (
    <Box
      fontWeight={"bold"}
      className="appHeaderLink"
      fontSize={"20px"}
    >
      E-INK CATALOG
    </Box>
  );
}


{/* <HStack fontWeight={"bold"} className="appHeaderLink" fontSize={"20px"}>
      <Image
        src={logoLight?.src}
        alt="E Ink Catalog logo"
        width={"16px"}
        // height={10}
      />
      E-INK CATALOG
    </HStack> */}
