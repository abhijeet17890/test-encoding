import React from "react";
import { ThemeProvider } from "styled-components";
import * as mainTheme  from '../constants/mainTheme'

const globalTheme = {
        colors: mainTheme.COLOR_PALETTE,
        fontConfig: mainTheme.FONT_CONFIG,
        elementDistances:mainTheme.ELEMENT_DISTANCES,
        generalConfig: mainTheme.GENERAL_CONFIG,
};

const GlobalTheme = ({ children }) => (
    <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>
);

export default GlobalTheme;