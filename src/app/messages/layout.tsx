import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

export default function MessagesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Messages
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton href="/messages/view" color="inherit">
              <EmailIcon />
            </IconButton>
            <IconButton href="/messages/send" color="inherit">
              <SendIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </section>
  );
}
