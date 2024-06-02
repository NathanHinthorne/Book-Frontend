'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import darkTheme from '../../view/theme';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';
import logo from "src/app/books/logoDarkMode.png";
import Image from 'next/image';
import Link from 'next/link';


function Header() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="header"
        sx={{
          '& .MuiTextField-root': { m: 4, width: '30ch' },
          display: 'flex',
          padding: '10px'
        }}
      >
        {/* Logo */}
        <Link href="/books/view/bookForm">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image src={logo} alt="Logo" width={120} height={100} />
          </IconButton>
        </Link>


        {/* Drop down menu */}
        <Autocomplete
          value={searchType}
          onChange={(event: any, newValue: string | null) => {
            setSearchType(newValue);
          }}
          inputValue={searchTerm}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          options={searchByArray}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="Search by" />}
        />
        {/* Search input */}
        <TextField label={`${searchTerm}`} variant="standard" />
      </Box>

    </ThemeProvider>
  );
}

export default Header;
