// Beware of Spaghetti.
"use client";
import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
  useCallback,
  useRef,
} from "react";

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
  CloseButton,
  Slider,
  NumberInput,
} from "@chakra-ui/react";

import { FaList } from "react-icons/fa6";

import { useSearchParams } from "next/navigation";
import {
  additionalSectionFilters,
  filtersDef,
  generalFilters,
  specialCategoryFilters,
} from "./filtersDef";
import sections from "@/resources/sections";
import { filterValues } from "@/lib/filterValues";

const debouncePeriod = 500
const getSliderBounds = (filter) => {
  const values = filterValues?.[filter.key]
    ?.map(Number)
    ?.filter((value) => Number.isFinite(value));

  if (!values?.length) return null;

  return [Math.min(...values), Math.max(...values)];
};

const normalizeSliderValue = (value, bounds) => {
  if (!Array.isArray(value) || value.length !== 2) return bounds;

  const normalizedValue = value.map(Number);
  if (!normalizedValue.every((entry) => Number.isFinite(entry))) return bounds;

  return normalizedValue
    .map((entry) => Math.min(Math.max(entry, bounds[0]), bounds[1]))
    .sort((first, second) => first - second);
};

const getSliderStep = (filter) => {
  if (filter.step) return filter.step;

  const values = filterValues?.[filter.key] ?? [];
  const decimalPrecision = Math.max(
    ...values.map((value) => value.toString().split(".")[1]?.length ?? 0),
  );

  return 10 ** -decimalPrecision;
};

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
      // backgroundColor={"var(--appColorAccent)"}
      // color={"var(--appColorCardBackgroundInvert)"}
      // _hover={{
      //   backgroundColor: "var(--appColorAccentLight)",
      // }}
      _active={{}}
      loading={isPendingApplyFilter || props.isLoadingApplyFilter}
    >
      {`Apply - ${props.countResults()} results`}
    </Button>
  );
}

function FilterTriggerLabel(props) {
  return (
    <Box
      as="span"
      flex="1"
      display="flex"
      alignItems="center"
      gap="2"
      // color={"var(--appColorAccent)"}
      _hover={{ color: "var(--appColorAccent)" }}
      cursor={"pointer"}
    >
      {props.icon &&
        React.createElement(props.icon, {
          opacity: 0.6,
          color: props?.isActive ? "var(--appColorAccent)" : undefined,
        })}
      {props.label}
    </Box>
  );
}

export default function Filters(props) {
  const [maxActiveIndex, setMaxActiveIndex] = useState(0);
  const { open, onOpen, onClose } = useDisclosure();
  const [isPendingClose, startTransitionClose] = useTransition();
  const [localWipValues, setLocalWipValues] = useState({});
  // Raw text the user is currently typing, kept separate from the committed range
  const [numberInputDrafts, setNumberInputDrafts] = useState({});
  const sliderUpdateTimersRef = useRef({});
  const numberInputTimersRef = useRef({});
  const filtersRef = useRef(props.filters);
  const localWipValuesRef = useRef(localWipValues);

  const searchParams = useSearchParams();

  useEffect(() => {
    filtersRef.current = props.filters;
  }, [props.filters]);

  useEffect(() => {
    localWipValuesRef.current = localWipValues;
  }, [localWipValues]);

  useEffect(() => {
    const sliderUpdateTimers = sliderUpdateTimersRef.current;
    const numberInputTimers = numberInputTimersRef.current;

    return () => {
      Object.values(sliderUpdateTimers).forEach((timer) =>
        clearTimeout(timer),
      );
      Object.values(numberInputTimers).forEach((timer) =>
        clearTimeout(timer),
      );
    };
  }, []);

  const handleClose = () => {
    startTransitionClose(() => {
      props.onClose();
    });
    setNumberInputDrafts({});
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

  const handleSliderChange = (filter, value) => {
    const bounds = getSliderBounds(filter);
    if (!bounds) return;

    const range = normalizeSliderValue(value, bounds);
    const isRangeActive = range[0] !== bounds[0] || range[1] !== bounds[1];
    const sliderValue = isRangeActive ? range : false;

    setLocalWipValues((previousValues) => ({
      ...previousValues,
      [filter.key]: {
        value: sliderValue,
        active: isRangeActive,
      },
    }));

    clearTimeout(sliderUpdateTimersRef.current[filter.key]);
    sliderUpdateTimersRef.current[filter.key] = setTimeout(() => {
      startTransition(() => {
        props.setFilters(
          filtersRef.current.map((currentFilter) =>
            currentFilter.key === filter.key
              ? {
                  ...currentFilter,
                  wip: {
                    value: sliderValue,
                    active: isRangeActive,
                  },
                }
              : currentFilter,
          ),
          true,
        );
      });
    }, debouncePeriod);
  };

  // Applies a typed min/max value to the actual filter, using the freshest committed range
  const commitSliderBoundInput = (filter, bounds, index, rawValue) => {
    const inputValue = Number(rawValue);
    if (!Number.isFinite(inputValue)) return;

    const currentValue = normalizeSliderValue(
      localWipValuesRef.current[filter.key]?.value,
      bounds,
    );

    const nextValue = [...currentValue];
    nextValue[index] =
      index === 0
        ? Math.min(inputValue, currentValue[1])
        : Math.max(inputValue, currentValue[0]);

    const range = normalizeSliderValue(nextValue, bounds);
    const isRangeActive = range[0] !== bounds[0] || range[1] !== bounds[1];
    const sliderValue = isRangeActive ? range : false;

    setLocalWipValues((previousValues) => ({
      ...previousValues,
      [filter.key]: {
        value: sliderValue,
        active: isRangeActive,
      },
    }));

    startTransition(() => {
      props.setFilters(
        filtersRef.current.map((currentFilter) =>
          currentFilter.key === filter.key
            ? {
                ...currentFilter,
                wip: {
                  value: sliderValue,
                  active: isRangeActive,
                },
              }
            : currentFilter,
        ),
        true,
      );
    });
  };

  // Updates the displayed input text instantly, and defers the actual filter change
  const handleSliderInputChange = (filter, bounds, index, value) => {
    setNumberInputDrafts((previousDrafts) => {
      const currentDraft = previousDrafts[filter.key] ?? [undefined, undefined];
      const nextDraft = [...currentDraft];
      nextDraft[index] = value;
      return { ...previousDrafts, [filter.key]: nextDraft };
    });

    const timerKey = `${filter.key}:${index}`;
    clearTimeout(numberInputTimersRef.current[timerKey]);
    numberInputTimersRef.current[timerKey] = setTimeout(() => {
      commitSliderBoundInput(filter, bounds, index, value);
    }, debouncePeriod);
  };

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
    setNumberInputDrafts({});
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
    setNumberInputDrafts({});
  };

  const renderSpecialCategoryFilters = () => {
    const defaultIndex = specialCategoryFilters.some((specialCategory) => {
      if (props.filtersToOpenByDefault) {
        return isFilterToOpenByDefault(specialCategory, true);
      }
      return props.filters.find((f) => f.key === specialCategory.key)?.active;
    })
      ? ["item-specialCategory"]
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
              <FilterTriggerLabel
                icon={FaList}
                label="Category"
                isActive={specialCategoryFilters.some(
                  (specialCategory) =>
                    localWipValues[specialCategory.key]?.active,
                )}
              />
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Box
                  ml={5}
                  display="flex"
                  flexDirection={"column"}
                  borderLeftWidth={"2px"}
                  borderColor={"var(--appColorDarkGrey)"}
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
        <Box ml={"1rem"}>
          {filter.children.map((childKey) => {
            const childFilter = additionalSectionFilters.find(
              (entry) => entry.key === childKey,
            );

            return (
              <React.Fragment key={childKey}>
                {childFilter?.type === "slider"
                  ? renderSliderFilter(childFilter)
                  : renderRadioFilters([childFilter], true)}
              </React.Fragment>
            );
          })}
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
            return `item-${idx}`;
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
            return `item-${idx}`;
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
                <FilterTriggerLabel
                  icon={section.icon}
                  label={section.label}
                  isActive={
                    section.attributes
                      .filter((e) => e.type === "tag")
                      .some((tag) => localWipValues[tag.attribute]?.active) ||
                    isOneOfTheChildrenFiltersActive(
                      additionalSectionFilters?.find(
                        (asf) => asf.key === sectionKey,
                      ),
                    )
                  }
                />
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pr={0}>
                <Accordion.ItemBody>
                  <Box
                    ml={5}
                    display="flex"
                    flexDirection={"column"}
                    borderLeftWidth={"2px"}
                    borderColor={"var(--appColorDarkGrey)"}
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
  const renderSliderFilter = (filter) => {
    const bounds = getSliderBounds(filter);
    if (!bounds) return null;

    const sliderValue = normalizeSliderValue(
      localWipValues[filter.key]?.value,
      bounds,
    );
    const draft = numberInputDrafts[filter.key] ?? [undefined, undefined];
    const defaultIndex = props.filtersToOpenByDefault
      ? [isFilterToOpenByDefault(filter, `item-${filter.key}`)].filter(
          Boolean,
        )
      : isRadioFilterActive(filter)
        ? [`item-${filter.key}`]
        : [];

    return (
      <Accordion.Root multiple defaultValue={defaultIndex}>
        <Accordion.Item key={filter.key} value={`item-${filter.key}`}>
          <Accordion.ItemTrigger>
            <FilterTriggerLabel
              icon={filter.icon}
              label={filter.label}
              isActive={isRadioFilterActive(filter)}
            />
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent pr={0}>
            <Accordion.ItemBody>
              <Box
                borderLeftWidth={"2px"}
                borderColor={"var(--appColorDarkGrey)"}
                ml={5}
                mb="4"
              >
                <Grid templateColumns="1fr 1fr" gap="3" mb="3" ml={3} mr={3}>
                  <NumberInput.Root
                    display="flex"
                    alignItems="center"
                    gap="1"
                    minW={0}
                    min={bounds[0]}
                    max={bounds[1]}
                    allowOverflow
                    step={getSliderStep(filter)}
                    value={draft[0] ?? sliderValue[0].toString()}
                    onValueChange={(details) =>
                      handleSliderInputChange(
                        filter,
                        bounds,
                        0,
                        details.value,
                      )
                    }
                  >
                    <NumberInput.Label
                      fontSize="xs"
                      color="var(--appColorDarkGrey)"
                    >
                      Min
                    </NumberInput.Label>
                    <NumberInput.Input
                      h="7"
                      minW={0}
                      px="2"
                      fontSize="xs"
                      textAlign="center"
                    />
                    {/* {filter.unit && <Box fontSize="xs">{filter.unit}</Box>} */}
                  </NumberInput.Root>
                  <NumberInput.Root
                    display="flex"
                    alignItems="center"
                    gap="1"
                    minW={0}
                    min={bounds[0]}
                    max={bounds[1]}
                    allowOverflow
                    step={getSliderStep(filter)}
                    value={draft[1] ?? sliderValue[1].toString()}
                    onValueChange={(details) =>
                      handleSliderInputChange(
                        filter,
                        bounds,
                        1,
                        details.value,
                      )
                    }
                  >
                    <NumberInput.Label
                      fontSize="xs"
                      color="var(--appColorDarkGrey)"
                    >
                      Max
                    </NumberInput.Label>
                    <NumberInput.Input
                      h="7"
                      minW={0}
                      px="2"
                      fontSize="xs"
                      textAlign="center"
                    />
                    {/* {filter.unit && <Box fontSize="xs">{filter.unit}</Box>} */}
                  </NumberInput.Root>
                </Grid>
                <Box ml={3} mr={3}>
                  <Slider.Root
                    aria-label={[
                      `Minimum ${filter.label}`,
                      `Maximum ${filter.label}`,
                    ]}
                    min={bounds[0]}
                    max={bounds[1]}
                    step={getSliderStep(filter)}
                    value={sliderValue}
                    onValueChange={(details) =>
                      handleSliderChange(filter, details.value)
                    }
                  >
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumbs />
                    </Slider.Control>
                  </Slider.Root>
                </Box>
              </Box>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    );
  };
  const renderRadioFilters = (appliedRadiofilters, isChildRender) => {
    const defaultIndex = appliedRadiofilters
      ?.map((filter, idx) => {
        if (props.filtersToOpenByDefault) {
          return isFilterToOpenByDefault(filter, `item-${filter.key}`);
        } else if (
          isRadioFilterActive(filter) ||
          isOneOfTheChildrenFiltersActive(filter)
        )
          return `item-${filter.key}`;
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
                  <FilterTriggerLabel
                    icon={filter.icon}
                    label={filter.label}
                    isActive={
                      isRadioFilterActive(filter) ||
                      isOneOfTheChildrenFiltersActive(filter)
                    }
                  />
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent pr={0}>
                  <Accordion.ItemBody>
                    <Box
                      borderLeftWidth={"2px"}
                      borderColor={"var(--appColorDarkGrey)"}
                      ml={5}
                    >
                      {filter.note && (
                        <Box
                          ml="1rem"
                          mb=".5rem"
                          color="var(--appColorDarkGrey)"
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
                              {filterValues?.[filter.key]
                                ?.filter((v) => v != null)
                                ?.map((filterValue) => (
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
                                ))}
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
            <Drawer.Content background={"var(--background)"}>
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
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
              <Drawer.Header borderBottomWidth="1px">
                <Drawer.Title>Filters &nbsp;</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Center>
                  <Heading size={"md"} m={"0.5em"}>
                    General
                  </Heading>
                </Center>
                {renderRadioFilters(
                  generalFilters.filter((filter) => filter.type !== "slider"),
                )}
                {generalFilters
                  .filter((filter) => filter.type === "slider")
                  .map((filter) => renderSliderFilter(filter))}
                {renderSpecialCategoryFilters()}
                <Center>
                  <Heading size={"md"} m={"0.5em"}>
                    Specifications
                  </Heading>
                </Center>
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
