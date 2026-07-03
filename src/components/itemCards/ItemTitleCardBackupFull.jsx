// import React from "react";
// import { Box, Center, Text } from "@chakra-ui/react";
// import ItemAttributeIcons from "./ItemAttributeIcons";

// const DashLine = () => (
//   <Box
//     fontFamily="mono"
//     letterSpacing="widest"
//     overflow="hidden"
//     whiteSpace="nowrap"
//     opacity={0.2}
//     userSelect="none"
//     aria-hidden="true"
//     mt="-0.5"
//   >
//     {"-".repeat(200)}
//   </Box>
// );

// export default function ItemTitleCardBackupFull(props) {
//   return (
//     <Box width="100%" py={3} backgroundColor={"var(--background)"}>
//       {/* <DashLine /> */}

//       <Text
//         fontSize="3xl"
//         textAlign="center"
//         // className="appTitle"
//         // fontStyle="italic"
//         fontWeight={"bold"}
//       >
//         {props?.itemInfo?.brand} {props?.itemInfo?.name}
//       </Text>
//       <Center my={".5rem"}>
//         <ItemAttributeIcons
//           color={"var(--appColorAccent)"}
//           itemInfo={props.itemInfo}
//           size="16"
//         ></ItemAttributeIcons>
//       </Center>
//       {/* <DashLine /> */}
//     </Box>
//   );
// }
