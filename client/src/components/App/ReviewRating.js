import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';

const ReviewRating = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <RadioGroup value={props.selectedRating} onChange={props.handleRatingChange} row>
            <FormControlLabel value="1" control={<Radio color="secondary" />} label="1"/>
            <FormControlLabel value="2" control={<Radio color="secondary"/>} label="2" />
            <FormControlLabel value="3" control={<Radio color="secondary" />} label="3" />
            <FormControlLabel value="4" control={<Radio color="secondary"/>} label="4" />
            <FormControlLabel value="5" control={<Radio color="secondary"/>} label="5" />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}

export default ReviewRating;