'use client';
import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import theme from "@/theme";

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
            <Container maxWidth="sm">
                <Typography variant="body1">
                AMAZON 2.0
                </Typography>
                <Copyright />
            </Container>
            </Box>
        </Box>
    );
}

export default Footer;