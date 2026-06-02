/* eslint-disable react-hooks/immutability */
// Beware of Spaghetti.
"use client";
import {
  React,
  startTransition,
  useEffect,
  useState,
  useTransition,
  useCallback,
} from "react";

import sections from "../../app/lib/sections";
import {
  Steps,
  Button,
  Box,
  Checkbox,
  Heading,
  Drawer,
  Accordion,
  Center,
  Stack,
  RadioGroup,
  Grid,
  GridItem,
  useDisclosure,
  Spinner,
  Portal,
} from "@chakra-ui/react";

import consoleDefInitial from "@/resources/def/consoleDefForHandhelds.json";

const consoleDef = consoleDefInitial.toReversed();

import IconsWrapper from "./IconsWrapper";
import { fetchFilterValues } from "../../app/lib/serverRequests";

import { useSearchParams } from "next/navigation";
import {
  additionalSectionFilters,
  filtersDef,
  generalFilters,
  specialCategoryFilters,
} from "@/resources/def/filtersDef";

function ApplyFilterButton(props) {
  const [isPendingApplyFilter, startTransitionApplyFilter] = useTransition();

  const handleClick = () => {
    startTransitionApplyFilter(() => {
      props.onApply();
    });
  };

  return (
    <Button
      onClick={handleClick}
      backgroundColor={"var(--appColorAccent)"}
      color={"var(--appColorCardBackgroundInvert)"}
      _hover={{
        backgroundColor: "var(--appColorAccentLight)",
      }}
      _active={{}}
      loading={isPendingApplyFilter || props.isLoadingApplyFilter}
    >
      {`Apply - ${props.countResults()} results`}
    </Button>
  );
}

export default function Filters(props) {
  const [filterValues, setFilterValues] = useState(null);
  const [maxActiveIndex, setMaxActiveIndex] = useState(0);
  const { open, onOpen, onClose } = useDisclosure();
  const [isPendingClose, startTransitionClose] = useTransition();
  const [localWipValues, setLocalWipValues] = useState({});

  const searchParams = useSearchParams();

  const handleClose = () => {
    startTransitionClose(() => {
      props.onClose();
    });
  };

  useEffect(() => {
    if (props.filters?.length > 0) {
      setLocalWipValues((prev) => {
        const wipValues = {};
        let hasChanges = false;
        props.filters.forEach((f) => {
          if (f.wip) {
            wipValues[f.key] = f.wip;
            // Check if value actually changed
            if (
              !prev[f.key] ||
              prev[f.key].active !== f.wip.active ||
              prev[f.key].value !== f.wip.value
            ) {
              hasChanges = true;
            }
          }
        });
        // Only update if there are actual changes
        return hasChanges ? wipValues : prev;
      });
    }
  }, [props.filters]);

  const handleFilterChange = useCallback(
    (key, value) => {
      // Update local state immediately for instant UI feedback
      setLocalWipValues((prev) => ({
        ...prev,
        [key]: {
          value: value,
          active: !!value,
        },
      }));

      // Update parent state in background with startTransition
      startTransition(() => {
        props.setFilters(
          props.filters.map((f) => {
            if (f.key === key) {
              f.wip = {
                value: value,
                active: !!value,
              };
            }
            return f;
          }),
          true,
        );
      });
    },
    [props.filters, props.setFilters],
  );

  const matchFilters = (newFilters, allFilters) => {
    let appliedFilters = allFilters;
    if (newFilters.length > 0) {
      newFilters.map(([key, value], idx) => {
        appliedFilters = appliedFilters.map((filter) => {
          if (filter?.key?.toLowerCase() === key.toLowerCase())
            return { ...filter, active: true, value: value };
          else return filter;
        });
      });
    }

    return appliedFilters;
  };

  const setFiltersFromUrl = (allFilters) => {
    const urlFiltersString = searchParams.get("filters");

    if (!urlFiltersString) return allFilters;
    const urlFiltersJSON = JSON.parse(urlFiltersString);
    if (!urlFiltersJSON) return allFilters;
    const urlFilters = Object.entries(urlFiltersJSON);

    return matchFilters(urlFilters, allFilters);
  };

  const setFiltersFromInitialFilters = (allFilters) => {
    if (!props.initialFilters) return allFilters;
    const initialFilterEntries = Object.entries(props.initialFilters);

    return matchFilters(initialFilterEntries, allFilters);
  };

  const initFilters = () => {
    if (props.setFiltersReady) props.setFiltersReady(false);
    fetchFilterValues().then((fv) => {
      setFilterValues(fv);

      let allFilters = filtersDef;
      allFilters = setFiltersFromUrl(allFilters);
      allFilters = setFiltersFromInitialFilters(allFilters);
      allFilters = allFilters.map((f, idx) => ({
        ...f,
        wip: { active: f.active, value: f.value },
        index: idx,
      }));
      props.setFilters(allFilters);

      setMaxActiveIndex(allFilters.length);
      if (props.setFiltersReady) props.setFiltersReady(true);
    });
  };

  let isFirstLoad = true;
  useEffect(() => {
    if (isFirstLoad) {
      initFilters();
      isFirstLoad = false;
    }
  }, []);

  const applyFilters = () => {
    props.setIsLoadingApplyFilter(true);
    const applied = props.filters.map((f) => {
      let index = f.index;
      if (!f.active && f.wip.active) {
        index = maxActiveIndex + 1;
        setMaxActiveIndex(maxActiveIndex + 1);
      }

      const newF = {
        ...f,
        active: f.wip?.active,
        value: f.wip?.value,
        index: index,
      };
      return newF;
    });
    props.setFilters(applied);
    props.onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = props.filters.map((f) => ({
      ...f,
      active: false,
      value: false,
      wip: {
        active: false,
        value: false,
      },
    }));
    props.setFilters(clearedFilters);
  };

  // TODO: Communilize all render filters functions
  const renderConsoleCompatibilityFilters = () => {
    const defaultIndex = consoleDef.some((console) => {
      if (props.filtersToOpenByDefault) {
        return isFilterToOpenByDefault(console, true, "attribute");
      }
      return props.filters.find((f) => f.key === console.attribute)?.active;
    })
      ? [0]
      : undefined;
    return (
      <>
        <Accordion.Root
          multiple
          collapsible={false}
          defaultValue={defaultIndex}
        >
          <Accordion.Item value="item-consoleCompatibility">
            <Accordion.ItemTrigger>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                // fontWeight={"bold"}
              >
                <Box display="inline">
                  <IconsWrapper
                    icon={sections.consoleCompatibility.icon}
                    style={{ width: "2rem" }}
                    color={
                      consoleDef.some(
                        (console) => localWipValues[console.attribute]?.active,
                      )
                        ? "var(--appColorAccent)"
                        : undefined
                    }
                  ></IconsWrapper>
                </Box>
                <Box display={"inline"}>Consoles - Emulation Performance</Box>
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Box
                  borderLeftWidth={"2px"}
                  borderColor={"var(--appColorLighterGrey)"}
                  ml={5}
                  display="flex"
                  flexDirection={"column"}
                >
                  {consoleDef.map((console) => (
                    <Checkbox.Root
                      key={console.label}
                      ml={3}
                      onCheckedChange={({ checked }) =>
                        handleFilterChange(console.attribute, checked)
                      }
                      checked={
                        localWipValues[console.attribute]?.active || false
                      }
                      mb="3px"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>{console.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </Box>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </>
    );
  };

  const renderSpecialCategoryFilters = () => {
    const defaultIndex = specialCategoryFilters.some((specialCategory) => {
      if (props.filtersToOpenByDefault) {
        return isFilterToOpenByDefault(specialCategory, true);
      }
      return props.filters.find((f) => f.key === specialCategory.key)?.active;
    })
      ? [0]
      : undefined;

    return (
      <>
        <Accordion.Root
          multiple
          collapsible={false}
          defaultValue={defaultIndex}
        >
          <Accordion.Item value="item-specialCategory">
            <Accordion.ItemTrigger>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                // fontWeight={"bold"}
              >
                <Box display="inline">
                  <IconsWrapper
                    icon={"fa-list"}
                    style={{ width: "2rem" }}
                    color={
                      specialCategoryFilters.some(
                        (specialCategory) =>
                          localWipValues[specialCategory.key]?.active,
                      )
                        ? "var(--appColorAccent)"
                        : undefined
                    }
                  ></IconsWrapper>
                </Box>
                <Box display="inline">Category</Box>
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Box
                  ml={5}
                  display="flex"
                  flexDirection={"column"}
                  borderLeftWidth={"2px"}
                  borderColor={"var(--appColorLighterGrey)"}
                >
                  {specialCategoryFilters.map((specialCategory) => {
                    if (specialCategory.doNotRender) return;
                    return (
                      <Checkbox.Root
                        key={specialCategory.key}
                        ml={3}
                        onCheckedChange={({ checked }) =>
                          handleFilterChange(specialCategory.key, checked)
                        }
                        checked={
                          localWipValues[specialCategory.key]?.active || false
                        }
                      mb="3px"
                        
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label>{specialCategory.label}</Checkbox.Label>
                      </Checkbox.Root>
                    );
                  })}
                </Box>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </>
    );
  };

  const renderAdditionalSectionFilters = (key, section) => {
    const filter = additionalSectionFilters?.find((e) => e.key === key);
    return (
      filter?.children?.length > 0 && (
        <Box
          // pl={"1rem"}
          ml={"1rem"}
          // borderLeftWidth={"2px"}
          // borderColor={"var(--appColorLighterGrey)"}
        >
          {renderRadioFilters(
            additionalSectionFilters?.filter((f) =>
              filter?.children?.includes(f.key),
            ),
            true,
          )}
        </Box>
      )
    );
  };
  const renderSectionFilters = () => {
    // SPAGETTI WARNING !!!!!!!!!!
    let filteredSections = Object.entries(sections)
      .map(([k, section]) => {
        if (
          section.attributes.some((e) => e.type === "tag") ||
          additionalSectionFilters.some((e) => e.key === k)
        ) {
          return [k, section];
        }
      })
      .filter((e) => !!e);

    let defaultIndex = [];
    if (props.filtersToOpenByDefault) {
      defaultIndex = filteredSections
        .map(([sectionKey, section], idx) => {
          if (section.doNotRender) return;
          if (
            section.attributes.some((tag) =>
              props.filtersToOpenByDefault.includes(tag.attribute),
            ) ||
            additionalSectionFilters
              ?.find((asf) => asf.key === sectionKey)
              ?.children.some((child) =>
                props.filtersToOpenByDefault.includes(child),
              )
          )
            return idx;
          return null;
        })
        ?.filter((idx) => idx !== null);
    } else {
      defaultIndex = filteredSections
        ?.map(([sectionKey, section], idx) => {
          if (
            section.attributes.some(
              (tag) =>
                props.filters.find((f) => f.key === tag.attribute)?.active,
            ) ||
            isOneOfTheChildrenFiltersActive(
              additionalSectionFilters?.find((asf) => asf.key === sectionKey),
            )
          )
            return idx;
          return null;
        })
        ?.filter((idx) => idx !== null);
    }

    return (
      <Accordion.Root multiple collapsible={false} defaultValue={defaultIndex}>
        {filteredSections.map(([sectionKey, section], idx) => (
          <Box key={idx}>
            <Accordion.Item defaultChecked value={`item-${idx}`}>
              <Accordion.ItemTrigger>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  // FfontWeight={"bold"}
                >
                  <Box display="inline">
                    <IconsWrapper
                      icon={section.icon}
                      color={
                        section.attributes
                          .filter((e) => e.type === "tag")
                          .some(
                            (tag) => localWipValues[tag.attribute]?.active,
                          ) ||
                        isOneOfTheChildrenFiltersActive(
                          additionalSectionFilters?.find(
                            (asf) => asf.key === sectionKey,
                          ),
                        )
                          ? "var(--appColorAccent)"
                          : undefined
                      }
                      style={{ width: "2rem" }}
                    ></IconsWrapper>
                  </Box>
                  <Box display="inline">{section.label}</Box>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pr={0}>
                <Accordion.ItemBody>
                  <Box
                    ml={5}
                    display="flex"
                    flexDirection={"column"}
                    borderLeftWidth={"2px"}
                    borderColor={"var(--appColorLighterGrey)"}
                  >
                    {renderAdditionalSectionFilters(sectionKey, section)}

                    {section.attributes
                      .filter((e) => e.type === "tag")
                      .map((tag) => (
                        <Checkbox.Root
                          key={tag.label}
                          ml={3}
                          onCheckedChange={({ checked }) =>
                            handleFilterChange(tag.attribute, checked)
                          }
                          checked={
                            localWipValues[tag.attribute]?.active || false
                          }
                      mb="3px"

                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Label>{tag.label}</Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Box>
        ))}
      </Accordion.Root>
    );
  };
  const isRadioChecked = useCallback(
    (filter, filterValue) => {
      const wipValue = localWipValues[filter.key];
      return wipValue?.value === filterValue && wipValue?.active;
    },
    [localWipValues],
  );

  const isRadioFilterActive = useCallback(
    (filter) => {
      const wipValue = localWipValues[filter.key];
      return wipValue?.value && wipValue?.active;
    },
    [localWipValues],
  );

  const isOneOfTheChildrenFiltersActive = useCallback(
    (filter) => {
      return filter?.children?.some((child) => {
        const wipValue = localWipValues[child];
        return wipValue?.value && wipValue?.active;
      });
    },
    [localWipValues],
  );

  const isFilterToOpenByDefault = (filter, toReturn, key = "key") => {
    if (
      props.filtersToOpenByDefault?.includes(filter[key]) ||
      filter.children?.some((child) =>
        props.filtersToOpenByDefault?.includes(child.key),
      )
    )
      return toReturn;
    return null;
  };
  const renderRadioFilters = (appliedRadiofilters, isChildRender) => {
    const defaultIndex = appliedRadiofilters
      ?.map((filter, idx) => {
        if (props.filtersToOpenByDefault) {
          return isFilterToOpenByDefault(filter, idx);
        } else if (
          isRadioFilterActive(filter) ||
          isOneOfTheChildrenFiltersActive(filter)
        )
          return idx;
        return null;
      })
      ?.filter((idx) => idx !== null);
    return (
      <Accordion.Root multiple defaultValue={defaultIndex}>
        {(isChildRender
          ? appliedRadiofilters
          : appliedRadiofilters?.filter((f) => f.parent === undefined)
        )?.map((filter) => {
          if (filter.doNotRender) return;
          if (filterValues?.[filter.key] || filter.children?.length > 0) {
            return (
              <Accordion.Item
                key={filter.key}
                defaultChecked
                // borderBottom={isChildRender ? undefined: "hidden"}

                value={`item-${filter.key}`}
              >
                <Accordion.ItemTrigger>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    // fontWeight={"bold"}
                  >
                    <Box display="inline">
                      <IconsWrapper
                        icon={filter.icon}
                        style={{ width: "2rem" }}
                        color={
                          isRadioFilterActive(filter) ||
                          isOneOfTheChildrenFiltersActive(filter)
                            ? "var(--appColorAccent)"
                            : undefined
                        }
                      ></IconsWrapper>
                    </Box>
                    <Box display="inline">{filter.label}</Box>
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent pr={0}>
                  <Accordion.ItemBody>
                    <Box
                      borderLeftWidth={"2px"}
                      borderColor={"var(--appColorLighterGrey)"}
                      ml={5}
                    >
                      {filter.note && (
                        <Box
                          ml="1rem"
                          mb=".5rem"
                          color="var(--appColorLightGrey)"
                        >
                          {filter.note}
                        </Box>
                      )}

                      {filter.children?.length > 0 && (
                        <Box
                          // pl={"1rem"}
                          ml={"1rem"}
                        >
                          {renderRadioFilters(
                            appliedRadiofilters?.filter((f) =>
                              filter?.children?.includes(f.key),
                            ),
                            true,
                          )}
                        </Box>
                      )}
                      <RadioGroup.Root
                        value={
                          localWipValues[filter.key]?.active
                            ? (localWipValues[filter.key]?.value ?? "__all__")
                            : "__all__"
                        }
                        onValueChange={(e) => {
                          if (e.value === "__all__") {
                            handleFilterChange(filter.key, false);
                          } else {
                            handleFilterChange(filter.key, e.value);
                          }
                        }}
                      >
                        <Stack display="flex" flexDirection={"column"}>
                          {filterValues?.[filter.key]?.length && (
                            <>
                              {filterValues?.[filter.key]?.filter((v) => v != null)?.map(
                                (filterValue) => (
                                  <RadioGroup.Item
                                    key={filterValue}
                                    value={filterValue}
                                    ml={3}
                                  >
                                    <RadioGroup.ItemHiddenInput />
                                    <RadioGroup.ItemIndicator />
                                    <RadioGroup.ItemText>
                                      {filterValue}
                                    </RadioGroup.ItemText>
                                  </RadioGroup.Item>
                                ),
                              )}
                              <RadioGroup.Item value="__all__" ml={3}>
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>All</RadioGroup.ItemText>
                              </RadioGroup.Item>
                            </>
                          )}
                        </Stack>
                      </RadioGroup.Root>
                    </Box>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            );
          }
        })}
      </Accordion.Root>
    );
  };

  const renderFilterCount = () => {
    return `(${props.filters?.filter((f) => f.active)?.length ?? 0} Active)`;
  };

  useEffect(() => {
    if (props.isOpenFilters === true) {
      onOpen();
      props.setIsLoadingFilter(false);
    } else {
      onClose();
    }
  }, [JSON.stringify(props.isOpenFilters)]);

  return (
    <>
      <Drawer.Root
        placement={"end"}
        open={open}
        size="sm"
        onOpenChange={(e) => {
          if (!e.open) {
            handleClose();
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              {isPendingClose && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.3)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex={9999}
                >
                  <Spinner
                    size="xl"
                    color="var(--appColorDarkGrey)"
                    borderWidth="4px"
                  />
                </Box>
              )}
              <Drawer.CloseTrigger />
              <Drawer.Header borderBottomWidth="1px">
                <Drawer.Title>Filters &nbsp;</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Center>
                  <Heading size={"md"} m={"0.5em"}>
                    General
                  </Heading>
                </Center>
                {renderRadioFilters(generalFilters)}
                {renderSpecialCategoryFilters()}
                <Center>
                  <Heading size={"md"} m={"0.5em"}>
                    Specifications
                  </Heading>
                </Center>
                {renderConsoleCompatibilityFilters()}
                {renderSectionFilters()}
              </Drawer.Body>
              <Drawer.Footer>
                <Stack w={"100%"}>
                  <Grid templateColumns={"1fr 1fr"} gap={".5rem"}>
                    <GridItem>{props.displayModeButton}</GridItem>
                    <GridItem>{props.sortingButton}</GridItem>
                  </Grid>
                  <ApplyFilterButton
                    onApply={applyFilters}
                    countResults={() => props.countResults(true)}
                    isLoadingApplyFilter={props.isLoadingApplyFilter}
                  />
                  <Button
                    variant="outline"
                    className="hoverColor"
                    color={"var(--appColorCardBackgroundInvert)"}
                    // bgColor={"var(--appColorCardBackground)"}
                    onClick={() => clearAllFilters()}
                  >
                    Clear All Filters
                  </Button>
                </Stack>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
