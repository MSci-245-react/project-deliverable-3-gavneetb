import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Box, Grid, Button, Typography } from '@mui/material';


const Search = () => {
  const navigate = useNavigate();

  const [movieTitle, setMovieTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [results, setResults] = useState([]);

  const handleTitleChange = (event) => {
    setMovieTitle(event.target.value);
  };

  const handleActorChange = (event) => {
    setActorName(event.target.value);
  };

  const handleDirectorChange = (event) => {
    setDirectorName(event.target.value); 
  };

  const handleMovieSearch = () => {
    callApiFindSearchedMovie()
      .then(res => {
        console.log("callApiFindSearchedMovie returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiFindSearchedMovie parsed: ", parsed[0])
        setResults(parsed);
        console.log(results)
        console.log(res)
      });
  }
  
  const callApiFindSearchedMovie = async () => {
    const serverURL = "";
    
    const url = serverURL + "/api/getSearchedMovie";
    console.log("URL:", url);
    console.log("Search by:", movieTitle, actorName, directorName);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieTitle: movieTitle,
        actorName: actorName,
        directorName: directorName
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const body = await response.json();
    console.log("Found movie information:", body);
    return body;
  };


  return (
  <>
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div>
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  Landing
                </Typography>
              </Button>
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  Review
                </Typography>
              </Button>
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/MyPage')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  MyPage
                </Typography>
              </Button>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      <Grid justifyContent="center" margin="10px" marginBottom="40px" padding="20px" backgroundColor="#f0a8e0">
        <Typography align="center" variant="h3" component="h1" fontWeight="bold" color="secondary" >Search for a Movie!</Typography>
      </Grid>
      <Box>
        <Grid 
          container
          direction="column" 
          alignItems="center" 
          justify="center" 
          spacing={3}
        >
          <Grid item xs={12}>
            <Container>
              <TextField 
                label="Movie Title" 
                variant="outlined" 
                value={movieTitle} 
                onChange={handleTitleChange} 
                fullWidth
              />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container sx={{ maxWidth: '60%' }}>
              <TextField 
                label="Actor Name" 
                variant="outlined" 
                value={actorName} 
                onChange={handleActorChange} 
                fullWidth
              />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container sx={{ maxWidth: '60%' }}>
              <TextField 
                label="Director Name" 
                variant="outlined" 
                value={directorName} 
                onChange={handleDirectorChange} 
                fullWidth
              />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container sx={{ maxWidth: '60%' }}>
              <Button variant="contained" color="secondary" textAlign="center" onClick={handleMovieSearch}>
                Search
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Box>
      <Box>
      {results.length > 0 && (
        <Grid container direction="column" alignItems="center" justify="center" spacing={3}>
            {results.map((movie) => (
              <Grid item key={movie.id}>
                <Typography variant="h6">Movie: {movie.movie_name}</Typography>
                <Typography variant="h6">Actors: {movie.actors}</Typography>
                <Typography variant="h6">Directors: {movie.directors}</Typography>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  </>
  );
};

export default Search;
