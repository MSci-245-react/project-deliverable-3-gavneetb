import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { TextField } from '@mui/material';

const ReviewTitle = (props) => {
  return (
    <>
      <TextField
        label="Review Title"
        variant="outlined"
        value={props.enteredTitle}
        fullWidth
        style={{ width: '75%'}}
        color="secondary"
        onChange={props.handleTitleChange}
      />
    </>
  );
}

export default ReviewTitle;
