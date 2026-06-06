import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import AppTooltip from "../toolsComponents/AppTooltip";
import {
  compareColor,
  compareFloat,
  compareReleaseDate,
  compareScreenSize,
} from "@/lib/compare/compare";
import CompareKeyValueIcon from "../compare/CompareKeyValueIcon";
import AppLink from "../toolsComponents/AppLink";
import { FaArrowRightArrowLeft, FaList } from "react-icons/fa6";

export default function ItemMainInfoCard(props) {
  const compareLink = `/compare/${props.handheldInfo?.id}`;

  const formatReleaseDate = (date) => {
    if (props.handheldInfo?.isUpcoming)
      return (
        <AppTooltip
          content={
            <Box color={"var(--appColorWarning)"} fontWeight={"600"}>
              {" "}
              Upcoming *
            </Box>
          }
          label="Device not yet released. Data may be inaccurate"
        >
          {" "}
        </AppTooltip>
      );
    const split = date?.split("/");

    const year = split?.[0];
    const month = split?.[1];
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    return `${months[month - 1] ?? "Jan."} ${year}`;
  };

  const formatOperatingSystem = (os) => {
    const osWithVersion = [];
    os?.map((osRow) => {
      if (osRow === "Windows") {
        if (props.handheldInfo?.windowsVersion) {
          osWithVersion.push(`Windows ${props.handheldInfo?.windowsVersion}`);
        } else {
          osWithVersion.push(`Windows`);
        }
      } else if (osRow === "Android") {
        if (props.handheldInfo?.androidVersion) {
          osWithVersion.push(`Android ${props.handheldInfo?.androidVersion}`);
        } else {
          osWithVersion.push(`Android`);
        }
      } else osWithVersion.push(osRow);
    });
    return <Box>{osWithVersion.join(", ")}</Box>;
  };

  const formatScreenSize = (screenSize) => {
    const screenSizeText =
      screenSize && screenSize !== "" ? `${screenSize}”` : undefined;
    const aspectRatioText =
      props.handheldInfo?.aspectRatio && props.handheldInfo?.aspectRatio !== ""
        ? `, ${props.handheldInfo?.aspectRatio}`
        : undefined;
    return `${screenSizeText}${aspectRatioText}`;
  };

  const formatPrice = (price) => {
    price = parseFloat(price);
    let priceText = `~$${price ? price : "?"}`;

    return priceText;
  };

  const attributes = [
    {
      id: "releaseDate",
      label: "Released",
      formatFunction: formatReleaseDate,
      compareFunction: compareReleaseDate,
    },
    {
      id: "operatingSystem",
      label: "OS",
      formatFunction: formatOperatingSystem,
    },
    {
      id: "screenSize",
      label: "Screen",
      formatFunction: formatScreenSize,
      compareFunction: compareScreenSize,
    },
    {
      id: "approximativePrice",
      label: "Price",
      formatFunction: formatPrice,
      compareFunction: (a, b) => parseInt(-compareFloat(a, b)),
    },
  ];

  const isCompareValueUndefined = (attribute) => {
    return (
      props.itemInfo?.[attribute] === "?" ||
      props.compareWithItemInfo?.[attribute] === "?"
    );
  };

  const renderCompareKeyValue = (attributeId) => {
    const attributeInfo = attributes?.find(
      (attribute) => attribute.id === attributeId,
    );

    const renderCompare = () => {
      if (isCompareValueUndefined(attributeId)) return;
      const compareResult = attributeInfo?.compareFunction(
        props.handheldInfo?.[attributeId],
        props.compareWithHandheldInfo?.[attributeId],
      );
      return compareColor(compareResult);
    };

    if (
      attributeInfo?.compareFunction &&
      !attributeInfo.dontCompare &&
      props.compareWithHandheldInfo
    ) {
      return (
        <CompareKeyValueIcon
          key={attributeId}
          compareColor={() => renderCompare()}
        ></CompareKeyValueIcon>
      );
    }
  };

  const renderValue = (attribute, value) => {
    if (attribute.formatFunction) return attribute.formatFunction(value);
    else return value;
  };

  return (
    <ItemCard>
      <Box
        display={props.showSave && "flex"}
        flexDir={"column"}
        alignContent={"space-between"}
        justifyContent="space-between"
        height="100%"
        flexWrap={"wrap"}
        borderRadius="inherit"
      >
        <Box
          pt="1rem"
          pb={props.isFullPage && "1rem"}
          px="1rem"
          w="100%"
          flex={1}
          alignContent={"center"}
          as="dl"
        >
          {props.handheldInfo &&
            attributes.map((mainAttribute, idx) => {
              if (
                mainAttribute.hide ||
                (mainAttribute.hideIfEmpty &&
                  !props.handheldInfo[mainAttribute.id])
              )
                return;
              else
                return (
                  <Box
                    key={`${idx}KV`}
                    ml={props.compareWithHandheldInfo && "2px"}
                    borderTop={
                      idx !== 0 ? "1px solid var(--appColorDivider)" : null
                    }
                  >
                    {mainAttribute?.id === "approximativePrice" && (
                      <Box float="right">
                        {renderCompareKeyValue(mainAttribute.id)}
                      </Box>
                    )}
                    <Box
                      width={{ base: "50%", md: "40%" }}
                      float="left"
                      fontWeight={"600"}
                      as="dt"
                      className="appColorDark"
                    >
                      {mainAttribute.label}
                    </Box>
                    <Box
                      width={{ base: "50%", md: "60%" }}
                      float="right"
                      as="dd"
                    >
                      {renderValue(
                        mainAttribute,
                        props.handheldInfo[mainAttribute.id],
                      )}{" "}
                    </Box>
                    <br style={{ clear: "both" }} />
                  </Box>
                );
            })}
        </Box>
        <SimpleGrid
          bottom="0px"
          w={"100%"}
          maxW={"100%"}
          overflow={"hidden"}
          // right={"1rem"}
          gap={0}
          templateColumns={"1fr 1fr"}
          borderRadius="inherit"
          pb=".5rem"
          px="1rem"
        >
          {props.showDetailsLink ? (
            <Box
              cursor={"pointer"}
              // color="var(--appColorAccentDark)"
              color="var(--appColorLinkBlue)"
              fontSize={"12px"}
            >
              <AppLink
                href={
                  props?.showDetailsLink?.href ??
                  "/retro-handhelds/" + props.handheldInfo?.id
                }
              >
                <Box
                  gap={1}
                  _hover={{ color: "var(--appColorCardBackgroundInvert)" }}
                  textDecor={"underline"}
                  fontWeight={"600"}
                >
                  <Box display={"inline"} mr=".5rem" fontSize={"10px"}>
                    <FaList />
                  </Box>
                  <Box display={"inline"}>
                    {props?.showDetailsLink?.label ?? "More Details"}
                  </Box>
                </Box>
              </AppLink>
            </Box>
          ) : (
            <Box></Box>
          )}
          {props.showCompareLink && (
            <Box
              cursor={"pointer"}
              // color="var(--appColorAccentDark)"
              color="var(--appColorLinkBlue)"
              fontSize={"12px"}
              textAlign={"end"}
              alignSelf={"flex-end"}
            >
              <AppLink href={compareLink}>
                <Box
                  gap={1}
                  _hover={{ color: "var(--appColorCardBackgroundInvert)" }}
                  textDecor={"underline"}
                  fontWeight={"600"}
                >
                  <Box display={"inline"} mr=".5rem" fontSize={"10px"}>
                    <FaArrowRightArrowLeft />
                  </Box>
                  <Box display={"inline"}>Compare</Box>
                </Box>
              </AppLink>
            </Box>
          )}
        </SimpleGrid>
      </Box>
    </ItemCard>
  );
}
