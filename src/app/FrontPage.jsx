import ItemCard from "@/components/itemCards/ItemCard";
import ItemHorizontalPreviewCard from "@/components/itemCards/ItemHorizontalPreviewCard";
import ItemVerticalPreviewCard from "@/components/itemCards/ItemVerticalPreviewCard";
import AppLink from "@/components/toolsComponents/AppLink";
import { appName, itemMainRoute } from "@/lib/appGlobals";
import { buildFrontImageUrl } from "@/lib/images";
import { items } from "@/lib/item/items";
import {
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdCompass } from "react-icons/io";
import { MdArrowForward, MdCompare, MdSearch } from "react-icons/md";

function FrontPageHero() {
  return (
    <Box
      textAlign="center"
    >
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
        Your database of e-ink tablets&nbsp;&amp;&nbsp;phones
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
              >
                {props?.icon && (
                  <Box color={"var(--appColorAccent)"} opacity={".6"}>
                    {React.createElement(MdArrowForward)}
                  </Box>
                )}
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
                  {React.createElement(MdArrowForward, { size: 13 })}
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

export default function FrontPage(props) {
  return (
    <Box>
      <Box my="2.5rem">
        <Separator borderColor="var(--appBorderColor)" mb="1.5rem" />
        <FrontPageHero />
        <Separator borderColor="var(--appBorderColor)" mt="1.5rem" />
      </Box>

      <SimpleGrid
        templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
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
    </Box>
  );
}
