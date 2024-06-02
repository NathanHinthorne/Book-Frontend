'use client';
import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import theme from "@/theme";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const searchByArray = ['Author', 'Title', 'ISBN', 'Publication Year', 'Rating'];

function Header() {
  const [value, setValue] = React.useState <string | null> (searchByArray[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box
      component="header"
      sx={{
        '& .MuiTextField-root': { m: 4, width: '30ch' },
        display: 'flex',
      }}
      // noValidate
      // autoComplete="off"
    >
      {/* drop down menu */}
      <Autocomplete
        value = {value}
        onChange = {(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue = {inputValue}
        onInputChange = {(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options = {searchByArray}
        sx = {{ width: 300 }}
        renderInput={(params) => <TextField {...params} label = "Search by" />}
      />
      {/* search input */}
      <TextField label = {`${inputValue}`} variant = "standard" />
      {/* add book icon */}
      <IconButton color = "primary" aria-label = "add new book" href = "/books/view/bookForm">
        <AddIcon fontSize = "large" />
      </IconButton>
    </Box>
  );
}

export default Header;