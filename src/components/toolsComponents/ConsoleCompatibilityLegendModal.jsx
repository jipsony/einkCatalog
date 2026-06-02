import { Steps, Box, Center, color, Divider, Stack, useDisclosure, Dialog, Portal } from "@chakra-ui/react";
import { Tooltip } from '@/components/ui/tooltip';
import React, { useState } from "react";
import ConsoleCompatibilityTag from "../ConsoleCompatibilityTag";
import IconsWrapper from "./IconsWrapper";
import sections from "@/app/lib/sections";
import colorMap from "./ConsoleCompatibilityColorMap";

export default function ConsoleCompatibilityLegendModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const ratingsToLookFor = ["A", "B", "C", "D", "F"];

  // const consolesToUseForLegend = ratingsToLookFor
  //   .map((r) =>
  //     sections.consoleCompatibility.attributes.find(
  //       (c) => props.handheldInfo[c.attribute] === r
  //     )
  //   )
  //   ?.filter(Boolean);

  const legend = {
    "0": "0 - Unplayable",
    "10": "1 - 10",
    "20": "10 - 20",
    "30": "20 - 30 ",
    "40": "30 - 40",
    "50": "40 - 50",
    "60": "50 - 60",
    "70": "60 - 70",
    "80": "70 -80",
    "90": "80 - 90",
    "100": "90 - 100 The best performance",
  };

  return (
    <>
      <Box
        width="2rem"
        height="1.5rem"
        fontSize="11px"
        onClick={() => setIsModalOpen(true)}
        cursor={"pointer"}
        _hover={{ color: "var(--appColorAccentDark)" }}
        color={"var(--appColorDarkGrey)"}
      >
        <IconsWrapper icon="fa-question"></IconsWrapper>
      </Box>
      <Dialog.Root
        open={isModalOpen}
        size={{ sm: "2xl", base: "lg" }}
        onOpenChange={e => {
          if (!e.open) {
            setIsModalOpen(false);
          }
        }}
      >
        <Portal>

          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content mx=".5rem" backgroundColor={"var(--appColorBackground)"}>
              <Dialog.Header textAlign={"center"}>
                {" "}
                Emulation Performance Legend{" "}
              </Dialog.Header>
              <Dialog.Body px="2rem" pb="2rem">
                <Box fontSize="13px">
                  <Box pb="1rem" textAlign={"center"}>
                    Colors and scores indicate emulation performance. Scores are out of 100
                  </Box>
                  <Center>
                    <Stack>
                      {Object.entries(legend)?.map(([score, label], idx) => {
                        return (
                          <Box key={idx}>
                            <Box display={"inline-block"} width={"20rem"}>
                              <ConsoleCompatibilityTag
                                label={label}
                                score={parseFloat(score)}
                                hideScore={score !== 100}
                                // attribute={c.attribute}
                              ></ConsoleCompatibilityTag>
                            </Box>
                            {/* <Box display={"inline-block"}>
                          {colorMap?.[props.handheldInfo[c.attribute]]?.tooltip}
                        </Box> */}
                            {/* {idx !== legend?.length - 1 && (
                          <Divider></Divider>
                        )} */}
                          </Box>
                        );
                      })}
                    </Stack>
                  </Center>
                  {/* {consolesToUseForLegend.map((c, idx) => {
                    return (
                      <Box key={idx} mt={idx !== 0 && ".6rem"}>
                        <Box display={"inline-block"} width={"8rem"} mr="1rem">
                          <ConsoleCompatibilityTag
                            label={c.label}
                            score={props.handheldInfo[c.attribute]}
                            attribute={c.attribute}
                          ></ConsoleCompatibilityTag>
                        </Box>
                        <Box display={"inline-block"}>
                          {colorMap?.[props.handheldInfo[c.attribute]]?.tooltip}
                        </Box>
                        {idx !== consolesToUseForLegend?.length - 1 && (
                          <Divider></Divider>
                        )}
                      </Box>
                    );
                  })} */}
                </Box>
                <Box pt="1rem" color={"var(--appColorDarkGrey)"} textAlign={"center"}>
                  Please note that the performance ratings are estimates and may
                  vary in real-world usage
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>

        </Portal>
      </Dialog.Root>
    </>
  );
}
