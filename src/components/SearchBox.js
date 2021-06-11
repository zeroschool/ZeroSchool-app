import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBox() {
  const [input, setInput] = useState("");

  const handleChange = (prop) => (event) => {
    setInput(event.target.value);
  };
  console.log(input);

  const handleSubmit = (prop) => (event) => {
    console.log("here");
  };

  return (
    <div>
      <FormControl
        style={{
          color: "#000000",
          borderRadius: "6px",
          backgroundColor: "#F5F5F5"
        }}
        fullWidth
        onSubmit={handleSubmit}
      >
        <OutlinedInput
          style={{
            color: "#000000",
            borderRadius: "6px",
            backgroundColor: "#F5F5F5"
          }}
          id="standard-search"
          variant="outlined"
          disableUnderline
          value={input}
          onChange={handleChange(input)}
          placeholder="Search"
          required
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <a
                href="https://twetch.app/search.advanced"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                Advanced
              </a>
            </InputAdornment>
          }
          aria-describedby="standard-search-helper-text"
          inputProps={{
            "aria-label": "search Term"
          }}
        />
      </FormControl>
    </div>
  );
}
