import {
  createTheme,
  type PaletteMode,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import { useMemo } from "react";

interface Props {
  children: React.ReactNode;
}

const getPalette = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {},
        }
      : {
          background: {},
        }),
  },
});

export function Theme({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () => createTheme(getPalette(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{children}</CssBaseline>
    </ThemeProvider>
  );
}
