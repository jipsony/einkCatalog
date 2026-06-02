import { Steps, Breadcrumb } from "@chakra-ui/react";
import React from "react";
export default function AppBreadcrumbs(props) {
  const renderBreadCrumbItem = (label, path, isCurrentPage, isLast) => {
    return (
      <React.Fragment key={label}>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            textDecor={!isCurrentPage ? "underline" : undefined}
            color={"var(--appColorDarkGrey)"}
            _hover={
              !isCurrentPage ? { color: "var(--appColorLinkBlue)" } : undefined
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
            color={"var(--appColorDarkGrey)"}
            fontSize={"12px"}
          >
            /
          </Breadcrumb.Separator>
        )}
      </React.Fragment>
    );
  };
  return (
    <Breadcrumb.Root mb={"1rem"} fontWeight={500} className="appColorDarkGrey">
      <Breadcrumb.List>
        {props.breadCrumbsList.map((row, idx) => {
          return renderBreadCrumbItem(row.label, row.path, row.isCurrentPage, idx===props?.breadCrumbsList?.length -1);
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
