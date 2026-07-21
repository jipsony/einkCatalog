"use client";
import React, { useState } from "react";
import CombinedSearchModal from "./combinedSearch/CombinedSearchModal";
import { Box } from "@chakra-ui/react";
export function SearchClickWrapper({ children, ...props }) {
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
      <Box cursor={"pointer"} h="100%" onClick={() => setIsSearchActive(true)}>
        {children}
      </Box>
    </>
  );
}
