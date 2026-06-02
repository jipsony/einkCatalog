"use client";
import { React, useTransition } from "react";

import { Steps, Button, Center, Flex, HStack } from "@chakra-ui/react";

import IconsWrapper from "./IconsWrapper";

export default function Pagination(props) {
  const [isPendingLoadMore, startTransitionLoadMore] = useTransition();
  const [isPendingSmallFilterButton, startTransitionSmallFilterButton] =
    useTransition();


  const handleLoadMore = () => {
    // Heavy state update wrapped in startTransition - allows spinner to show first
    startTransitionLoadMore(() => {
      props.setPagination({
        from: 0,
        to: Math.min(
          props.pagination.to + props.pageSize + 1,
          props.defJsonBeforePagination.length
        ),
      });
    });
  };


  // isPending becomes true immediately when startTransition is called
  // hasClickedLoadMore stays true until all loading states are complete
  // This prevents the spinner from flickering during timing gaps
  const isLoading =
    isPendingLoadMore ||
    props.isLoadingPagination ||
    props.isRenderingList;

  return (
    <>
      {props.pagination?.to && props.defJson?.length > 0 && (
        <Flex
          flexDirection={"column"}
          fontWeight={"600"}
          justifyContent={"center"}
          mt={"2rem"}
        >
          <Center
            flexBasis={0}
            flexGrow={1}
            flexShrink={1}
            p={0}
            color={"var(--appColorDarkGrey)"}
          >
            {`Showing ${Math.min(
              props.pagination.to + 1,
              props.defJsonBeforePagination.length
            )} results out of ${props.defJsonBeforePagination.length}`}
          </Center>
          <Center p={0} pt="1rem">
            <HStack gap={0}>
              <Button
                pl={"2em"}
                pr={"2em"}
                mr={0}
                variant={"outline"}
                bgColor={"var(--appColorCardBackground)"}
                color={"var(--appColorCardBackgroundInvert)"}
                className="hoverColor borderDarkGrey"
                borderBottomWidth="0.4rem"
                zIndex={2}
                alignSelf={"stretch"}
                //   borderBottomWidth="0.4rem"
                borderColor={"var(--appColorDarkGrey)!important"}
                // mt={".5rem"}
                borderRightRadius={0}
                borderRight={0}
                onClick={handleLoadMore}
                disabled={
                  props.pagination.to >=
                  props.defJsonBeforePagination.length - 1
                }
                loading={isLoading}
              >
                Load More...
              </Button>
              <Button
                variant={"outline"}
                bgColor={"var(--appColorCardBackground)"}
                color={"var(--appColorCardBackgroundInvert)"}
                className="hoverColor borderDarkGrey"
                borderBottomWidth="0.4rem"
                borderLeftRadius={0}
                borderLeft={"1 solid"}
                // zIndex={2}
                ml={0}
                onClick={() => {
                  startTransitionSmallFilterButton(() => {
                    props.setIsLoadingSmallFilterButton(true);
                    props.openFilters(true);
                  });
                }}
                loading={
                  isPendingSmallFilterButton ||
                  props.isLoadingSmallFilterButton
                }
              >
                <IconsWrapper
                  icon="fa-sliders"
                  // style={{ width: "2rem" }}
                ></IconsWrapper>{" "}
              </Button>
            </HStack>
          </Center>
        </Flex>
      )}
    </>
  );
}
