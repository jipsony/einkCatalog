import {
  Steps,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { navigate } from "@/app/navigate";
import { FaBuilding, FaRightToBracket } from "react-icons/fa6";

export default function CombinedSearchResults(props) {
  const searchResultsLimit = 10;

  const [hoverIndex, setHoverIndex] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const [searchResultsFull, setSearchResultsFull] = useState(null);

  const [keyEvent, setKeyEvent] = useState(null);
  const [isMoreActive, setIsMoreActive] = useState(false);

  const highlightSubText = (row, searchText) => {
    const text = row.fullName;
    const trimmedText = replaceSpecialCharacters(text.toLowerCase());
    const trimmedSubText = replaceSpecialCharacters(searchText.toLowerCase());

    let trimmedSubTextStart = trimmedText?.indexOf(trimmedSubText);

    for (const idxText in text) {
      if (idxText > trimmedSubTextStart) break;
      if (specialCharacters.includes(text[idxText])) {
        trimmedSubTextStart++;
      }
    }

    const textSubArray = text?.substr(trimmedSubTextStart, text.length);

    let lengthToHighlight = 0;

    let idxSearchText = 0;
    let idxText = 0;

    while (
      // jump to next if one of them is a special character
      idxText < textSubArray?.length &&
      idxSearchText < searchText.length
    ) {
      if (
        specialCharacters.includes(textSubArray[idxText].toLowerCase()) ===
        specialCharacters.includes(searchText[idxSearchText].toLowerCase())
      ) {
        lengthToHighlight++;
        idxSearchText++;
        idxText++;
      } else if (
        specialCharacters.includes(textSubArray[idxText]) &&
        !specialCharacters.includes(searchText[idxSearchText])
      ) {
        lengthToHighlight++;
        idxText++;
      } else if (
        !specialCharacters.includes(textSubArray[idxText]) &&
        specialCharacters.includes(searchText[idxSearchText])
      ) {
        idxSearchText++;
      } else {
        idxSearchText++;
        idxText++;
      }
    }

    return (
      <span style={{ alignSelf: "center" }}>
        {row?.prefix && <span>{row?.prefix}: </span>}
        <span>{text.substr(0, trimmedSubTextStart)}</span>
        <b className="appColorAccent">
          {text.substr(trimmedSubTextStart, lengthToHighlight)}
        </b>
        <span>{text.substr(trimmedSubTextStart + lengthToHighlight)}</span>
      </span>
    );
  };

  const specialCharacters = ["-", " ", "_", ".", ":"];

  const replaces = [
    {
      from: "é",
      to: "e",
    },
    {
      from: "&",
      to: "and",
    },
  ];

  const replaceSpecialCharacters = (text) => {
    let replacedText = text;
    specialCharacters.forEach(
      (specialCharacter) =>
        (replacedText = replacedText.replaceAll(specialCharacter, "")),
    );

    replaces.forEach((r) => {
      replacedText = replacedText.replaceAll(r.from, r.to);
    });
    return replacedText;
  };

  const applySearchForRow = (searchableName) => {
    if (searchableName.toLowerCase()?.includes(props.searchText.toLowerCase()))
      return true;
    else if (
      replaceSpecialCharacters(searchableName.toLowerCase())?.includes(
        replaceSpecialCharacters(props.searchText.toLowerCase()),
      )
    )
      return true;

    return false;
  };

  useEffect(() => {
    // const searchResultLimit = isMoreActive? 10000000000 : searchResultsCount

    if (!props.searchList?.unsorted || !props.searchList?.alphabetical) return;
    const unsorted = props.noSpecialType
      ? props.searchList.unsorted.filter((r) => !r?.specialType)
      : props.searchList.unsorted;
    const alphabetical = props.noSpecialType
      ? props.searchList.alphabetical.filter((r) => !r?.specialType)
      : props.searchList.alphabetical;
    let newSearchResults;

    if (props.searchText === "") {
      newSearchResults = unsorted;
      setSearchResultsFull(alphabetical);
    } else {
      newSearchResults = alphabetical?.filter((row) => {
        const searchableName = row.fullName;
        return applySearchForRow(searchableName);
      });
      setSearchResultsFull(newSearchResults);
    }

    setSearchResults(newSearchResults.slice(0, searchResultsLimit));
    setHoverIndex(0);
    setIsMoreActive(false);
  }, [props.searchText, props.searchList]);

  const onSelect = (row) => {
    if (row?.specialType === "link") {
      if (row.link) navigate(row.link);
      if (props.onClose) props.onClose();
      return;
    }

    if (row?.specialType === "function") {
      row.onSelect();
      if (props.onClose) props.onClose();
      return;
    }

    if (props.onSelect) props.onSelect(row.id);
    if (props.onClose) props.onClose();
  };

  const keyAction = (event) => {
    if (event.key === "ArrowDown") {
      setHoverIndex((prev) => {
        event.preventDefault();

        if (prev === searchResults.length - 1)
          return 0; // wrap back
        else return prev + 1;
      });
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHoverIndex((prev) => {
        if (prev === 0) return searchResults.length - 1;
        else return prev - 1;
      });
    }
    if (event.key === "Enter") {
      if (searchResults?.[hoverIndex]?.id) {
        onSelect(searchResults?.[hoverIndex]);
      }
    }
  };

  const renderThumbnail = (row) => {
    if (row?.icon && row?.icon === "fa-building") {
      return (
        <FaBuilding style={{ marginRight: 5, marginLeft: -12 }}></FaBuilding>
      ); // offset button padding
    } else if (!row?.specialType)
      return (
        <Image
          src={
            props.getThumbnailImageUrl
              ? props.getThumbnailImageUrl(row)
              : () => {}
          }
          pt={1}
          pb={1}
          mr={5}
          display={"inline"}
          alt={`${row.fullName} thumbnail`}
          height={"inherit"}
          objectFit={"contain"}
        />
      );
  };
  useEffect(() => {
    if (keyEvent) keyAction(keyEvent);
    setKeyEvent(null);
  }, [keyEvent]);

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", setKeyEvent, true);

      return () => {
        document.removeEventListener("keydown", setKeyEvent, true);
      };
    }
  }, []);

  const buttonHeight = props.thumbnailHeight ?? 3;
  const containerHeight = buttonHeight * searchResultsLimit + 1 + 1 + 2;

  const renderSubText = (row) => {
    if (row.s)
      return (
        <Box fontSize={"10px"} color="var(--appColorDarkGrey)" mr=".5rem">
          {`( ${row.s} )`}
        </Box>
      );
  };

  return (
    <Box>
      <Stack
        w="100%"
        gap={0}
        // maxH={props.maxHeight ?? "20rem"}
        overflowY="auto"
        h={`${containerHeight}rem`}
      >
        {searchResults?.map((row, idx) => {
          return (
            <Button
              variant={"outline"}
              justifyContent={"space-between"}
              borderRadius={0}
              key={row.id}
              onClick={() => {
                onSelect(row);
              }}
              data-active
              minH={`${buttonHeight}rem`}
              overflow={"hidden"}
              disabled={props.disabledRows?.includes(row.id)}
              maxW="100%"
              
            >
              <Box style={{ display: "flex" }} alignItems={"center"}>
                <Center
                  h={`${buttonHeight}rem`}
                  w={props.thumbnailWidth ?? "5em"}
                >
                  {renderThumbnail(row)}
                </Center>
                <Flex
                  columnGap={"3px"}
                  alignItems={"baseline"}
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  <Box>{highlightSubText(row, props.searchText)}</Box>
                  <Box>{renderSubText(row)}</Box>
                </Flex>
              </Box>
              {!props.renderRightSideIcon && idx === hoverIndex && (
                <FaRightToBracket
                  style={{ alignSelf: "right", color: "grey" }}
                ></FaRightToBracket>
              )}{" "}
              {props.renderRightSideIcon && props.renderRightSideIcon(row.id)}
            </Button>
          );
        })}
        {!isMoreActive &&
          props.searchText?.length > 1 &&
          searchResultsFull?.length !== searchResults?.length && (
            <Button
              textDecor={"underline"}
              variant={"outline"}
              borderRadius={0}
              onClick={() => {
                setIsMoreActive(true);
                setSearchResults(searchResultsFull);
              }}
              minH={`${buttonHeight}rem`}
              color="var(--appColorDarkGrey)"
            >
              More results...
            </Button>
          )}
        {props.searchText?.length > 0 && searchResults?.length === 0 && (
          <Center color="var(--appColorDarkGrey)">
            {`No Results for ${props.searchText}`}{" "}
          </Center>
        )}
      </Stack>
      {searchResults && (
        <Center color="var(--appColorDarkGrey)" height={"2rem"}>
          {/* {props.searchText?.length > 0 && ( */}
          <Box>
            {`Showing ${searchResults?.length} results out of ${searchResultsFull?.length} `}
          </Box>
          {/* )} */}
        </Center>
      )}
    </Box>
  );
}
