"use client";

import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "@/app/books/view/theme";
import Header from "src/app/books/components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function BooksLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <AppBar position="static" style={{ backgroundColor: darkTheme.palette.secondary.main }}>
          <Toolbar>
            <Header />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>

            </Box>
          </Toolbar>
        </AppBar>

        <main>
          {children}
        </main>

        <Footer />

      </section>
    </ThemeProvider>
  );
}
