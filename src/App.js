import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";

import GlobalStyles from "src/components/GlobalStyles";
import ScrollToTop from "src/layouts/DashboardLayout/ScrollToTop";
import theme from "src/theme";
import routes from "src/routes";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ScrollToTop>{routing}</ScrollToTop>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
