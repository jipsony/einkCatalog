"use client";
import { React, useEffect, useState, useTransition } from "react";
import {
  Steps,
  Heading,
  Button,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  HStack,
  Card,
  Image,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {
  buildFullName,
  generateCompareTitle,
  itemMainRoute,
  itemsLabel,
} from "@/lib/appGlobals";
import { getItemInfo } from "@/lib/item/items";
import {
  compareColor,
  compareColorsRender,
  compareFloat,
} from "@/lib/compare/compare";
import CompareSizes from "./CompareSizes";
import ItemVertical from "@/components/itemCards/ItemVertical";
import CombinedSearchInput from "@/components/toolsComponents/combinedSearch/CombinedSearchInput";
import CombinedSearchModal from "@/components/toolsComponents/combinedSearch/CombinedSearchModal";
import CompareKeyValueIcon from "./CompareKeyValueIcon";
import { itemsSearchList } from "@/lib/item/itemSearchList";
import AppBreadcrumbs from "@/components/toolsComponents/AppBreadcrumbs";

export default function ComparePage(props) {
  const parentPagePath = `${itemMainRoute}/compare`;
  const [isActiveSearchCompare, setIsActiveSearchCompare] = useState(true);
  const [isActiveSearchCompareWith, setIsActiveSearchCompareWith] =
    useState(true);
  const [isCompareSearchModalOpen, setIsCompareSearchModalOpen] =
    useState(false);
  const [isCompareWithSearchModalOpen, setIsCompareWithSearchModalOpen] =
    useState(false);

  const [compareInfo, setCompareInfo] = useState();
  const [compareWithInfo, setCompareWithInfo] = useState();
  const [isPendingCompare, startTransitionCompare] = useTransition();
  const updateUrlWithCompare = (compareId, compareWithId) => {
    let newPath = parentPagePath;
    if (compareId) newPath += "/" + compareId;
    if (compareWithId) newPath += "/" + compareWithId;

    //https://github.com/vercel/next.js/discussions/18072
    window.history.replaceState(
      { ...window.history.state, as: newPath, url: newPath },
      "",
      newPath,
    );

    const title = generateCompareTitle(
      compareInfo?.fullName,
      compareWithInfo?.fullName,
    );
    if (document) document.title = title;
  };

  const renderLegend = () => {
    return (
      <Card.Root
        variant={"outline"}
        borderColor={"var(--appBorderColor)"}
        ml={"1rem"}
        mr={"1rem"}
        mt={".5rem"}
        backgroundColor={"var(--appColorCardBackground)"}
        fontSize={"12px"}
        className="appTextFont"
        color="var(--appColorAccent)"
      >
        <Card.Body alignContent={"space-around"}>
          <Box
            fontWeight={"bold"}
            pl={"2rem"}
            pr={"1rem"}
            // color="var(--appColorLightGrey)"
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              justifyContent={"space-between"}
            >
              <Box>
                <CompareKeyValueIcon
                  key="legendGreen"
                  compareColor={() => "green"}
                ></CompareKeyValueIcon>
                <Box>: Device ranks higher</Box>
              </Box>
              <Box>
                <CompareKeyValueIcon
                  key="legendRed"
                  compareColor={() => "red"}
                ></CompareKeyValueIcon>
                <Box>: Device ranks lower</Box>
              </Box>
              <Box>
                <CompareKeyValueIcon
                  key="legendYellow"
                  compareColor={() => "yellow"}
                ></CompareKeyValueIcon>
                <Box>: Devices are equal</Box>
              </Box>
            </Stack>
          </Box>
        </Card.Body>
      </Card.Root>
    );
  };
  useEffect(() => {
    if (compareInfo?.id || compareWithInfo?.id)
      updateUrlWithCompare(compareInfo?.id, compareWithInfo?.id);
  }, [compareInfo?.id, compareWithInfo?.id]);

  useEffect(() => {
    const setup = () => {
      let newCompareInfo = compareInfo;

      let newWithInfo = compareWithInfo;

      if (props.compare) {
        if (!newCompareInfo) {
          newCompareInfo = getItemInfo(props.compare);
        }
      }
      if (props.with) {
        if (!newWithInfo) {
          newWithInfo = getItemInfo(props.with);
        }
      }

      if (newCompareInfo) setCompareInfo({ ...newCompareInfo });
      if (newWithInfo) setCompareWithInfo({ ...newWithInfo });
    };

    setup();
  }, [JSON.stringify([props.compare, props.with])]);

  const renderCompareInput = (
    label,
    setInfo,
    isActiveSearch,
    initialPlaceholder,
    isModalOpen,
    setIsModalOpen,
  ) => {
    return (
      <Box width={"100%"}>
        <Heading as="div" size={"lg"} mb={"4px"} className="appHeader">
          {label}
        </Heading>

        {isActiveSearch && (
          <>
            {isModalOpen && (
              <CombinedSearchModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initialPlaceholder={initialPlaceholder ?? "Search"}
                searchList={props.searchList}
                noSpecialType
                singleTab="e-readers"
                closeButton
                onSelect={(selectId) => {
                  startTransitionCompare(() => {
                    let itemInfo = getItemInfo(selectId);
                    setInfo({ ...itemInfo });
                  });
                }}
              ></CombinedSearchModal>
            )}
            <CombinedSearchInput
              autoFocus={false}
              readOnly
              searchText=""
              setSearchText={() => {}}
              initialPlaceholder={initialPlaceholder ?? "Search"}
              onClick={() => {
                setIsModalOpen(true);
              }}
              size="xl"
            ></CombinedSearchInput>
          </>
        )}
      </Box>
    );
  };

  const computeBorderColor = (a, b) => {
    if (a && b) {
      const compareResult = compareFloat(a, b);
      return compareColorsRender[compareColor(compareResult)];
    }
  };

  const breadcrumbList = [
    {
      label: itemsLabel,
      path: itemMainRoute,
    },
    {
      label: `Comparison Tool`,
      path: `/${itemMainRoute}/compare`,
      isCurrentPage: true,
    },
  ];

  const renderPageTitle = () => {
    let title = "";
    if (!compareInfo?.id && !compareWithInfo?.id)
      title = `Compare ${itemsLabel}`;

    if (compareInfo?.fullName) {
      title = compareInfo?.fullName + " Comparison";
    }
    if (compareInfo?.fullName && compareWithInfo?.fullName) {
      title =
        compareInfo?.fullName +
        " vs. " +
        compareWithInfo?.fullName +
        " Comparison";
    }
    return (
      <Box mb={"1rem"} ml="1.2rem" mr="1.2rem">
        <Heading
          textAlign="center"
          fontSize={"1.8rem"}
          as="h1"
          className="appTitle"
          minHeight={"2.6rem"}
          alignContent={"center"}
          // textAlign={{ base: "center", lg: "unset" }}
          mb={"1rem"}
          // fontSize={"1.6rem"}
          fontWeight={"500"}
          fontFamily="var(--font-roboto-mono)"

          // as="h1"
        >
          {title}
        </Heading>
      </Box>
    );
  };

  const renderSuggestionButton = (id) => {};

  const renderCompareWithSuggestions = () => {
    return (
      <GridItem>
        <Box ml="1rem" mr="1rem">
          <Card.Root
            alignSelf={"stretch"}
            variant={"outline"}
            minH={"3.5em"}
            borderBottomWidth="0.4rem"
            borderColor={"var(--appColorDarkGrey)"}
            // color={"var(--appColorDarkGrey)"}
            mb="2"
          >
            <Card.Body p={"0.8em"}>
              <Center>
                <Heading fontSize={"1.5em"} as={"span"}>
                  Suggestions
                </Heading>
              </Center>
            </Card.Body>
          </Card.Root>
          <Stack gap={"4px"}>
            {compareInfo?.similar?.map((id) => (
              <Box key={id}>
                <Button
                  variant={"outline"}
                  borderColor={"var(--appColorDarkGrey)"}
                  mb="0"
                  cursor={"pointer"}
                  width={"100%"}
                  height={"3rem"}
                  fontSize={"12px"}
                  backgroundColor="var(--appColorCardBackground)"
                  onClick={() => {
                    startTransitionCompare(() => {
                      let itemInfo = getItemInfo(id);
                      setCompareWithInfo({ ...itemInfo });
                    });
                  }}
                >
                  <HStack justify="space-between" align="center" w="100%">
                    <Center h={"2.5em"} w={"5em"}>
                      {/* <Image
                        src={getItemThumbnailImageUrl({ id })}
                        alt={`${compareInfo.fullName} thumbnail`}
                        h={"2rem"}
                        // w={"5em"}
                      ></Image> */}
                    </Center>
                    <Center flex="1" id="title">
                      <Box
                        display={"inline"}
                        color={"var(--appColorDarkGrey)"}
                        fontWeight={"400"}
                      >
                        <Box above="sm" hideFrom>
                          {compareInfo.brand}
                        </Box>
                        {" vs."}
                      </Box>
                      <Box display={"inline"} fontWeight={"800"}>
                        &nbsp;{buildFullName(compareInfo)}
                      </Box>
                    </Center>
                  </HStack>
                </Button>
              </Box>
            ))}
            <Box>
              <Box display={"inline"}>
                {isCompareWithSearchModalOpen && (
                  <CombinedSearchModal
                    isModalOpen={isCompareWithSearchModalOpen}
                    setIsModalOpen={setIsCompareWithSearchModalOpen}
                    initialPlaceholder={"Search"}
                    searchList={props.searchList}
                    noSpecialType
                    singleTab="e-readers"
                    closeButton
                    onSelect={(selectId) => {
                      startTransitionCompare(() => {
                        let itemInfo = getItemInfo(selectId);
                        setCompareWithInfo({ ...itemInfo });
                      });
                    }}
                  ></CombinedSearchModal>
                )}
                <CombinedSearchInput
                  autoFocus={false}
                  readOnly
                  searchText=""
                  setSearchText={() => {}}
                  initialPlaceholder={"Search"}
                  onClick={() => {
                    setIsCompareWithSearchModalOpen(true);
                  }}
                ></CombinedSearchInput>
              </Box>
            </Box>
          </Stack>
        </Box>
      </GridItem>
    );
  };

  const renderSwapCompareButton = () => {
    if (!compareInfo || !compareWithInfo) return null;

    return (
      <Icon
        size="md"
        color={"var(--appColorAccent)"}
        asChild
        cursor="pointer"
        _hover={{ opacity: 0.6 }}
        onClick={() => {
          const temp = compareInfo;
          setCompareInfo({ ...compareWithInfo });
          setCompareWithInfo({ ...temp });
        }}
        alignSelf={"center"}
        mt={4}
      >
        <FaArrowRightArrowLeft></FaArrowRightArrowLeft>
      </Icon>
    );
  };

  return (
    <>
      {/* <AppBreadcrumbs breadcrumbList={breadcrumbList}></AppBreadcrumbs> */}
      <Box className="background" pb={"4rem"}>
        <Center>
          <Box
            // width={{ base: cardSize, lg: cardSize * 2 }}
            w="100%"
          >
            {/* <Box ml={"1.2rem"}>
            <AppBreadcrumbs breadcrumbList={breadcrumbList}></AppBreadcrumbs>
          </Box> */}
            <Box my="2rem">{renderPageTitle()}</Box>
            <Box position="relative">
              {isPendingCompare && (
                <Box
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex={10}
                  pointerEvents="none"
                >
                  <Spinner
                    size="xl"
                    color="var(--appColorDarkGrey)"
                    borderWidth="4px"
                  />
                </Box>
              )}
              <Grid
                templateColumns={{
                  base: "1fr",
                  lg: "1fr 1fr",
                }}
                opacity={isPendingCompare ? 0.3 : 1}
                columnGap={"2rem"}
              >
                <GridItem gridColumn={{ lg: "span 2" }}>
                  <Flex
                    direction={{ base: "column", lg: "row" }}
                    align={{ base: "stretch", lg: "flex-end" }}
                    gap={{ base: 2, lg: "2rem" }}
                    // mx="1rem"
                    mb="1rem"
                  >
                    <Box flex="1">
                      {renderCompareInput(
                        "Compare",
                        setCompareInfo,
                        isActiveSearchCompare,
                        compareInfo?.fullName,
                        isCompareSearchModalOpen,
                        setIsCompareSearchModalOpen,
                      )}
                    </Box>
                    {/* {renderSwapCompareButton()} */}
                    <Box flex="1">
                      {renderCompareInput(
                        "With",
                        setCompareWithInfo,
                        isActiveSearchCompareWith,
                        compareWithInfo?.fullName,
                        isCompareWithSearchModalOpen,
                        setIsCompareWithSearchModalOpen,
                      )}
                    </Box>
                  </Flex>
                </GridItem>

                <GridItem gridColumn={{ lg: "span 2" }}>
                  <Box
                    mb={"1rem"}
                    // ml={"1rem"}
                    // mr={"1rem"}
                  >
                    <CompareSizes
                      objectsToCompare={[compareInfo, compareWithInfo].filter(
                        (e) => !!e?.id,
                      )}
                      searchList={itemsSearchList}
                    ></CompareSizes>
                  </Box>
                </GridItem>
                {/* {compareInfo &&
                compareWithInfo &&
                compareInfo?.id !== compareWithInfo?.id && (
                  <GridItem gridColumn={{ lg: "span 2" }} mx="1rem" mb="1rem">
                    <CompareRecap
                      compareInfo={compareInfo}
                      compareWithInfo={compareWithInfo}
                    ></CompareRecap>
                  </GridItem>
                )} */}
                {compareInfo && (
                  <GridItem
                    height={{ base: "auto", lg: "100%" }}
                    mb={"2rem"}
                    maxW={"100%"}
                    overflow={"hidden"} // mx="1rem"
                  >
                    <Stack height={"100%"}>
                      <ItemVertical
                        clickable
                        showSpecs={true}
                        itemInfo={compareInfo}
                        compareWithItemInfo={compareWithInfo}
                        borderColor={computeBorderColor(
                          compareInfo?.rating,
                          compareWithInfo?.rating,
                        )}
                        showCompareLink={false}
                        isComparePage
                        showFlavorImage="end"
                        itemsWithBuyLinks={props.itemsWithBuyLinks}
                        appContextFromNextServer={
                          props?.appContextFromNextServer
                        }
                      ></ItemVertical>
                    </Stack>
                  </GridItem>
                )}
                {compareWithInfo && (
                  <GridItem
                    height={{ base: "auto", lg: "100%" }}
                    mt={{ base: "2rem", lg: "0" }}
                    mb={"2rem"}
                    maxW={"100%"}
                    overflow={"hidden"} // mx="1rem"
                    // mx="1rem"
                  >
                    <Stack height={"100%"} position="relative">
                      <ItemVertical
                        clickable
                        showSpecs={true}
                        itemInfo={compareWithInfo}
                        compareWithItemInfo={compareInfo}
                        borderColor={computeBorderColor(
                          compareWithInfo?.rating,
                          compareInfo?.rating,
                        )}
                        showCompareLink={false}
                        isComparePage
                        showFlavorImage="end"
                        actionButton={{
                          icon: "xmark",
                          // color: "var(--appColorError)",
                          color: "var(--appColorDarkGrey)",
                          onClick: () => setCompareWithInfo(null),
                          _hover: { opacity: 0.6 },
                        }}
                        itemsWithBuyLinks={props.itemsWithBuyLinks}
                        appContextFromNextServer={
                          props?.appContextFromNextServer
                        }
                      ></ItemVertical>
                    </Stack>
                  </GridItem>
                )}

                {/* {compareInfo &&
                !compareWithInfo &&
                renderCompareWithSuggestions()} */}
              </Grid>
            </Box>

            {compareInfo && compareWithInfo && renderLegend()}
            {/* {!props.compare && <GlobalCompareSuggestions />} */}
          </Box>
        </Center>
      </Box>
    </>
  );
}
