import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const Counter = () => {

  return (
    <div>
      <Typography variant="h3">Counter :0</Typography>

      <Button
       
        variant="contained"
        color="success"
      >
        ADD
      </Button>
      <br />
      <br />
      <Button
       
        variant="contained"
        color="error"
      >
        DEL
      </Button>
    </div>
  );
};

export default Counter;
