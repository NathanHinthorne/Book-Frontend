import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { InfoRounded } from "@mui/icons-material";

export default function Informational() {
  return (
    <Typography sx={{ mt: 6, mb: 3, color: "text.secondary" }}>
      <InfoRounded sx={{ mr: 1, verticalAlign: "middle" }} />
      Use this folder to store Components used in multiple routes.
    </Typography>
  );
}
