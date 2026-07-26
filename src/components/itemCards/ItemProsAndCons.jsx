"use client";
import { Box, Center, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import ItemCard from "./ItemCard";
import { PiThumbsDownBold, PiThumbsUpBold } from "react-icons/pi";

export default function ItemProsAndCons(props) {
  const [showMore, setShowMore] = useState({
    Pros: false,
    Cons: false,
  });

  const renderProOrCon = (prosOrCons, title, Icon, color) => {
    const sliceLength = props.sliceLength ?? 4;
    return (
      <ItemCard height="100%">
        <Box px="1rem" pb=".5rem">
          <Center>
            <HStack mb={2} borderRadius={3}>
              <Icon
                size="18"
                fontWeight="900"
                color={color}
                style={{ flexShrink: 0 }}
              />
              {/* <FaCheck 
            size="16"
             fontSize={"2rem"}></FaCheck> */}
              <Heading
                as="h2"
                fontSize={"lg"}
                fontFamily={"var(--font-roboto-mono), Arial, sans-serif"}
                color="var(--appColorAccent)"
              >
                {title}
              </Heading>
            </HStack>
          </Center>
          <Box pl={5}>
            <ul style={{ listStyleType: "disc" }}>
              {prosOrCons?.slice(0, sliceLength).map((item, idx) => {
                return <Box as="li" key={idx}>{item.text}</Box>;
              })}
              {!showMore[title] && prosOrCons?.length > sliceLength && (
                <li>
                  <Box
                    style={{
                      textDecoration: "underline",
                      textUnderlineOffset: ".3rem",
                    }}
                    display="inline"
                    _hover={{ color: "var(--appColorAccent)" }}
                    cursor={"pointer"}
                    aria-expanded={showMore[title]}
                    aria-controls={`${title}-expanded-content`}
                    asChild
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowMore((prev) => ({
                          ...prev,
                          [title]: true,
                        }));
                      }}
                    >
                      More...
                    </button>
                  </Box>
                </li>
              )}
              <Box
                as="span"
                id={`${title}-expanded-content`}
                aria-hidden={!showMore[title]}
              >
                {prosOrCons
                  ?.slice(sliceLength, prosOrCons?.length)
                  .map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        style={{
                          display: showMore[title] ? "list-item" : "none",
                        }}
                      >
                        {item.text}
                      </li>
                    );
                  })}
              </Box>
            </ul>
          </Box>
        </Box>
      </ItemCard>
    );
  };

  return (
    <>
      {(props.itemInfo?.pros?.length > 0 ||
        props.itemInfo?.cons?.length > 0) && (
        <SimpleGrid
          templateColumns={{ base: "1fr", "2xl": "1fr 1fr" }}
          gap={".5rem"}
        >
          {renderProOrCon(
            props.itemInfo?.pros,
            "Pros",
            PiThumbsUpBold,
            "var(--appColorAccent)",
          )}
          {renderProOrCon(
            props.itemInfo?.cons,
            "Cons",
            PiThumbsDownBold,
            "var(--appColorAccent)",
          )}
        </SimpleGrid>
      )}
    </>
  );
}
