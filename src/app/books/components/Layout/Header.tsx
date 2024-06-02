'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import theme from "@/theme";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const searchByArray = ['Author', 'Title', 'ISBN', 'Publication Year', 'Rating'];

function Header() {
  const [value, setValue] = React.useState<string | null>(searchByArray[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="header"
        sx={{
          '& .MuiTextField-root': { m: 4, width: '30ch' },
          display: 'flex',
          alignItems: 'center',
          padding: '10px'
        }}
      >
        {/* Logo */}
        <img src= "/images/logo.png" alt="Logo" style={{ height: '100px', marginRight: '1px' }} />

        {/* Drop down menu */}
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={searchByArray}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search by" />}
        />
        {/* Search input */}
        <TextField label={`${inputValue}`} variant="standard" />
        {/* Add book icon */}
        <IconButton color="primary" aria-label="add new book" href="/books/view/bookForm">
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      
    </ThemeProvider>
  );
}

export default Header;
