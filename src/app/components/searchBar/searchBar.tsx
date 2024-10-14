import React from "react";
import { Box, Button, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #dcdcdc",
        borderRadius: "30px",
        padding: "5px 15px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <InputBase
        placeholder="Type here"
        sx={{
          flex: 1,
          fontSize: "16px",
          color: "#333",
          padding: "5px 10px",
        }}
      />

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#333",
          color: "#F3C295",
          borderRadius: "20px",
          padding: "5px 20px",
          textTransform: "uppercase",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        SEARCH
        <SearchIcon sx={{ marginLeft: "10px" }} />
      </Button>
    </Box>
  );
}
