import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { TextField } from '@mui/material';

const ReviewBody = (props) => {
  return (
    <>
      <TextField
        label="Enter your review"
        multiline
        rows={4}
        variant="outlined"
        color="secondary"
        inputProps={{maxLength: 200}}
        fullWidth
        style={{ width: '75%'}}
        value={props.enteredReview}
        onChange={props.handleReviewChange}
      />
    </>
  );
}

export default ReviewBody;
