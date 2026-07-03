// "use client";
// import {
//   React,
//   useState,
//   useEffect,
//   useDeferredValue,
//   useTransition,
// } from "react";

// import {
//   Box,
//   Button,
//   Card,
//   Center,
//   Container,
//   Flex,
//   Grid,
//   GridItem,
//   Heading,
//   HStack,
//   Stack,
//   Spinner,
// } from "@chakra-ui/react";e
// export default function HandheldListPage(props) {
//   // onINP(console.log);

//   const pathname = usePathname();
//   const rootPathName = "/retro-handhelds";
//   const { replace } = useRouter();
//   const searchParams = useSearchParams();

//   const [defJson, setDefJson] = useState(null);
//   const [defJsonBeforePagination, setDefJsonBeforePagination] = useState(
//     props.defJson,
//   );

//   // Defer the heavy list rendering - keeps spinner visible until render completes
//   const deferredDefJson = useDeferredValue(defJson);
//   const isRenderingList = defJson !== deferredDefJson;

//   const [filtersToOpenByDefault, setFiltersToOpenByDefault] = useState(null);

//   const [isPendingFilter] = useTransition();

//   const displayModeOptions = {
//     full: { label: "Full" },
//     recap: { label: "Recap" },
//     preview: { label: "Preview" },
//   };

//   const defaultPagination = {
//     full: {
//       from: 0,
//       to: 8,
//     },
//     recap: {
//       from: 0,
//       to: 11,
//     },
//     preview: {
//       from: 0,
//       to: 23,
//     },
//   };
//   const [initialPagination, setInitialPagination] = useState(
//     defaultPagination.full,
//   );

//   const [filters, setFilters] = useState([]);
//   const [filtersReady, setFiltersReady] = useState(false);
//   const [isOpenFilters, setIsOpenFilters] = useState(false);
//   const [sortingReady, setSortingReady] = useState(false);
//   const [selectedDisplayMode, setSelectedDisplayMode] = useState("full");
//   const [displayModeReady, setDisplayModeReady] = useState(false);

//   const [displayReady, setDisplayReady] = useState(false);

//   const [selectedSorting, setSelectedSorting] = useState("latest");
//   const [pagination, setPagination] = useState(initialPagination);
//   const [isLoadingPagination, setIsLoadingPagination] = useState(false);
//   const [isLoadingFilter, setIsLoadingFilter] = useState(false);
//   const [isLoadingSmallFilterButton, setIsLoadingSmallFilterButton] =
//     useState(false);

//   const [isLoadingApplyFilter, setIsLoadingApplyFilter] = useState(false);

//   const handleSortingChange = (key) => {
//     setSelectedSorting(key);
//   };

//   const handleDisplayModeChange = (key) => {
//     // const previousSelectedDisplayMode = selectedDisplayMode

//     // let newInitialPagination;
//     // let newPagination ;
//     // if (previousSelectedDisplayMode === "preview" && (key === "recap" || key === "full")) {
//     //   newInitialPagination = defaultPagination
//     //   newPagination =
//     // }
//     // if ( (key === "recap" || key === "full") && previousSelectedDisplayMode === "preview") {
//     //   newInitialPagination = defaultPagination

//     // }

//     setInitialPagination(defaultPagination[key]);
//     setPagination(defaultPagination[key]);
//     setSelectedDisplayMode(key);
//   };

//   const countResults = (isWip = false) => {
//     if (isWip)
//       return (
//         filterDefJson(
//           filters.map((f) => ({
//             ...f,
//             active: f.wip.active,
//             value: f.wip.value,
//           })),
//         )?.length ?? 0
//       );
//     return filterDefJson(filters)?.length ?? 0;
//   };

//   const filterDefJson = (newFilters) => {
//     let newDefJson = props.defJson;

//     newFilters.forEach((filter) => {
//       if (filter?.value && filter.active)
//         newDefJson = newDefJson.filter((row) =>
//           filter.filterFunction(row, filter.value),
//         );
//     });

//     return newDefJson;
//   };

//   const renderPreview = (row) => {
//     return (
//       <GridItem>
//         <Box pl={"1rem"} pr={"1rem"} pb={".5rem"}>
//           <HandheldPreviewCard
//             fullPreview
//             horizontal
//             handheldInfo={row}
//           ></HandheldPreviewCard>
//         </Box>
//       </GridItem>
//     );
//   };

//   const setSortingFromUrl = () => {
//     const urlSortingString = searchParams.get("sorting");

//     if (urlSortingString && Object.keys(sortOptions).includes(urlSortingString))
//       handleSortingChange(urlSortingString);
//     setSortingReady(true);
//   };

//   const setDisplayModeFromUrl = () => {
//     const urlDisplayModeString = searchParams.get("displayMode");

//     if (
//       urlDisplayModeString &&
//       Object.keys(displayModeOptions).includes(urlDisplayModeString)
//     )
//       handleDisplayModeChange(urlDisplayModeString);
//     setDisplayModeReady(true);
//   };

//   const setParametersFromUrl = () => {
//     setSortingFromUrl();
//     setDisplayModeFromUrl();
//   };

//   const updateUrlWithFilters = (updatedFilters) => {
//     const params = new URLSearchParams(searchParams);

//     const activeFilters = Object.fromEntries(
//       updatedFilters
//         ?.filter((row) => row.active)
//         ?.map((row) => [row.key, row.value]),
//     );
//     if (activeFilters) {
//       params.set("filters", JSON.stringify(activeFilters));
//     } else {
//       params.delete("filters");
//     }

//     let initialFiltersChanged = false;
//     if (props.initialFilters && activeFilters) {
//       initialFiltersChanged = Object.keys(props.initialFilters).some(
//         (key) => props.initialFilters[key] !== activeFilters[key],
//       );
//     }

//     if (initialFiltersChanged) {
//       window.history.pushState({}, "", `${rootPathName}?${params.toString()}`);
//     } else {
//       let newFiltersExist = Object.keys(activeFilters).some(
//         (key) => props.initialFilters?.[key] === undefined,
//       );

//       if (newFiltersExist) {
//         replace(`${pathname}?${params.toString()}`);
//       }
//     }
//   };

//   useEffect(() => {
//     if (displayReady) {
//       if (!pagination || !pagination.to || !props.defJson) return;

//       let newDefJson = props.defJson;

//       // Filter
//       if (filters?.length > 0 && props.defJson.length > 0) {
//         newDefJson = filterDefJson(filters);
//       }

//       // then sort
//       if (selectedSorting && sortOptions?.[selectedSorting]) {
//         newDefJson = sortOptions?.[selectedSorting]?.sortFunction(newDefJson);
//       }

//       // then pagination
//       setDefJsonBeforePagination(newDefJson);
//       newDefJson = newDefJson.slice(pagination.from, pagination.to + 1);

//       setDefJson(newDefJson);
//       setIsLoadingPagination(false);
//       setIsLoadingFilter(false);
//       setIsLoadingApplyFilter(false);
//     }
//   }, [displayReady, filters, selectedSorting, sortOptions, pagination]);

//   useEffect(() => {
//     setPagination(initialPagination);
//   }, [selectedSorting]);

//   useEffect(() => {
//     if (sortingReady && filtersReady && displayModeReady) setDisplayReady(true);
//   }, [sortingReady, filtersReady, displayModeReady]);

//   let firstLoad = true;
//   useEffect(() => {
//     if (firstLoad) {
//       setParametersFromUrl();
//       firstLoad = false;
//     }
//   }, []);

//   const renderListItem = (row, hideFullInfo = false) => {
//     return (
//       <Container key={row?.id} mb={hideFullInfo ? "2rem" : "3rem"}>
//         {row ? (
//           <GridItem height={"100%"}>
//             <HandheldVertical
//               handheldInfo={row}
//               clickable
//               borderColor={"var(--appColorDarkGrey)!important"}
//               hideFullInfo={hideFullInfo}
//               // mawImageWidth={{ md: "12rem" }}
//               showCompareLink
//               showDetailsLink
//               actionButton={{
//                 render: () => {
//                   return (
//                     <HandheldsAddToUserListsButton
//                       handheldInfo={row}
//                       asIcon
//                     ></HandheldsAddToUserListsButton>
//                   );
//                 },
//               }}
//               itemsWithBuyLinks={props.itemsWithBuyLinks}
//               appContextFromNextServer={props?.appContextFromNextServer}
//             ></HandheldVertical>
//           </GridItem>
//         ) : (
//           <Card minH={"20em"}></Card>
//         )}
//       </Container>
//     );
//   };
//   const renderIndividual = (row) => {
//     if (selectedDisplayMode === "full") return renderListItem(row);
//     if (selectedDisplayMode === "recap") return renderListItem(row, true);
//     if (selectedDisplayMode === "preview") return renderPreview(row);
//   };

//   const renderSortingButton = (showSelectedInButton, showBorderBottom) => {
//     return (
//       <Sorting
//         displayReady={displayReady}
//         handleSortingChange={handleSortingChange}
//         selectedSorting={selectedSorting}
//         showSelectedInButton={showSelectedInButton}
//         showBorderBottom={showBorderBottom}
//       ></Sorting>
//     );
//   };

//   const renderFilterButton = () => {
//     return (
//       <FilterButton
//         setIsLoadingFilter={setIsLoadingFilter}
//         setFiltersToOpenByDefault={setFiltersToOpenByDefault}
//         setIsOpenFilters={setIsOpenFilters}
//         isPendingFilter={isPendingFilter}
//         isLoadingFilter={isLoadingFilter}
//       />
//     );
//   };
//   const renderDisplayModeButton = (showSelectedInButton, showBorderBottom) => {
//     return (
//       <DisplayMode
//         displayReady={displayReady}
//         handleDisplayModeChange={handleDisplayModeChange}
//         selectedDisplayMode={selectedDisplayMode}
//         displayModeOptions={displayModeOptions}
//         showSelectedInButton={showSelectedInButton}
//         showBorderBottom={showBorderBottom}
//       ></DisplayMode>
//     );
//   };

//   const prepareSetFilters = (newFilters, isWip) => {
//     if (!isWip) {
//       setPagination(initialPagination);
//       updateUrlWithFilters(newFilters);
//       setFilters(
//         newFilters.map((f) => ({
//           ...f,
//           wip: { active: f.active, value: f.value },
//         })),
//       );
//       return;
//     }
//     setFilters(newFilters);
//   };

//   const removeFilter = (filter) => {
//     prepareSetFilters(
//       filters.map((f) => {
//         if (f.key === filter.key) return { ...f, active: false };
//         return f;
//       }),
//     );
//   };

//   const renderFilterRecap = () => {
//     return (
//       <FilterRecap
//         filters={filters}
//         onTileClick={(f) => {
//           setFiltersToOpenByDefault(f);
//           setIsOpenFilters(true);
//         }}
//         onDeleteTileClick={removeFilter}
//         onPlusClick={() => {
//           setFiltersToOpenByDefault([]);
//           setIsOpenFilters(true);
//         }}
//       ></FilterRecap>
//     );
//   };
//   return (
//     <>
//       <Center flexDirection={"column"}>
//         {!deferredDefJson && (
//           <Box
//             position="fixed"
//             top="50%"
//             left="50%"
//             transform="translate(-50%, -50%)"
//             zIndex={1000}
//           >
//             <Spinner
//               size="xl"
//               color="var(--appColorDarkGrey)"
//               thickness="4px"
//             />
//           </Box>
//         )}
//         {deferredDefJson && pagination?.to && (
//           <>
//             <Flex
//               justifyContent={"center"}
//               //  width={{ base: cardSize, lg: cardSize * 2 }}
//             >
//               <Grid
//                 templateColumns={{
//                   base: "1fr",
//                   lg: "1fr 1fr",
//                   "2xl": `repeat(3, 1fr)`,
//                 }}
//                 // width={sizes.gridWidths}
//                 width={"100%"}
//               >
//                 <GridItem gridColumn={{ base: "auto", "2xl": "span 2" }}>
//                   <ItemListPageTitle
//                     filters={filters}
//                     selectedSorting={selectedSorting}
//                   ></ItemListPageTitle>
//                 </GridItem>
//                 <GridItem>
//                   <Box
//                     display={"flex"}
//                     justifyContent={"end"}
//                     position="relative"
//                     flexWrap={"wrap"}
//                     // rowGap="0.5em"
//                     mb={"1rem"}
//                   >
//                     <HStack width={"100%"} pl="1rem" pr="1rem">
//                       <Box flexGrow={1} flexBasis={0}>
//                         {renderDisplayModeButton(false, true)}
//                       </Box>
//                       <Box flexGrow={1} flexBasis={0}>
//                         {renderSortingButton(false, true)}
//                       </Box>
//                       <Box flexGrow={1} flexBasis={0}>
//                         {displayReady && renderFilterButton()}
//                       </Box>
//                     </HStack>
//                   </Box>
//                 </GridItem>
//                 {/* {defJson && pagination?.to && ( */}
//                 <GridItem
//                   gridColumn={{ base: "auto", lg: "span 2", "2xl": "span 3" }}
//                   // gridColumn={{ base: "auto", md: "span 2", "2xl": "span 3" }}

//                   mb="1rem"
//                 >
//                   <Stack gap="1rem">
//                     {filters?.some((f) => f.active && !!f.value) &&
//                       renderFilterRecap()}
//                     {props.topAnnouncements && (
//                       <Box>
//                         <Box>{props.topAnnouncements}</Box>
//                       </Box>
//                     )}
//                   </Stack>
//                 </GridItem>

//                 {deferredDefJson?.map((row, idx) => renderIndividual(row))}
//               </Grid>
//             </Flex>
//           </>
//         )}

//         <Filters
//           filters={filters}
//           displayReady={displayReady}
//           isOpenFilters={isOpenFilters}
//           setIsOpenFilters={setIsOpenFilters}
//           setFiltersReady={setFiltersReady}
//           initialFilters={props.initialFilters}
//           setFilters={prepareSetFilters}
//           countResults={countResults}
//           sortingButton={renderSortingButton(false)}
//           displayModeButton={renderDisplayModeButton(false)}
//           filtersToOpenByDefault={filtersToOpenByDefault}
//           onClose={() => {
//             setFiltersToOpenByDefault(null);
//             setIsOpenFilters(false);
//           }}
//           isLoadingFilter={isPendingFilter || isLoadingFilter}
//           setIsLoadingFilter={(e) => {
//             setIsLoadingFilter(e);
//             setIsLoadingSmallFilterButton(e);
//           }}
//           isLoadingApplyFilter={isLoadingApplyFilter}
//           setIsLoadingApplyFilter={setIsLoadingApplyFilter}
//         ></Filters>
//         <Pagination
//           pagination={pagination}
//           setPagination={setPagination}
//           defJson={deferredDefJson}
//           defJsonBeforePagination={defJsonBeforePagination}
//           pageSize={initialPagination.to}
//           openFilters={() => {
//             setFiltersToOpenByDefault(null);
//             setIsOpenFilters(true);
//           }}
//           isLoadingPagination={isLoadingPagination}
//           isRenderingList={isRenderingList}
//           setIsLoadingPagination={setIsLoadingPagination}
//           isLoadingSmallFilterButton={isLoadingSmallFilterButton}
//           setIsLoadingSmallFilterButton={setIsLoadingSmallFilterButton}
//         ></Pagination>
//       </Center>
//     </>
//   );
// }
