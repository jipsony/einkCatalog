"use client";
import { React } from "react";
import {
  useDisclosure,
  Drawer,
  Stack,
  Box,
  Portal,
  Icon,
} from "@chakra-ui/react";
import AppHeaderLinks from "./AppHeaderLinks";
import { LuMenu } from "react-icons/lu";
export default function AppNavigationMenu(props) {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        pl={"1rem"}
        display={{ base: "flex", lg: "none" }}
        variant="ghost"
        borderWidth={0}
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Icon boxSize="1.8rem" className="appHeaderLink" asChild>
          <LuMenu />
        </Icon>
      </Box>
      <Drawer.Root
        open={open}
        placement="end"
        onOpenChange={(e) => {
          if (!e.open) {
            onClose();
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.CloseTrigger />
              </Drawer.Header>
              <Drawer.Body>
                <Stack size="md" variant="outline">
                  <AppHeaderLinks closeHeaderDrawer={() => onClose()} />
                </Stack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
