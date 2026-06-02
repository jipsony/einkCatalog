import React from "react";

import { Steps, Box, HStack } from "@chakra-ui/react";
/* FONT AWESOME BS START*/
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faGamepad,
  faTv,
  faHandSparkles,
  faPlug,
  faGear,
  faSliders,
  faPlugCircleBolt,
  faStar as faStarSolid,
  faStarHalfStroke,
  faArrowDownWideShort,
  faTag,
  faMoneyBill1Wave,
  faUpRightAndDownLeftFromCenter,
  faBuilding,
  faCircle,
  faMaximize,
  faCalendarDays,
  faRightToBracket,
  faArrowRightArrowLeft,
  faArrowRight,
  faHeart,
  faList,
  faPlusCircle,
  faMicrochip,
  faTriangleExclamation,
  faEnvelope,
  faWindowMaximize,
  faSun,
  faEye,
  faChevronDown,
  faChevronRight,
  faEllipsisVertical,
  faTrashCan,
  faBook,
  faCheck,
  faXmark,
  faPlus,
  faPencil,
  faCamera,
  faArrowUp,
  faArrowDown,
  faReply,
  faDiceFive,
  faRotate,
  faCheckDouble,
  faKeyboard,
  faOtter,
  faShop,
  faCode,
  faMagnifyingGlass,
  faDice,
  faNewspaper,
  faCircleQuestion,
  faBookmark as faBookmarkSolid,
  faQuestion,
  faCircleCheck,
  faThumbsUp,
  faGem,
  faClock,
  faThumbsDown,
  faHourglass,
  faHourglassEnd,
  faShareNodes,
  faCopy,
  faClipboard,
  faUser as faUserSolid,
  faChevronLeft,
  faMedal,
  faAward,
  faTrophy,
  faLayerGroup,
  faShoppingCart,
  faShi,
  faShoppingBasket,
  faCartPlus,
  faTags,
  faTruck,
  faCircleInfo,
  faStore,
  faMoneyBill,
  faCircleExclamation,
  faArrowRotateRight,
  faRotateRight,
  faRotateLeft,
  
} from "@fortawesome/free-solid-svg-icons";

import {
  faStar,
  faCopyright,
  faUser,
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
  faCircleCheck as faCircleCheckRegular,
  faCompass as faCompassRegular
} from "@fortawesome/free-regular-svg-icons";
import {
  faWindows,
  faAndroid,
  faLinux,
  faInstagram,
  faRedditAlien,
  faSquareReddit,
  faYoutube,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { operatingSystemIcons } from "@/app/lib/globalVars";

library.add(
  faChartSimple,
  faGamepad,
  faTv,
  faHandSparkles,
  faPlug,
  faGear,
  faSliders,
  faYoutube,
  faSquareYoutube,
  faPlugCircleBolt,
  faStarSolid,
  faStar,
  faStarHalfStroke,
  faChartSimple,
  faArrowDownWideShort,
  faTag,
  faMoneyBill1Wave,
  faUpRightAndDownLeftFromCenter,
  faBuilding,
  faCircle,
  faMaximize,
  faCalendarDays,
  faGear,
  faRightToBracket,
  faWindows,
  faAndroid,
  faLinux,
  faArrowRightArrowLeft,
  faHeart,
  faCopyright,
  faArrowRight,
  faList,
  faPlusCircle,
  faMicrochip,
  faTriangleExclamation,
  faEnvelope,
  faInstagram,
  faWindowMaximize,
  faSun,
  faEye,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faEllipsisVertical,
  faTrashCan,
  faBook,
  faCheck,
  faXmark,
  faPlus,
  faPencil,
  faCamera,
  faArrowUp,
  faArrowDown,
  faReply,
  faUser,
  faDiceFive,
  faRotate,
  faCheckDouble,
  faCalendarDays,
  faKeyboard,
  faOtter,
  faShop,
  faCode,
  faMagnifyingGlass,
  faDice,
  faRedditAlien,
  faSquareReddit,
  faNewspaper,
  faUser,
  faCircleQuestion,
  faQuestion,
  faBookmarkSolid,
  faBookmarkRegular,
  faCircleCheck,
  faThumbsDown,
  faThumbsUp,
  faGem,
  faClock,
  faHeart,
  faHourglassEnd,
  faShareNodes,
  faCopy,
  faClipboard,
  faUserSolid,
  faHeartRegular,
  faMedal,
  faAward,
  faTrophy,
  faLayerGroup,
  faShoppingCart,
  faShoppingBasket,
  faShop,
  faCartPlus,
  faTags, 
  faCircleCheckRegular,
  faTruck,
  faCircleInfo,
  faRotateLeft,
  faCompassRegular,
  faMagnifyingGlass
);

//
/* FONT AWESOME BS END*/

export default function IconsWrapper(props) {
  return (
    <Box
      style={{ display: "inline-block", ...props.style }}
      alignItems={"left"}
    >
      <FontAwesomeIcon
        icon={props.icon}
        color={props.color}
        size={props.size}
        className={props.className}
      />
    </Box>
  );
}

const renderOperatingSystemIcon = (os) => {
  if (os?.length > 0) {
    return (
      <HStack>
        {os.map((osRow) => {
          const iconName = operatingSystemIcons?.[osRow];
          if (iconName) {
            return (
              <IconsWrapper
                key={iconName}
                style={{ width: "1rem" }}
                icon={iconName}
              ></IconsWrapper>
            );
          }
        })}
      </HStack>
    );
  }
};

export { renderOperatingSystemIcon };
