"use client";

import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "@/app/books/view/theme";
import logo from "src/app/books/logo.png";

export default function BooksLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AppBar position="static" style={{ backgroundColor: darkTheme.palette.secondary.main }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon sx={{
              backgroundImage: `url(${logo})`,
              backgroundSize: 'cover',
              width: '64px',
              height: '64px'
            }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Amazon 2.0
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>

          </Box>
        </Toolbar>
      </AppBar>

      <main style={{ backgroundColor: darkTheme.palette.background.default }}>
        {children}
      </main>

    </section>
  );
}
