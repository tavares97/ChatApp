import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#121212",
      },
    },
  },
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});

export default theme;
