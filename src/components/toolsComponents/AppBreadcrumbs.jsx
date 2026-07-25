import { Steps, Breadcrumb } from "@chakra-ui/react";
import React from "react";
import { CgChevronRight } from "react-icons/cg";
import { LiaChevronRightSolid } from "react-icons/lia";
import { LuChevronRight } from "react-icons/lu";
export default function AppBreadcrumbs(props) {
  const renderBreadCrumbItem = (label, path, isCurrentPage, isLast) => {
    return (
      <React.Fragment key={label}>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            textDecor={!isCurrentPage ? "underline" : undefined}
            // color={"var(--appColorDarkGrey)"}
            _hover={
              !isCurrentPage ? { color: "var(--appColorLink)" } : undefined
            }
            href={path}
            style={{ textWrap: "nowrap" }}
            fontSize={"12px"}
          >
            {label}
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {!isLast && (
          <Breadcrumb.Separator
            // color={"var(--appColorDarkGrey)"}
            fontSize={"12px"}
          >
            <LuChevronRight></LuChevronRight>
          </Breadcrumb.Separator>
        )}
      </React.Fragment>
    );
  };

  const breadcrumbList = [
    !props?.breadcrumbList?.some((r) => r.path === "/") && {
      label: "Home",
      path: "/",
    },
    ...props.breadcrumbList,
  ];
  return (
    <Breadcrumb.Root
      mb={"1rem"}
      fontWeight={500}
      // color={"var(--appColorDarkGrey)"}
      color='var(--appColorDarkerGrey)'
    >
      <Breadcrumb.List>
        {breadcrumbList.map((row, idx) => {
          return renderBreadCrumbItem(
            row.label,
            row.path,
            row.isCurrentPage,
            idx === breadcrumbList?.length - 1,
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
