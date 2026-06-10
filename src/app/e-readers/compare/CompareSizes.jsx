"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  useDisclosure,
  useMediaQuery,
  Icon,
  Portal,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { LuPlus, LuSearch } from "react-icons/lu";
import {
  cardHeight,
  cardHeightPixels,
  cardPadding,
  cardSize,
} from "@/lib/sizes";
import { getItemInfo } from "@/lib/item/items";
import { FaEllipsisVertical, FaRotateLeft, FaTrashCan } from "react-icons/fa6";
import { initialReferences } from "@/lib/compareSizesInitialReferences";
import { buildFittedImageUrl } from "@/lib/images";
import CombinedSearchModal from "@/components/toolsComponents/combinedSearch/CombinedSearchModal";

export default function CompareSizes(props) {
  const defaultSettings = {
    showBorders: false,
    unit: "metric",
    transparency: false,
  };
  const [isScreenLg] = useMediaQuery("(min-width: 1024px)");

  const containerRef = useRef(null);
  const draggableRefs = useRef({});
  const [references, setReferences] = useState(initialReferences);
  const [images, setImages] = useState(
    Object.fromEntries(initialReferences.map((row) => [row.id, row.image])),
  );
  const [displayMode, setDisplayMode] = useState("sideBySide");
  const [multiplier, setMultiplier] = useState();
  const [isActive, setIsActive] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const [objectsToCompare, setObjectsToCompare] = useState([]);
  const [sortObjectsToCompare, setSortObjectsToCompare] = useState(false);

  const [gapWidth, setGapWidth] = useState(0);
  const [lastSelected, setLastSelected] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    open: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclosure();
  const [ongoingDrag, setOngoingDrag] = useState(false);
  const [showIntroductionMessage, setShowIntroductionMessage] = useState(true);

  const [settings, setSettings] = useState(null);

  const containerHeight = cardHeightPixels / 2;

  const deleteColor = "#f46565";
  const computeGapWidth = (otc) => {
    if (!otc) otc = objectsToCompare;

    const comp = parseFloat(
      (containerRef?.current?.offsetWidth * 0.1) / (otc.length - 1),
    );
    return comp.toFixed();
  };
  const computeMultiplier = (otc) => {
    if (!otc) otc = objectsToCompare;
    if (!otc) return 1;
    if (!containerRef?.current?.offsetWidth || otc?.length < 1) return;

    let containerWidth = containerRef?.current?.offsetWidth - 2 * cardPadding;
    // if (!isScreenLg)
      // containerWidth = Math.min(containerWidth, cardSize - 2 * cardPadding); // espaghet

    let widthMultiplier;
    if (displayMode === "sideBySide") {
      containerWidth = containerWidth - (otc.length - 1) * computeGapWidth();
      const ObjectsSumLength = otc?.reduce(
        (acc, row) => acc + row?.dimensionsL,
        0,
      );
      widthMultiplier = containerWidth / ObjectsSumLength;
    } else if (displayMode.includes("overlap")) {
      widthMultiplier =
        containerWidth / Math.max(...otc.map((row) => row?.dimensionsL));
    }

    const heightMultiplier =
      containerHeight / Math.max(...otc.map((row) => row?.dimensionsH));

    const m = Math.min(widthMultiplier, heightMultiplier);
    return m;
  };

  const computeWidth = (row) => {
    const mult = computeMultiplier();
    if (row?.isRotated) return (mult * row.dimensionsH).toFixed();

    return (mult * row.dimensionsL).toFixed();
  };

  const isValidDimensions = (row) => {
    return parseFloat(row?.dimensionsH) > 0 && parseFloat(row?.dimensionsL) > 0;
  };

  const renderImage = (row) => {
    return (
      <Box
        width={`${(computeMultiplier() * row.dimensionsL).toFixed()}px`}
        h={
          row?.isRotated &&
          `${(computeMultiplier() * row.dimensionsH).toFixed()}px`
        }
        _hover={{ opacity: 0.7 }}
        cursor={
          lastSelected?.id === row?.id && ongoingDrag ? "grabbing" : "grab"
        }
      >
        <Image
          src={row.isFromClient ? images[row.id] : buildFittedImageUrl(row.id)}
          alt={`${row.name}`}
          width={`${computeWidth(row)}px`}
          minWidth={`${computeWidth(row)}px`}
          objectFit="cover"
          className={`selectable ${settings?.showBorders && "outlined"} ${
            lastSelected?.id === row.id ? "selectedOutline" : ""
          }`}
          opacity={settings?.transparency ? ".6" : undefined}
          style={
            row?.isRotated
              ? {
                  transform: `rotate(-90deg) translateY(-${
                    computeMultiplier() * row.dimensionsH
                  }px)`,
                  transformOrigin: "top right",
                }
              : undefined
          }
        />
      </Box>
    );
  };
  const preventDragHandler = (e) => {
    e.preventDefault();
  };
  const renderCompareImage = (row, idx) => {
    if (row?.id) {
      if (isValidDimensions(row)) {
        if (!draggableRefs.current[row.id]) {
          draggableRefs.current[row.id] = React.createRef();
        }
        const nodeRef = draggableRefs.current[row.id];
        return (
          <Draggable
            nodeRef={nodeRef}
            bounds="#draggableBounds"
            key={`${row?.id}|${idx}|${resetCounter}`}
            onStart={(e) => {
              setLastSelected(row);
              setOngoingDrag(true);
              setShowIntroductionMessage(false);
            }}
            onStop={(e) => {
              setLastSelected(row);
              setTimeout(() => {
                setOngoingDrag(false);
              }, 100);
            }}
          >
            <Flex
              ref={nodeRef}
              alignItems={"flex-end"}
              justifyItems={"flex-end"}
              position={
                displayMode.includes("overlap") ? "absolute" : undefined
              }
              onDragStart={(e) => {
                preventDragHandler(e);
              }}
              onClick={() => setLastSelected(row)}
              style={{
                zIndex: row.zIndex,
              }}
            >
              {renderImage(row)}
            </Flex>
          </Draggable>
        );
      } else {
        return "Dimensions unavailable";
      }
    }
  };

  const renderSettingsMenuOption = (id, label) => {
    return (
      <Menu.Item value={id} onClick={() => setDisplayMode(id)}>
        {label}
      </Menu.Item>
    );
  };

  const sortByArea = (a, b) => {
    const aSize = a.dimensionsH * a.dimensionsL;
    const bSize = b.dimensionsH * b.dimensionsL;
    if (aSize > bSize) return 1;
    if (aSize < bSize) return -1;
    else return 0;
  };

  const sortByLength = (a, b) => {
    if (a.dimensionsL > b.dimensionsL) return 1;
    if (a.dimensionsL < b.dimensionsL) return -1;
    else return 0;
  };

  const sortByHeight = (a, b) => {
    if (a.dimensionsH > b.dimensionsH) return 1;
    if (a.dimensionsH < b.dimensionsH) return -1;
    else return 0;
  };

  const computeZIndexes = (otc) => {
    const zIndexStart = 1;
    const zIndexGap = 2;
    const otcZIndexes = otc;
    const sorted = otc.toSorted(sortByArea).reverse();

    sorted.forEach((sortedRow, idx) => {
      const otcRowIndex = otc.findIndex((otcRow) => sortedRow.id === otcRow.id);
      otcZIndexes[otcRowIndex] = {
        ...otcZIndexes[otcRowIndex],
        zIndex: zIndexStart + idx * zIndexGap,
      };
    });

    return otcZIndexes;
  };

  const onSelectReference = (id) => {
    if (objectsToCompare.find((row) => row.id === id)) {
      prepareAndSetObjectsToCompare(
        objectsToCompare.filter((row) => row.id !== id),
      );
      if (lastSelected.id === id) {
        setLastSelected(null);
      }
    } else {
      const selectedReference = references.find((row) => row.id === id);

      if (selectedReference?.imageAlts?.length > 0) {
        const random = Math.random();
        if (random >= 0.7) {
          const chosenImage =
            selectedReference.imageAlts?.[
              Math.floor(random * selectedReference.imageAlts.length)
            ];
          setImages((prev) => ({ ...prev, [id]: chosenImage }));
        } else {
          setImages((prev) => ({ ...prev, [id]: selectedReference.image }));
        }
      }

      setLastSelected(selectedReference);
      prepareAndSetObjectsToCompare([...objectsToCompare, selectedReference]);
      onMenuClose();
    }
  };

  const clamshellDimensionsHMultiplier = 0.83;
  const adjustClamshellDimensions = (enhanced) => {
    return enhanced.map((row) => {
      if (row?.formFactor !== "Clamshell") return row;
      return {
        ...row,
        dimensionsH:
          row.dimensionsH + row.dimensionsH * clamshellDimensionsHMultiplier,
      };
    });
  };

  const onAddHandheldReference = (selectId) => {
    let handheldInfo = getItemInfo(selectId);
    if (handheldInfo.formFactor === "Clamshell")
      handheldInfo.dimensionsH =
        handheldInfo.dimensionsH +
        handheldInfo.dimensionsH * clamshellDimensionsHMultiplier;

    const newOtc = [...objectsToCompare, handheldInfo];

    if (references.findIndex((row) => row.id === selectId) === -1) {
      // if new reference
      setReferences((prev) => [handheldInfo, ...prev]);
      setLastSelected(handheldInfo);
      prepareAndSetObjectsToCompare(newOtc);
    } else {
      if (objectsToCompare.findIndex((row) => row.id === selectId) === -1) {
        // if existing reference but unselected
        setLastSelected(handheldInfo);
        prepareAndSetObjectsToCompare(newOtc);
      }
    }
    onMenuClose();
  };

  const setupOtcFromProps = (otc) => {
    let enhanced = adjustClamshellDimensions(otc);
    prepareAndSetObjectsToCompare(enhanced);
  };

  useEffect(() => {
    const lc = localStorage.getItem("compareSettings");

    if (lc !== null) {
      const lcJson = JSON.parse(lc);
      if (lcJson) {
        return setSettings(lcJson);
      }
    }
    setSettings(defaultSettings);
  }, []);

  useEffect(() => {
    if (settings)
      localStorage.setItem("compareSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (
      !containerRef.current ||
      !props.objectsToCompare ||
      props.objectsToCompare?.filter((e) => !!e)?.length <= 0
    )
      return;

    let newImages = images;
    props.objectsToCompare?.forEach((row) => {
      if (row.image) {
        newImages = {
          ...newImages,
          [row.id]: row.image,
        };
      }
    });

    setImages(newImages);

    if (props.objectsToCompare?.length === 1) {
      setupOtcFromProps([
        ...props.objectsToCompare,
        references.find((ref) => ref.id === "credit-card"),
      ]);
    } else {
      setupOtcFromProps(props.objectsToCompare);
    }
  }, [
    containerRef,
    containerRef?.current,
    JSON.stringify(props.objectsToCompare),
  ]);

  const prepareAndSetObjectsToCompare = (newObjectsToCompare) => {
    const enhancedOtc = computeZIndexes(newObjectsToCompare);
    if (containerRef.current) {
      setGapWidth(computeGapWidth(enhancedOtc));
    }

    setMultiplier(computeMultiplier(enhancedOtc));
    setResetCounter((prev) => prev + 1);
    setObjectsToCompare(enhancedOtc);
  };

  useEffect(() => {
    if (!objectsToCompare || objectsToCompare?.filter((e) => !!e)?.length <= 0)
      return;

    setMultiplier(computeMultiplier());
  }, [displayMode]);

  useEffect(() => {
    setResetCounter((prev) => prev + 1);

    const newMult = computeMultiplier();
    setMultiplier(newMult);
  }, [isScreenLg]);

  const onSortClick = (sort) => {
    setResetCounter(resetCounter + 1);
    setDisplayMode("sideBySide");
    setSortObjectsToCompare(sort);
  };

  const reorderObjectsBasedOnSelectedSort = () => {
    if (sortObjectsToCompare === "length") {
      return objectsToCompare.toSorted(sortByLength);
    } else if (sortObjectsToCompare === "height") {
      return objectsToCompare.toSorted(sortByHeight);
    } else if (sortObjectsToCompare === "area") {
      return objectsToCompare.toSorted(sortByArea);
    }

    return objectsToCompare;
  };

  const formatSelectedInfo = (row) => {
    const mmMultiplier = settings?.unit === "imperial" ? 0.0393701 : 1;
    const mmUnit = settings?.unit === "imperial" ? "inch" : "mm";
    const gMultiplier = settings?.unit === "imperial" ? 0.035274 : 1;
    const gUnit = settings?.unit === "imperial" ? "oz" : "g";
    const dimensionsH = parseFloat(
      (row?.dimensionsH * mmMultiplier).toFixed(2),
    );
    const dimensionsL = parseFloat(
      (row?.dimensionsL * mmMultiplier).toFixed(2),
    );
    const dimensionsW = parseFloat(
      (row?.dimensionsW * mmMultiplier).toFixed(2),
    );
    let weight = parseFloat((row?.weight * gMultiplier).toFixed(2));

    return `${row?.name} : ${dimensionsL} x ${dimensionsH} ${
      !isNaN(dimensionsW) ? ` x ${dimensionsW}` : ""
    } ${mmUnit} ${!isNaN(weight) ? `| ${weight} ${gUnit}` : ""}`;
  };

  const menuButtonStyle = {
    borderRightWidth: "0!important",
    borderY: 0,
    borderRadius: 0,
    borderLeftWidth: 1,
    borderLeftColor: "var(--appColorLighterGrey)!important",
    lineHeight: "normal",
  };
  const excludedFromSearchIds = objectsToCompare?.map((rowOtc) => rowOtc.id) ?? [];
  return (
    <>
      {props.objectsToCompare?.filter((e) => !!e)?.length > 0 && (
        <Card.Root
          variant={"outline"}
          borderColor={"var(--appColorDarkGrey)!important"}
          ref={containerRef}
          backgroundColor={"var(--appColorCardBackground)"}
        >
          {containerRef?.current && (
            <>
              <Flex>
                <ButtonGroup
                  variant={"outline"}
                  borderBottomWidth={isActive && "1px"}
                  borderBottomColor={"var(--appColorDarkGrey)!important"}
                  borderBottomRadius={0}
                  textAlign={"left"}
                  alignContent={"flex-start"}
                  attached
                  justifyContent="space-between"
                  width={"100%"}
                  color={"var(--appColorCardBackgroundInvert)!important"}
                >
                  <Button
                    textAlign={"left"}
                    alignContent={"flex-start"}
                    onClick={() => setIsActive(!isActive)}
                    justifyContent={"flex-start"}
                    m={0}
                    variant={"ghost"}
                  >
                    <Heading size={"md"}> Size Difference</Heading>
                  </Button>
                  {isActive && (
                    <Flex>
                      <Menu.Root
                        closeOnSelect={false}
                        open={isMenuOpen}
                        onClose={onMenuClose}
                      >
                        <Menu.Trigger asChild>
                          <IconButton
                            onClick={onMenuToggle}
                            {...menuButtonStyle}
                          >
                            <LuPlus />
                          </IconButton>
                        </Menu.Trigger>
                        <Menu.ItemGroup>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content>
                                <Menu.ItemGroup
                                  title="References"
                                  value={
                                    references
                                      .filter(
                                        (menuRow) =>
                                          objectsToCompare?.findIndex(
                                            (otcRow) =>
                                              otcRow.id === menuRow.id,
                                          ) >= 0,
                                      )
                                      ?.map((row) => row.id) ?? []
                                  }
                                >
                                  <Menu.CheckboxItem
                                    key={"handheldSearch"}
                                    value={"handheldSearch"}
                                    onClick={() => {
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    <Icon mr={".5rem"} mt={-1} asChild>
                                      <LuSearch />
                                    </Icon>
                                    Add Handheld
                                  </Menu.CheckboxItem>
                                </Menu.ItemGroup>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.ItemGroup>
                      </Menu.Root>

                      <Menu.Root>
                        <Menu.Trigger asChild>
                          <Button {...menuButtonStyle}>Sort</Button>
                        </Menu.Trigger>
                        <Menu.ItemGroup>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content>
                                <Menu.Item
                                  onSelect={() => {
                                    onSortClick("height");
                                  }}
                                  value="height"
                                >
                                  By Height
                                </Menu.Item>
                                <Menu.Item
                                  onSelect={() => {
                                    onSortClick("length");
                                  }}
                                  value="length"
                                >
                                  By Length
                                </Menu.Item>
                                <Menu.Item
                                  onSelect={() => {
                                    onSortClick("area");
                                  }}
                                  value="area"
                                >
                                  By Area
                                </Menu.Item>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.ItemGroup>
                      </Menu.Root>
                      <Button
                        onClick={() => {
                          setResetCounter(resetCounter + 1);
                          setDisplayMode("overlapCenter");
                        }}
                        {...menuButtonStyle}
                      >
                        Center
                      </Button>
                      <Menu.Root closeOnSelect={false}>
                        <Menu.Trigger asChild>
                          <Button
                            {...menuButtonStyle}
                            borderTopRightRadius="4.5px"
                          >
                            <FaEllipsisVertical></FaEllipsisVertical>
                          </Button>
                        </Menu.Trigger>
                        <Portal>
                          <Menu.Positioner>
                            <Menu.Content>
                              <Menu.ItemGroup
                                defaultValue={"borders"}
                                value={settings?.showBorders ? ["borders"] : []}
                              >
                                <Menu.CheckboxItem
                                  onClick={() => {
                                    setSettings((prev) => ({
                                      ...prev,
                                      showBorders: !prev.showBorders,
                                    }));
                                  }}
                                  value={"borders"}
                                >
                                  Image borders
                                </Menu.CheckboxItem>
                              </Menu.ItemGroup>
                              <Menu.ItemGroup
                                value={
                                  settings?.transparency ? ["transparency"] : []
                                }
                              >
                                <Menu.CheckboxItem
                                  onClick={() => {
                                    setSettings((prev) => ({
                                      ...prev,
                                      transparency: !prev.transparency,
                                    }));
                                  }}
                                  value={"transparency"}
                                >
                                  Transparency
                                </Menu.CheckboxItem>
                              </Menu.ItemGroup>
                              <Menu.RadioItemGroup
                                title="Unit"
                                defaultValue={settings?.unit}
                              >
                                <Menu.RadioItem
                                  onClick={() => {
                                    setSettings((prev) => ({
                                      ...prev,
                                      unit: "metric",
                                    }));
                                  }}
                                  value={"metric"}
                                >
                                  Metric (mm, g)
                                </Menu.RadioItem>
                                <Menu.RadioItem
                                  onClick={() => {
                                    setSettings((prev) => ({
                                      ...prev,
                                      unit: "imperial",
                                    }));
                                  }}
                                  value={"imperial"}
                                >
                                  Imperial (inch, oz)
                                </Menu.RadioItem>
                              </Menu.RadioItemGroup>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Portal>
                      </Menu.Root>
                    </Flex>
                  )}
                </ButtonGroup>
              </Flex>
              {isActive && (
                <>
                  <Card.Body height={cardHeight} pt={"2px"}>
                    <Box
                      fontSize="sm"
                      color={"var(--appColorDarkGrey)"}
                      pb=".5rem"
                      pt="3px"
                    >
                      {!lastSelected?.id ? (
                        <Center
                          visibility={
                            !showIntroductionMessage ? "hidden" : undefined
                          }
                        >
                          Drag and drop devices to move them around
                        </Center>
                      ) : (
                        <Center>
                          <>{formatSelectedInfo(lastSelected)}</>
                          <Box
                            ml="1rem"
                            top={"-2px"}
                            position={"relative"}
                            height={"10px"}
                            cursor={"pointer"}
                            _hover={{ opacity: 0.6 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();

                              prepareAndSetObjectsToCompare(
                                objectsToCompare?.map((row) => {
                                  if (row.id === lastSelected?.id) {
                                    return {
                                      ...row,
                                      dimensionsH: row?.dimensionsL,
                                      dimensionsL: row?.dimensionsH,
                                      isRotated: !row?.isRotated,
                                    };
                                  } else return row;
                                }),
                              );
                            }}
                          >
                            <Icon asChild color="var(--appColorAccentDark)">
                              <FaRotateLeft></FaRotateLeft>
                            </Icon>
                          </Box>
                          <Box
                            ml="1rem"
                            top={"-2px"}
                            position={"relative"}
                            height={"10px"}
                            cursor={"pointer"}
                            _hover={{ opacity: 0.6 }}
                            onClick={() => {
                              prepareAndSetObjectsToCompare(
                                objectsToCompare.filter(
                                  (row) => row.id !== lastSelected?.id,
                                ),
                              );
                              setLastSelected(null);
                            }}
                          >
                            {references
                              .map((row) => row.id)
                              ?.includes(lastSelected?.id) && (
                              <Icon asChild color={deleteColor}><FaTrashCan></FaTrashCan></Icon>
                            )}
                          </Box>
                        </Center>
                      )}
                    </Box>
                    <Flex
                      justifyContent={"center"}
                      alignItems={
                        displayMode.includes("overlap") ? "center" : "flex-end"
                      }
                      position={"relative"}
                      id="draggableBounds"
                      height={cardHeightPixels - 80}
                      onClickCapture={(e) => {
                        const emptySpace =
                          !e?.target?.className?.includes("selectable");
                        if (emptySpace && !ongoingDrag) {
                          setLastSelected(null);
                        }
                      }}
                    >
                      {(sortObjectsToCompare
                        ? reorderObjectsBasedOnSelectedSort(objectsToCompare)
                        : objectsToCompare
                      ).map((row, idx) => {
                        return (
                          <React.Fragment key={row.id}>
                            {renderCompareImage(row, idx)}
                            {displayMode === "sideBySide" &&
                              idx !== objectsToCompare.length - 1 && (
                                <Box width={`${gapWidth}px`}></Box>
                              )}
                          </React.Fragment>
                        );
                      })}
                    </Flex>
                    {/* <Box position={"absolute"} onClick={(e) => e.preventDefault(e)} size="sm" color={"var(--appColorLightGrey)"} bottom={"0.5rem"} right={"1rem"}>retrocatalog.com </Box> */}
                  </Card.Body>
                </>
              )}
            </>
          )}
        </Card.Root>
      )}
      <CombinedSearchModal
        isModalOpen={isModalOpen}
        text="Add a Handheld as a Reference"
        setIsModalOpen={setIsModalOpen}
        onSelect={onAddHandheldReference}
        searchList={{
          unsorted: props.searchList?.unsorted?.filter(
            (row) => !excludedFromSearchIds.includes(row.id),
          ),
          alphabetical: props.searchList?.alphabetical?.filter(
            (row) => !excludedFromSearchIds.includes(row.id),
          ),
        }}
        noSpecialType
        closeButton
        singleTab="e-readers"
      ></CombinedSearchModal>
    </>
  );
}
