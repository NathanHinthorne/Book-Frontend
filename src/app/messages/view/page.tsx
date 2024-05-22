"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { IMessage } from "@/core/model/message.model";
import PriorityAvatar from "../components/Priority";

const defaultTheme = createTheme();

function MessageListItem({
  message,
  onDelete,
}: {
  message: IMessage;
  onDelete: (name: string) => void;
}) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(message.name)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <PriorityAvatar priority={message.priority} />
      </ListItemAvatar>
      <ListItemText
        primary={message.message}
        secondary={message.name}
        secondaryTypographyProps={{ color: "blue" }}
      />
    </ListItem>
  );
}

export default function View() {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [priority, setPriority] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:4000/message/all")
      .then((res) => res.json())
      .then((data) => setMessages(data.entries));
  }, []);

  const handleDelete = (name: string) => {
    fetch("http://localhost:4000/message/" + name, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    }).then(
      (res) => res.ok && setMessages(messages.filter((msg) => msg.name != name))
    );
  };

  const handlePriorityClick = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: number
  ) => setPriority(newPriority ?? 0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Read Messages
          </Typography>
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              exclusive
              value={priority}
              onChange={handlePriorityClick}
            >
              <ToggleButton value={1}>
                <PriorityAvatar priority={1} />
              </ToggleButton>
              <ToggleButton value={2}>
                <PriorityAvatar priority={2} />
              </ToggleButton>
              <ToggleButton value={3}>
                <PriorityAvatar priority={3} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Box sx={{ mt: 1 }}>
            <List>
              {messages
                .filter((msg) => priority == 0 || priority == msg.priority)
                .map((msg, index, messages) => (
                  <React.Fragment key={"msg list item: " + index}>
                    <MessageListItem message={msg} onDelete={handleDelete} />
                    {index < messages.length - 1 && (
                      <Divider variant="middle" component="li" />
                    )}
                  </React.Fragment>
                ))}
            </List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
