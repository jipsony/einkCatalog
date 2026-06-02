"use client";
import React, { useEffect, useState } from "react";

import { Steps, Button } from "@chakra-ui/react";
import IconsWrapper from "../IconsWrapper";
import SearchModal from "../SearchModal";
import { navigate } from "@/app/navigate";
import { constructGameCoverThumbnailUrl } from "@/app/lib/globalFuncs";
import CombinedSearchModal from "./CombinedSearchModal";

export default function CombinedSearchButton(props) {

    
  const [isGameSearchActive, setIsGameSearchActive] = useState(false);
  const [isSearchListImported, setIsSearchListImported] = useState(false);
  const [gamesSearchList, setGamesSearchList] = useState(props.gamesSearchList);

  const importSearchList = async () => {
    const { default: gamesSearchList } = await import(
      "@/resources/def/games/gamesSearchList.json"
    );

    setGamesSearchList(gamesSearchList);
    setIsSearchListImported(true);
  };
  useEffect(() => {
    if (!isSearchListImported && !props.gamesSearchList) {
      importSearchList();
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          setIsGameSearchActive(true);
        }}
        bgColor={"var(--appColorCardBackground)"}
        color={"var(--appColorCardBackgroundInvert)"}
        className="hoverFloat hoverColor borderDarkGrey"
        // borderBottomWidth={"0.4rem"}
        width={"100%"}
        minW={"10rem"}
        height={"3rem"}
      >
        <IconsWrapper
          icon="fa-magnifying-glass"
          style={{ width: "2rem" }}
        ></IconsWrapper>
        {props.text ?? "Search"} &nbsp;
      </Button>

      <CombinedSearchModal
        isModalOpen={isGameSearchActive}
        setIsModalOpen={setIsGameSearchActive}
        onSelect={(selectId) => {
          navigate("/games/" + selectId);
        }}
        searchList={gamesSearchList}
        getHandheldThumbnailImageUrl={(row) =>
          constructGameCoverThumbnailUrl(row.cover)
        }
        initialPlaceholder={"Search"}
        thumbnailWidth="3rem"
        thumbnailHeight="3rem"
      ></CombinedSearchModal>
    </>
  );
}
