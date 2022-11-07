/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "../core/theme.js";
// import { LoginDialog } from "../dialogs/LoginDialog.js";
import { Home, Privacy, Terms } from "../routes/index.js";
import { AppToolbar } from "./AppToolbar.js";
import { ErrorBoundary } from "./ErrorBoundary.js";
import Rooms from "../routes/Rooms.js";

export function App(): JSX.Element {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AppToolbar />
        <Toolbar />

        <Routes>
          <Route index element={<React.Suspense children={<Home />} />} />

          <Route
            path="/rooms"
            element={<React.Suspense children={<Rooms />} />}
          />

          <Route
            path="/privacy"
            element={<React.Suspense children={<Privacy />} />}
          />

          <Route
            path="/terms"
            element={<React.Suspense children={<Terms />} />}
          />
        </Routes>

        {/*<LoginDialog />*/}
      </ErrorBoundary>
    </ThemeProvider>
  );
}
