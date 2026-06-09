"use client";

import React, { useState } from "react";
import { Box, Center, Icon } from "@chakra-ui/react";
// import { LuSearch } from 'react-icons/lu';
import { FaMagnifyingGlass } from "react-icons/fa6";
import CombinedSearchModal from "../toolsComponents/combinedSearch/CombinedSearchModal";

export default function AppHeaderSearch(props) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <>
      {isSearchActive && (
        <CombinedSearchModal
          isModalOpen={isSearchActive}
          setIsModalOpen={setIsSearchActive}
          initialPlaceholder={"Search"}
          thumbnailWidth="3rem"
          thumbnailHeight="3rem"
          defaultOpen={undefined}
          singleTab="e-readers"
        ></CombinedSearchModal>
      )}
      <>
        <Center
          height={"100%"}
          cursor={"pointer"}
          onClick={() => setIsSearchActive(true)}
        >
          <Icon boxSize="1.1rem" asChild className="appHeaderLink">
            <FaMagnifyingGlass />
          </Icon>
        </Center>

        {/* <Box display={{ base: "block", lg: "none" }} ml="1rem">
          <AppHeaderAccountButton></AppHeaderAccountButton>
        </Box> */}

        {/* <Box display={{ base: "block", lg: "none" }} ml="1rem">
          <AppHeaderColorMode />
        </Box> */}
      </>
      {/* )} */}
    </>
  );
}
