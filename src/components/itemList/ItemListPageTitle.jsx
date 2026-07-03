import React from "react";
import { sortOptions } from "../lib/sorting";
import { setHtmlTitleFromTitleComponents } from "../lib/globalFuncs";
import { cardSize, gap } from "../lib/sizes";
import { Box, Heading } from "@chakra-ui/react";

export default function ItemListPageTitle (props) {
    
  const renderPageTitle = () => {
    const isStaffPicked =
      props.filters?.find((e) => e.key === "staffPick")?.value === true;

    const isUpcoming =
      props.filters?.find((e) => e.key === "isUpcoming")?.value === true;

    let sortingAdjective;
    if (isStaffPicked) sortingAdjective = "Best";
    else if (isUpcoming) sortingAdjective = "Upcoming";
    else {
      sortingAdjective = sortOptions?.[props?.selectedSorting]?.sortingAdjective;
    }

    const osFilter = props.filters?.find((e) => e.key === "operatingSystem");
    const oSAdjective = osFilter?.active ? osFilter?.value : undefined;

    const companyFilter = props?.filters.find((e) => e.key === "company");
    const companyAdjective = companyFilter?.active
      ? companyFilter?.value
      : undefined;

    const alreadyComputedActiveTags = [
      "staffPick",
      "isUpcoming",
      "operatingSystem",
      "company",
      "isReleased",
    ];

    const remaining = props?.filters?.filter(
      (f) =>
        !alreadyComputedActiveTags.includes(f.key) &&
        (f.type === "radio" || f.type === "checkbox") &&
        f.active &&
        f.value
    );
    const remainingActiveTagsWithClassicRender = remaining.filter(
      (f) => !f.titleRenderType
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
      (f) => f.titleRenderType === "prefix"
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
      (f) => f.titleRenderType === "forSuffix"
    );
    if (remainingActiveTagsWitforSuffixRender?.length >= 1) {
      const oneActiveFilter = remainingActiveTagsWitforSuffixRender?.[0];
      forSuffix = oneActiveFilter.label;
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
        text: companyAdjective,
        color: "var(--appColorAccentDark)",
      },
      {
        text: oSAdjective,
        color: "var(--appColorAccentDark)",
      },

      {
        text: prefix,
        color: "var(--appColorAccentDark)",
      },

      {
        text: "Gaming Handhelds",
      },
      {
        text: "with",
        renderCondition: () => withValue || withLabel,
      },
      {
        text: withValue,
        color: "var(--appColorAccentDark)",
      },
      {
        text: withLabel,
        color: !withValue && "var(--appColorAccentDark)",
      },
      {
        text: "for",
        renderCondition: () => forSuffix,
      },
      {
        text: forSuffix,
        color: "var(--appColorAccentDark)",
      },
      {
        text: "Games",
        renderCondition: () => forSuffix,
      },
    ];

    setHtmlTitleFromTitleComponents(titleComponents);

    return (
      <Box maxW={{ base: cardSize, "2xl": 2 * cardSize - 4 * gap }}>
          <Heading
            ml={{ base: 0, md: "1.2rem" }}
            minHeight={"2.6rem"}
            alignContent={"center"}
            textAlign={{ base: "center", md: "unset" }}
            mb={"1rem"}
            fontSize={"1.6rem"}
            as="h1"
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
          </Heading>
      </Box>
    );
  };

  return <>{renderPageTitle()}</>
}