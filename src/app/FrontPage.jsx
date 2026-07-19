import ItemCard from "@/components/itemCards/ItemCard";
import ItemHorizontalPreviewCard from "@/components/itemCards/ItemHorizontalPreviewCard";
import ItemVerticalPreviewCard from "@/components/itemCards/ItemVerticalPreviewCard";
import AppLink from "@/components/toolsComponents/AppLink";
import { appName, itemMainRoute } from "@/lib/appGlobals";
import { buildFrontImageUrl } from "@/lib/images";
import { items } from "@/lib/item/items";
import { staffPicks } from "@/resources/staffPicks";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Separator,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdCompass } from "react-icons/io";
import { MdArrowForward, MdCompare, MdSearch } from "react-icons/md";

function FrontPageHero() {
  return (
    <Box textAlign="center">
      <Box
        as="h1"
        fontSize={{
          base: "2.8rem",
          sm: "3.2rem",
          md: "4.5rem",
        }}
        fontFamily="var(--font-lora)"
        fontStyle="italic"
        fontWeight="700"
        lineHeight="1.05"
        letterSpacing="-0.02em"
        color="var(--foreground)"
        mb="1.25rem"
      >
        {appName}
      </Box>

      <Text
        fontSize={{ base: "0.9rem", md: "1.1rem" }}
        fontFamily="var(--font-lora)"
        fontStyle="italic"
        color="var(--appColorDarkGrey)"
        letterSpacing="0.03em"
        maxW="34rem"
        mx="auto"
        lineHeight="1.6"
      >
        {/* Your database of e-ink tablets&nbsp;&amp;&nbsp;phones */}
        Your Database of E-Ink Tablets&nbsp;&amp;&nbsp;Phones
      </Text>
    </Box>
  );
}

function FrontPageFunctionalityCard(props) {
  return (
    <Box cursor="pointer">
      <ItemCard
        p={0}
        _hover={{ borderColor: "var(--foreground)" }}
        h="100%"
        borderRadius={"18px"}
        overflow="hidden"
      >
        <Box as="a" height="100%" href={props?.href}>
          <SimpleGrid templateColumns={"1fr 1fr"} height="100%">
            <Box py={"2rem"} pl="2rem" px="1rem">
              <Flex
                as="h3"
                fontSize={"1.2rem"}
                fontWeight="700"
                lineHeight="1.1"
                mb="0.75rem"
                alignItems={"center"}
                gap=".5rem"
                textTransform="uppercase"
                letterSpacing="0.1rem"
                color={"var(--appColorDarkerGrey)"}
              >
                {/* {props?.icon && (
                  <Box color={"var(--appColorAccent)"} opacity={".4"}>
                    {React.createElement(props?.icon)}
                  </Box>
                )} */}
                <Box>{props.title}</Box>
              </Flex>
              <Text
                fontSize="0.82rem"
                color="var(--appColorDarkGrey)"
                lineHeight="1.65"
              >
                {props?.text}
              </Text>
              {props?.cta && (
                <Flex
                  alignItems="center"
                  gap="0.25rem"
                  mt="1rem"
                  fontSize="0.75rem"
                  fontFamily="var(--font-roboto-mono)"
                  letterSpacing="0.06em"
                  color="var(--appColorAccent)"
                >
                  <Text>{props.cta}</Text>
                  {React.createElement(MdArrowForward)}
                </Flex>
              )}
            </Box>
            <Flex
              h="100%"
              w={"100%"}
              backgroundColor={"var(--appColorLightGrey)"}
            >
              <Image src={props?.image} mx="auto" my="auto"></Image>
            </Flex>
          </SimpleGrid>
        </Box>
      </ItemCard>
    </Box>
  );
}

function GenericFrontPageTitle(props) {
  return (
    <Heading
      as="h2"
      mb="1.2rem"
      fontSize={"1.2rem"}
      // fontWeight="700"
      className="appTextFont"
      // textDecor={"underline"}
      textUnderlineOffset={".7rem"}
      fontFamily="var(--font-roboto-mono)"
      letterSpacing="0.15em"
      color="var(--appColorDarkerGrey)"
      textTransform="uppercase"
      {...props}
    >
      {props?.title}
    </Heading>
  );
}
function FrontPageDeviceList(props) {
  const deviceList = props.deviceList?.filter((row) => !row.hideFromFrontPage);
  const numberOfItems = 4;
  const slice = deviceList.slice(0, numberOfItems);

  const moreLinkFilterString = JSON.stringify(props.moreLinkFilter);

  return (
    <Box>
      <GenericFrontPageTitle title={props?.title}></GenericFrontPageTitle>
      <Stack gap={".5rem"}>
        {slice.map((row, idx) => {
          return (
            <Box key={row?.id} minW={0} h={"5rem"}>
              <ItemHorizontalPreviewCard
                itemInfo={row}
              ></ItemHorizontalPreviewCard>
            </Box>
          );
        })}
        {deviceList?.length > numberOfItems && (
          <Box
            as="a"
            href={`/${itemMainRoute}?filters=${moreLinkFilterString}`}
            // fontSize="0.72rem"
            fontFamily="var(--font-roboto-mono)"
            fontWeight={"bold"}
            letterSpacing="0.04em"
            borderRadius="6px"
            // borderRadius={"18px"}

            border="1px solid"
            borderColor="var(--appBorderColor)"
            // color="var(--appColorAccent)"
            _hover={{
              borderColor: "var(--foreground)",
              // backgroundColor: "var(--appColorLight)",
            }}
            py=".5rem"
            px="1rem"
            textAlign={"center"}
            textDecor={"underline"}
            textUnderlineOffset={"2px"}
            textUnderlinePosition={"from-font"}
          >
            More
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function QuickLinksTag(props) {
  return (
    <Flex
      as="a"
      href={`/${itemMainRoute}?filters=`}
      fontSize="0.72rem"
      fontFamily="var(--font-roboto-mono)"
      fontWeight={"bold"}
      letterSpacing="0.04em"
      borderRadius="20px"
      border="1px solid"
      color={"var(--appColorAccent)"}
      borderColor="var(--appColorAccent)"
      _hover={{
        borderColor: "var(--foreground)",
        color: "var(--foreground)",

        // backgroundColor: "var(--appColorLight)",
      }}
      py=".5rem"
      px="1rem"
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box as="span" mr="2px">
        {props.category}
      </Box>
      <MdArrowForward></MdArrowForward>
    </Flex>
  );
}
function FrontPageQuickLinks() {
  const quickLinksCategories = [
    "For Reading",
    "For Note-Taking",
    "Phone Replacements",
    "Kindle Alternatives",
  ];

  const priceCategories = ["Budget", "Mid-range", "High-End"];
  return (
    <>
      <GenericFrontPageTitle title={"Our Best Picks"}></GenericFrontPageTitle>
      <SimpleGrid
        templateColumns={{ base: "1fr", md: "1fr", "2xl": "repeat(4, 1fr)" }}
        columnGap="1rem"
        rowGap={".5rem"}
      >
        {quickLinksCategories?.map((r) => (
          <QuickLinksTag category={r} key={r}></QuickLinksTag>
        ))}
      </SimpleGrid>
      {/* <SimpleGrid
        mt=".5rem"
        templateColumns={{ base: "1fr", md: "1fr", "2xl": "repeat(3, 1fr)" }}
        columnGap="1rem"
        rowGap={'.5rem'}
        
        // mx={{base:"0px", md:'0px', "2xl": "10rem"}}
      >
        {priceCategories?.map((r) => (
          <QuickLinksTag category={r} key={r}></QuickLinksTag>
        ))}
      </SimpleGrid> */}
    </>
  );
}

export default function FrontPage(props) {
  return (
    <Box>
      <Box my="2.5rem">
        <Separator borderColor="var(--appBorderColor)" mb="1.5rem" />
        <FrontPageHero />
        <Separator borderColor="var(--appBorderColor)" mt="1.5rem" />
      </Box>

      <SimpleGrid
        templateColumns={{ base: "1fr", "2xl": "1fr 1fr 1fr" }}
        gap="1rem"
      >
        <FrontPageFunctionalityCard
          title={"Explore"}
          text={"Use our tags and filters to find the best device for you"}
          icon={IoMdCompass}
          href={itemMainRoute}
          image={buildFrontImageUrl("musnap-neo-2c")}
          cta="Browse Devices"
        ></FrontPageFunctionalityCard>
        <FrontPageFunctionalityCard
          title={"Compare"}
          text={"See how two handhelds size up against each other"}
          icon={MdCompare}
          href={`/${itemMainRoute}/compare`}
          image={buildFrontImageUrl("kindle-scribe-colorsoft")}
          cta="Start Comparing"
        ></FrontPageFunctionalityCard>
        <FrontPageFunctionalityCard
          title={"Deep Dive"}
          text={"Browse specs, features, and reviews of any device"}
          icon={MdSearch}
          href={`/${itemMainRoute}`}
          image={buildFrontImageUrl("viwoods-aipaper-reader")}
          cta="View Specs"
        ></FrontPageFunctionalityCard>
      </SimpleGrid>

      <Separator borderColor="var(--appBorderColor)" mt="2.5rem" />

      <Box my="2.5rem">
        <FrontPageQuickLinks></FrontPageQuickLinks>
      </Box>
      <Separator borderColor="var(--appBorderColor)" mt="1.5rem" />

      <Box my="2.5rem">
        <SimpleGrid
          templateColumns={{
            base: "minmax(0, 1fr)",
            "2xl": "repeat(3, minmax(0, 1fr))",
          }}
          // minmax(0, 1fr) allows the grid tracks to be as small as 0 but as large as 1fr, creating columns that will stay equal. But, be aware that this will cause overflows if the content is bigger than the column or cannot be wrapped.
          gap={{ base: "2rem", "2xl": "1rem" }}
        >
          <Box>
            <FrontPageDeviceList
              deviceList={items?.filter((r) => r?.availability === "Available")}
              title={"New Releases"}
              moreLinkFilter={{
                availability: "Available",
              }}
            ></FrontPageDeviceList>
          </Box>

          <FrontPageDeviceList
            deviceList={staffPicks?.map((sp) =>
              items?.find((r) => r?.id === sp),
            )}
            moreLinkFilter={{
              staffPick: true,
            }}
            title={"Staff Picks"}
          ></FrontPageDeviceList>

          <Box>
            <FrontPageDeviceList
              deviceList={items?.filter((r) => r?.availability === "Upcoming")}
              moreLinkFilter={{
                availability: "Upcoming",
              }}
              title={"Coming Soon"}
            ></FrontPageDeviceList>
          </Box>

          <Box></Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
