import {
  Steps,
  Box,
  useDisclosure,
  Dialog,
  Portal,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  constructGameCoverThumbnailUrl,
  getHandheldThumbnailImageUrl,
} from "@/app/lib/globalFuncs";
import CombinedSearchInput from "./CombinedSearchInput";
import CombinedSearchResults from "./CombinedSearchResults";
import handheldSearchList from "@/resources/def/searchList.json";
import { navigate } from "@/app/navigate";

export default function CombinedSearchModal(props) {
  const { open, onOpen, onClose } = useDisclosure();

  const [placeholder, setPlaceHolder] = useState(
    props.initialPlaceholder ?? "Search",
  );
  const [searchText, setSearchText] = useState("");

  const [keyEvent, setKeyEvent] = useState(null);

  const [isGamseSearchListImported, setIsGamesSearchListImported] =
    useState(false);

  const [gamesSearchList, setGamesSearchList] = useState(props.gamesSearchList);
  const importSearchList = async () => {
    const { default: gamesSearchList } =
      await import("@/resources/def/games/gamesSearchList.json");

    setGamesSearchList(gamesSearchList);
    setIsGamesSearchListImported(true);
  };
  useEffect(() => {
    if (!isGamseSearchListImported && !props.gamesSearchList) {
      importSearchList();
    }
  }, []);

  const tabs = [
    {
      id: "handhelds",
      label: "Handhelds",
      render: () => {
        return (
          <CombinedSearchResults
            searchText={searchText}
            searchList={handheldSearchList}
            getThumbnailImageUrl={(row) => getHandheldThumbnailImageUrl(row)}
            onSelect={(selectId) =>
              props.onSelect
                ? props.onSelect(selectId, "handheld")
                : navigate("/retro-handhelds/" + selectId)
            }
            onClose={() => {
              if (!props.doNotCloseAfterSelect) props.setIsModalOpen(false);
            }}
            disabledRows={props.disabledRows}
            renderRightSideIcon={props.renderRightSideIcon}
            noSpecialType={props.noSpecialType}
          />
        );
      },
    },
    {
      id: "games",
      label: "Games",
      render: () => {
        return (
          <CombinedSearchResults
            searchText={searchText}
            searchList={gamesSearchList}
            getThumbnailImageUrl={(row) =>
              constructGameCoverThumbnailUrl(row.cover)
            }
            onSelect={(selectId) =>
              props.onSelect
                ? props.onSelect(selectId, "game")
                : navigate("/games/" + selectId)
            }
            onClose={() => {
              if (!props.doNotCloseAfterSelect) props.setIsModalOpen(false);
            }}
            disabledRows={props.disabledRows}
            renderRightSideIcon={props.renderRightSideIcon}
            noSpecialType={props.noSpecialType}
          />
        );
      },
    },
  ];

  const resetSearch = () => {
    setSearchText("");
    onClose();
  };

  const keyAction = (event) => {
    if (event.key === "Escape") {
      resetSearch();
    }
  };

  useEffect(() => {
    if (props.isModalOpen) onOpen();
    else onClose();
  }, [JSON.stringify(props.isModalOpen)]);

  useEffect(() => {
    if (keyEvent) keyAction(keyEvent);
    setKeyEvent(null);
  }, [keyEvent]);

  useEffect(() => {
    setSearchText("");

    if (document) {
      document.addEventListener("keydown", setKeyEvent, true);

      return () => {
        document.removeEventListener("keydown", setKeyEvent, true);
      };
    }
  }, []);

  return (
    <Dialog.Root
      open={open}
      size={{ sm: "2xl", base: "lg" }}
      fontSize="14px"
      mx=".5rem"
      onOpenChange={(e) => {
        if (!e.open) {
          props.setIsModalOpen(false);
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            mx=".5rem"
            pt="2rem"
            minWidth={{ base: "100%", sm: "auto" }}
          >
            {props.closeButton && (
              <Dialog.CloseTrigger
                autoFocus={false}
                size="lg"
              ></Dialog.CloseTrigger>
            )}
            {props.text && (
              <Dialog.Header textAlign={"center"}>{props.text}</Dialog.Header>
            )}
            <Dialog.Body>
              <CombinedSearchInput
                searchText={searchText}
                setSearchText={setSearchText}
              ></CombinedSearchInput>
              <Box>
                {props.singleTab &&
                  tabs?.find((e) => e.id === props.singleTab).render()}
                {!props.singleTab && (
                  <Tabs.Root
                    fitted
                    unstyled
                    lazyMount
                    defaultValue={
                      props.defaultOpen ? props.defaultOpen : tabs[0].id
                    }
                  >
                    <Tabs.List>
                      {tabs.map((t) => (
                        <Tabs.Trigger
                          key={t.id}
                          value={t.id}
                          borderBottom="2px solid var(--appColorLighterGrey)"
                          userSelect={"none"}
                          _selected={{
                            color: "var(--appColorAccentDark)!important",
                            fontWeight: "bold",
                          }}
                        >
                          {t.label}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>

                    <Tabs.Indicator
                      mt="-1.5px"
                      height="2px"
                      bgColor="var(--appColorAccentDark)"
                      borderRadius="1px"
                    />
                    {tabs.map((t) => (
                      <Tabs.Content key={t.id} value={t.id}>{t.render()}</Tabs.Content>
                    ))}
                    {/* </Tabs.Panels> */}
                  </Tabs.Root>
                )}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
