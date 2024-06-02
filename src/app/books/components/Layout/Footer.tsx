'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import theme from "@/theme";
import logo from "src/app/books/logoDarkMode.png";
import Image from 'next/image';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        no one (please don't sue us)
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '58vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto'
        }}
      >
        <Box flexDirection="row" display="flex" alignItems="center">
          <Image src={logo} alt="Logo" width={120} height={100} />
          <Box>
            <Typography variant="body1">
              AMAZON 2.0
            </Typography>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;