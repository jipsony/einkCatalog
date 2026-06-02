
import React, { useRef, useEffect } from "react";
import { Steps, Box } from "@chakra-ui/react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function ImageZoomWrapper({ children, resetKey, ...props }) {
  const transformRef = useRef(null);

  useEffect(() => {
    transformRef.current?.resetTransform();
  }, [resetKey]);

  return (
    <Box {...props}>
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        disablePadding
        centerOnInit
        doubleClick={{ mode: "toggle" }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          {children}
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
}
