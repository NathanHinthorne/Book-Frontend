"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Input,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PriorityAvatar from "../components/Priority";
import { FormState, SendMessageFormSchema } from "./definitions";

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: "",
  alertSeverity: "",
};

export default function Send() {
  const [priority, setPriority] = React.useState(1);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const [formState, setFormState] = React.useState<FormState>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validateFields = SendMessageFormSchema.safeParse({
      name: data.get("name"),
      msg: data.get("msg"),
      priority: data.get("pri"),
    });

    if (!validateFields.success) {
      const error: FormState = {
        errors: validateFields.error?.flatten().fieldErrors,
      };
      error?.errors?.name;
      setFormState(error);

      console.log(error?.errors?.name && error.errors?.name[0]);
      console.dir({ errors: validateFields.error?.flatten().fieldErrors });
      return { errors: validateFields.error?.flatten().fieldErrors };
    } else {
      setFormState({});
    }

    fetch("http://localhost:4000/message/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
    })
      .then((res) =>
        res
          .json()
          .then((body) => ({ body: body, ok: res.ok, status: res.status }))
      )
      .then((res) => {
        console.dir(res);
        if (res.ok) {
          setAlert({
            showAlert: true,
            alertMessage: "Message sent!",
            alertSeverity: "success",
          });
        } else {
          setAlert({
            showAlert: true,
            alertMessage: "Message NOT sent! " + res.body.message,
            alertSeverity: "error",
          });
        }
        return;
      });
  };

  const handlePriorityClick = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: number
  ) => newPriority && setPriority(newPriority);

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert
          severity={alert.alertSeverity as any}
          onClose={() => setAlert(EMPTY_ALERT)}
        >
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
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
            <SendIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send Messages
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Stack direction="row" spacing={2} justifyContent="center">
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
            <TextField
              error={formState?.errors?.name != undefined}
              helperText={formState?.errors?.name ?? ""}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Sender Name"
              name="name"
              autoFocus
            />
            <TextField
              error={formState?.errors?.msg != undefined}
              helperText={formState?.errors?.msg && formState?.errors?.msg}
              margin="normal"
              required
              fullWidth
              name="msg"
              label="Message"
              id="msg"
            />
            <Input
              id="pri"
              name="pri"
              value={priority}
              sx={{ display: "none" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send!
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
