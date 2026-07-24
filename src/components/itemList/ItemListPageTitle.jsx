import React from "react";
import { itemsLabel } from "@/lib/appGlobals";
import { sortOptions } from "@/lib/sorting";
import { Box, Center, Heading } from "@chakra-ui/react";

export default function ItemListPageTitle(props) {
  const setHtmlTitleFromTitleComponents = (titleComponents) => {
    const title = titleComponents
      .filter(
        (t, idx) =>
          t.text &&
          t.text !== "" &&
          (t.renderCondition ? t.renderCondition() : true),
      )
      .map((f) => f.text)
      ?.join(" ");

    if (typeof window !== "undefined" && document) document.title = title;
  };
  const renderPageTitle = () => {
    const isStaffPicked =
      props.filters?.find((e) => e.key === "Staff Pick")?.value === true;

    const isUpcoming =
      props.filters?.find((e) => e.key === "isUpcoming")?.value === true;

    let sortingAdjective;
    if (isStaffPicked) sortingAdjective = "Best";
    else if (isUpcoming) sortingAdjective = "Upcoming";
    else {
      sortingAdjective =
        sortOptions?.[props?.selectedSorting]?.sortingAdjective;
    }

    // const osFilter = props.filters?.find((e) => e.key === "operatingSystem");
    // const oSAdjective = osFilter?.active ? osFilter?.value : undefined;

    const brandFilter = props?.filters.find((e) => e.key === "brand");
    const brandAdjective = brandFilter?.active ? brandFilter?.value : undefined;

    const availabilityFilter = props?.filters.find(
      (e) => e.key === "availability",
    );
    const availabilityAdjective = availabilityFilter?.active
      ? availabilityFilter?.value
      : undefined;

    const alreadyComputedActiveTags = [
      "Staff Pick",
      "availability",
      "isUpcoming",
      "operatingSystem",
      "brand",
      "isReleased",
    ];

    const remaining = props?.filters?.filter(
      (f) =>
        !alreadyComputedActiveTags.includes(f.key) &&
        (f.type === "radio" || f.type === "checkbox") &&
        f.active &&
        f.value,
    );
    const remainingActiveTagsWithClassicRender = remaining.filter(
      (f) => !f.titleRenderType,
    );

    let withLabel;
    let withValue;
    if (remainingActiveTagsWithClassicRender?.length >= 1) {
      const oneActiveFilter = remainingActiveTagsWithClassicRender?.[0];

      withLabel = oneActiveFilter.label;
      if (oneActiveFilter.type === "radio") {
        withValue = `${oneActiveFilter.value}${oneActiveFilter.unit ?? ""}`;
      }
    }

    const remainingActiveTagsWithPrefixRender = remaining?.filter(
      (f) => f.titleRenderType === "prefix",
    );

    let prefix;
    if (remainingActiveTagsWithPrefixRender?.length >= 1) {
      const oneActiveFilter = remainingActiveTagsWithPrefixRender?.[0];
      prefix = oneActiveFilter.value;

      if (oneActiveFilter.type === "radio") {
        prefix = oneActiveFilter.value;
      }
      if (oneActiveFilter.type === "checkbox") {
        prefix = oneActiveFilter.label;
      }
    }

    let forSuffix;
    const remainingActiveTagsWitforSuffixRender = remaining?.filter(
      (f) => f.titleRenderType === "forSuffix",
    );
    if (remainingActiveTagsWitforSuffixRender?.length >= 1) {
      const oneActiveFilter = remainingActiveTagsWitforSuffixRender?.[0];
      forSuffix = oneActiveFilter.label;
    }

    let suffix;
    const remainingActiveTagsWithSuffixRender = remaining?.filter(
      (f) => f.titleRenderType === "suffix",
    );
    if (remainingActiveTagsWithSuffixRender?.length >= 1) {
      const oneActiveFilter = remainingActiveTagsWithSuffixRender?.[0];
      suffix = oneActiveFilter.label;
    }

    const titleComponents = [
      // {
      //   text: `${isStaffPicked ? "The " : ""}${
      //     defJsonBeforePagination?.length
      //   }`,
      //   renderCondition: () => defJsonBeforePagination?.length > 0,
      // },
      {
        text: sortingAdjective,
      },
      {
        text: availabilityAdjective,
      },
      {
        text: brandAdjective,
        color: "var(--appColorAccent)",
      },
      // {
      //   text: oSAdjective,
      //   color: "var(--appColorAccentDark)",
      // },
      {
        text: prefix,
        color: "var(--appColorAccent)",
      },

      {
        text: itemsLabel,
      },
      {
        text: suffix,
        color: "var(--appColorAccent)",
      },
      {
        text: "with",
        renderCondition: () => withValue || withLabel,
      },
      {
        text: withValue,
        color: "var(--appColorAccent)",
      },
      {
        text: withLabel,
        color: !withValue && "var(--appColorAccent)",
      },
      {
        text: forSuffix,
        color: "var(--appColorAccent)",
      },
    ];

    setHtmlTitleFromTitleComponents(titleComponents);

    return (
      <Center>
        <Box
          // ml={{ base: 0, md: "1.2rem" }}
          minHeight={"2.6rem"}
          alignContent={"center"}
          textAlign={{ base: "center", lg: "unset" }}
          mb={"1rem"}
          fontSize={"1.6rem"}
          fontWeight={"500"}
          as="h1"
          // textTransform={"uppercase"}
          // color={"var(--appColorDarkerGrey)"}
          // letterSpacing="0.15em"
        >
          {titleComponents.map((t, idx) => {
            if (
              t.text &&
              t.text !== "" &&
              (t.renderCondition ? t.renderCondition() : true)
            ) {
              return (
                <Box as="span" key={idx} color={t.color}>
                  {" "}
                  {t.text}{" "}
                </Box>
              );
            }
          })}
        </Box>
      </Center>
    );
  };

  return <>{renderPageTitle()}</>;
}
