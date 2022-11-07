/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/material";
import { usePageEffect } from "../core/page.js";
import { Account } from "./Account.js";

export default function Home(): JSX.Element {
  usePageEffect({ title: "Chat app" });

  return (
    <Container sx={{ py: "20vh" }} maxWidth="sm">
      <Typography sx={{ mb: 2 }} variant="h1" align="center">
        Welcome to the chat app!
      </Typography>

      <Account />
    </Container>
  );
}
