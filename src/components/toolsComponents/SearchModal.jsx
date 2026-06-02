import { Steps, Box, Center, useDisclosure, Dialog, Portal } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Search from "../appHeader/Search";
import { getHandheldThumbnailImageUrl } from "@/app/lib/globalFuncs";

export default function SearchModal(props) {
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.isModalOpen) onOpen();
    else onClose();
  }, [JSON.stringify(props.isModalOpen)]);
  return (
    <Dialog.Root
      open={open}
      // isCentered
      size={{ md: "2xl", base: "lg" }}
      mx="1rem"
      onOpenChange={e => {
        if (!e.open) {
          props.setIsModalOpen(false);
        }
      }}
    >
      <Portal>

        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content pb={0}>
            <Dialog.CloseTrigger autoFocus={false} />
            <Dialog.Header>
              <Center>{props.text}</Center>
            </Dialog.Header>
            <Dialog.Body>
              <Box>
                <Search
                  searchList={{
                    unsorted: props.searchList?.unsorted?.filter(
                      (row) => !props.excludeFromSearch?.includes(row.id),
                    ),
                    alphabetical: props.searchList?.alphabetical?.filter(
                      (row) => !props.excludeFromSearch?.includes(row.id),
                    ),
                  }}
                  disableClick
                  resetAfterSelect={props.resetAfterSelect}
                  onSelect={async (selectId) => {
                    props.onSelect(selectId);
                    props.setIsModalOpen(false);
                  }}
                  initialPlaceholder={props.initialPlaceholder ?? "Search"}
                  isSearchActive
                  noSpecialType={props.noSpecialType}
                  getThumbnailImageUrl={(e) => {
                    if (props.getThumbnailImageUrl)
                      return props.getThumbnailImageUrl(e);
                    else return getHandheldThumbnailImageUrl(e);
                  }}
                  thumbnailWidth={props.thumbnailWidth}
                  thumbnailHeight={props.thumbnailHeight}
                  autoFocus={props?.autoFocus}
                  // borderColor="var(--appColorDarkGrey)!important"
                ></Search>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
}
