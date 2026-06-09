import { Box, Icon, Input, InputGroup } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuCheck, LuSearch, LuX } from "react-icons/lu";
export default function CombinedSearchInput(props) {
  const [placeholder, setPlaceHolder] = useState(
    props.initialPlaceholder ?? "Search",
  );

  useEffect(() => {
    if (props.initialPlaceholder?.length > 0)
      setPlaceHolder(props.initialPlaceholder);
  }, [JSON.stringify(props.initialPlaceholder)]);
  const inputRef = useRef();

  return (
    <Box position={"relative"} mb="1rem">
      <InputGroup
        endElement={
          <Box
            onClick={() => {
              props.searchText?.length > 0
                ? props.setSearchText("")
                : undefined;
            }}
            cursor={props.searchText?.length > 0 ? "pointer" : "default"}
          >
            <Icon asChild boxSize={"1.2rem"}>
              {props.searchText?.length > 0 ? <LuX /> : <FaMagnifyingGlass />}
            </Icon>
          </Box>
        }
      >
        <Input
          ref={inputRef}
          placeholder={placeholder ?? "Search"}
          value={props.searchText ?? ""}
          onChange={(event) => props.setSearchText(event.target.value)}
          autoFocus
          borderColor="var(--appColorAccent)"
          _focus={{
            borderColor: "var(--appColorAccent)",
          }}
          position={"relative"}
          size={"2xl"}
          height={"3rem"}
        ></Input>
      </InputGroup>
    </Box>
  );
}
