import React from "react";
import { Stack, Box, Grid } from "@chakra-ui/react";
import BuyLinksWrapperServerSide from "../buyLinks/BuyLinksWrapperServerSide";
import ItemTitleCard from "./ItemTitleCard";
import ItemImageCard from "./ItemImageCard";
import ItemMainInfoCard from "./ItemMainInfoCard";
import ItemFlavorImageCard from "./ItemFlavorImageCard";
import ItemFullInfoCard from "./ItemFullInfoCard";
import { headerHeight } from "@/lib/sizes";

export default function ItemVertical(props) {
  return (
    <Stack height={"100%"} rowGap={0}>
      <Box position="sticky" top={headerHeight} zIndex="1000">
        <ItemTitleCard
          clickable={props.clickable}
          itemInfo={props.itemInfo}
          compareWithItemInfo={props.compareWithItemInfo}
          borderColor={props.borderColor}
          isFullPage={props.isFullPage}
          actionButton={props.actionButton}
        ></ItemTitleCard>
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={2}
        alignItems={"stretch"}
      >
        <Box width={{ md: "100%", base: "100%" }}>
          <ItemImageCard
            itemInfo={props.itemInfo}
            clickable={props.clickable}
            borderColor={props.borderColor}
            image={props.image}
            mawImageWidth={props.mawImageWidth}
            isFullPage={props.isFullPage}
            itemsWithBuyLinks={props.itemsWithBuyLinks}
          ></ItemImageCard>
        </Box>

        <ItemMainInfoCard
          itemInfo={props.itemInfo}
          compareWithItemInfo={props.compareWithItemInfo}
          isFullPage={props.isFullPage}
          borderColor={props.borderColor}
          showCompareLink={props.showCompareLink}
          hide={!props.isFullPage && { cfw: true }}
          showSave
          itemsWithBuyLinks={props.itemsWithBuyLinks}
          userCountry={props?.appContextFromNextServer?.userCountry}
          // showDetailsLink={props?.showDetailsLink}
          // showDetailsLink={!props.isFullPage}
        ></ItemMainInfoCard>

        {props.showBuyLinksAccordion && (
          <BuyLinksWrapperServerSide
            itemInfo={props.itemInfo}
            asAccordion
          ></BuyLinksWrapperServerSide>
        )}

        {/* {props.isFullPage && (
          <GridItem gridColumn={{ base: "auto", md: "span 2" }}>
            <HandheldsAddToUserListsButton
              itemInfo={props.itemInfo}
              asFullButton
            ></HandheldsAddToUserListsButton>
          </GridItem>
        )} */}
{/* 
        {props.isFullPage && (
          <HandheldMentionnedInCard
            borderColor={props.borderColor}
            itemInfo={props.itemInfo}
          ></HandheldMentionnedInCard>
        )} */}
        {props.showFlavorImage === "start" && (
          <ItemFlavorImageCard
            borderColor={props.borderColor}
            itemInfo={props.itemInfo}
          ></ItemFlavorImageCard>
        )}
      </Grid>
      {!props.hideFullInfo && (
        <>
          <ItemFullInfoCard
            itemInfo={props.itemInfo}
            compareWithItemInfo={props.compareWithItemInfo}
            borderColor={props.borderColor}
            clickable={props.clickable}
            isFullPage={props.isFullPage} // To do : separate these into what they actually do (hide categories, hideAttributes...)
            isComparePage={props.isComparePage}
          ></ItemFullInfoCard>
        </>
      )}
      {props.showFlavorImage === "end" && (
        <ItemFlavorImageCard
          borderColor={props.borderColor}
          itemInfo={props.itemInfo}
        ></ItemFlavorImageCard>
      )}
    </Stack>
  );
}
