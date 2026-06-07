import AppLink from "@/components/toolsComponents/AppLink";
import { items } from "@/lib/item/items";
import { Box, Stack } from "@chakra-ui/react";
import React from "react";

export default function FrontPage(props) {
  return (
    <Box>
      {items?.map((row) => (
        <Stack key={row?.id}>
          <AppLink key={row?.id} href={"/e-readers/" + row?.id}>
            {row?.brand}{" "}{row?.name}
          </AppLink>
        </Stack>
      ))}
    </Box>
  );
}
