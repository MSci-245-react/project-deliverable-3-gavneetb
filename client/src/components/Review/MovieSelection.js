import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const MovieSelection = (props) => {

  const movieNames = props.movies.map((movie) => movie.name);

  return (
    <>
      <FormControl style={{ width: '50%'}} color="secondary" >
        <InputLabel id="movie-select-label">Select a Movie</InputLabel>
        <Select labelId="movie-select-label" id="movie-select" value={props.selectedMovie} onChange={props.handleSelectChange}>
          {movieNames.map((title) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MovieSelection;