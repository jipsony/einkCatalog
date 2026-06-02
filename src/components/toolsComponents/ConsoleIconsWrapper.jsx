import React from "react";

import ds3 from "@/resources/images/icons/consoles/3ds.png";
import android from "@/resources/images/icons/consoles/android.png";
import arcade from "@/resources/images/icons/consoles/arcade.png";
import dreamcast from "@/resources/images/icons/consoles/dreamcast.png";
import ds from "@/resources/images/icons/consoles/ds.png";
import gamecube from "@/resources/images/icons/consoles/gamecube.png";
import gamegear from "@/resources/images/icons/consoles/gamegear.png";
import gb from "@/resources/images/icons/consoles/gb.png";
import gba from "@/resources/images/icons/consoles/gba.png";
import gbc from "@/resources/images/icons/consoles/gbc.png";
import n64 from "@/resources/images/icons/consoles/n64.png";
// import neoGeoCD from "@/resources/images/icons/consoles/neoGeoCD.png";
// import neoGeoPocket from "@/resources/images/icons/consoles/neoGeoPocket.png";
import nes from "@/resources/images/icons/consoles/nes.png";
import pico8 from "@/resources/images/icons/consoles/pico8.png";
import ps from "@/resources/images/icons/consoles/ps.png";
import ps2 from "@/resources/images/icons/consoles/ps2.png";
import ps3 from "@/resources/images/icons/consoles/ps3.png";
import psp from "@/resources/images/icons/consoles/psp.png";
// import psVita from "@/resources/images/icons/consoles/psVita.png";
import saturn from "@/resources/images/icons/consoles/saturn.png";
import snes from "@/resources/images/icons/consoles/snes.png";
// import nswitch from "@/resources/images/icons/consoles/switch.png";
import wii from "@/resources/images/icons/consoles/wii.png";
import wiiu from "@/resources/images/icons/consoles/wiiu.png";
// import windows from "@/resources/images/icons/consoles/windows.png";
import neogeo from "@/resources/images/icons/consoles/neogeo.png";

import genesis from "@/resources/images/icons/consoles/genesis.png";
import turbografx from "@/resources/images/icons/consoles/turbografx.png";

import { Steps, Box, Center, Image } from "@chakra-ui/react";

export default function ConsoleIconsWrapper(props) {
  const icons = {
    "3ds" : ds3,
    android,
    arcade,
    dreamcast,
    ds,
    gamecube,
    gamegear,
    gb,
    gba,
    gbc,
    n64,
    neogeo,
    // neoGeoCD,
    // neoGeoPocket,
    nes,
    pico8,
    ps,
    ps2,
    ps3,
    psp,
    // psVita,
    saturn,
    snes,
    // nswitch,
    wii,
    wiiu,
    // windows,
    genesis,
    turbografx
  };

  return (
    <>
      <Box h="100%" w="100%"style={{ height: "inherit", display: "flex" }}>
        {/* {row.thumbnail && ( */}
        <Center h="100%" w="100%">
          {icons[props.console] && (
            <Image
              src={icons[props.console]?.src}
            //   pt={1}
            //   pb={1}
            //   mr={5}
            //   ml={5}

              display={"inline"}
              alt={`${props.console} small icon`}
              height={"inherit"}
            />
          )}
        </Center>
      </Box>
    </>
  );
}
