import { Box, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { LuCheck, LuSearch, LuX } from 'react-icons/lu';
export default function CombinedSearchInput(props) {
  const [placeholder, setPlaceHolder] = useState(
    props.initialPlaceholder ?? "Search"
  );

  useEffect(() => {
    if (props.initialPlaceholder?.length > 0)
      setPlaceHolder(props.initialPlaceholder);
  }, [JSON.stringify(props.initialPlaceholder)]);
  const inputRef = useRef();

  return (
    <Box position={"relative"} mb="1rem">
      <Box position="relative">
        <Input
          ref={inputRef}
          // onBlur={() => inputRef.current && inputRef.current.focus()}
          placeholder={placeholder ?? "Search"}
          value={props.searchText ?? ""}
          onChange={(event) => props.setSearchText(event.target.value)}
          autoFocus
          // ref={input => input && input.focus()}

          // onFocus={() => setIsSearchActive(true)}
          borderColor="var(--appColorAccent)"
          // focusBorderColor= "var(--appColorAccent)"
          _focus={{
            borderColor: "var(--appColorAccent)",
          }}
          position={"relative"}
          // backgroundColor={"var(--appColorCardBackground)"}
          size={"5xl"}
          height={"3rem"}
          paddingRight="2.5rem"
        ></Input>
        <Box
          position="absolute"
          right="0.75rem"
          top="50%"
          transform="translateY(-50%)"
          display="flex"
          alignItems="center"
          color={"var(--appColorDarkGrey)"}
          onClick={() => {
            props.searchText?.length > 0 ? props.setSearchText("") : undefined;
          }}
          cursor={props.searchText?.length > 0 ? "pointer" : "default"}
        >
          {props.searchText?.length > 0 ? <LuX /> : <LuSearch />}
        </Box>
      </Box>
    </Box>
  );
}
