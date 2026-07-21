import React from "react";
import {  Center, Icon } from "@chakra-ui/react";
// import { LuSearch } from 'react-icons/lu';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchClickWrapper } from "../toolsComponents/SearchClickWrapper";

export default function AppHeaderSearch(props) {
  return (
    <SearchClickWrapper>
      <Center height={"100%"}>
        <Icon boxSize="1.1rem" asChild className="appHeaderLink">
          <FaMagnifyingGlass />
        </Icon>
      </Center>
    </SearchClickWrapper>
  );
}
