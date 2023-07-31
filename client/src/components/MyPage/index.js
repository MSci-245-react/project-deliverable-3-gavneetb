import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const serverURL = " ";

const MyPage = () => {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [rating, setRating] = React.useState(null);
  const [buttonClicked, setButtonClicked] = React.useState(false);


  const handleSelectChange = (event) => {
    const selectedMovie = movies.find(movie => movie.name === event.target.value);
    setSelectedMovie(selectedMovie);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    callApiGetMovies(serverURL)
      .then(res => {
        console.log("callMoviesAPI returned: ", res)
        console.log("callMoviesAPI parsed: ", res);
        setMovies(res);
      })
  }

  const callApiGetMovies = async (serverURL) => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const findMovieID = () => {
    const movie = movies.find(movie => movie.name === selectedMovie);
    if (movie) {
      return movie.id
    }
    return null;
  }

  const handleButtonClick = (value) => {
    setRating(value);
    callApiAddArticleRating()
  };


    const callApiAddArticleRating = async () => {
      const url = serverURL + "/api/addArticleRating";
      const data = {
        movie_id: 969,
        rating: 1
      };
    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      const body = await response.json();
      if (response.status !== 300) throw Error(body.message)
  
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
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Search')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  Search
                </Typography>
              </Button>
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  Review
                </Typography>
              </Button>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Grid justifyContent="center" margin="10px" marginBottom="40px" padding="20px" backgroundColor="#f0a8e0">
      <Typography align="center" variant="h3" component="h1" fontWeight="bold" color="secondary" >Give feedback to an article!</Typography>
    </Grid>
    <FormControl style={{ width: '50%'}} color="secondary" >
        <InputLabel id="movie-select-label">Select a Movie</InputLabel>
        <Select labelId="movie-select-label" id="movie-select" value={selectedMovie?.name} onChange={handleSelectChange}>
          {movies.map((movie) => (
            <MenuItem key={movie.name} value={movie.name}>
              {movie.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <Grid marginLeft="45%" marginTop="15px" padding="20px">
          <div>
            <button onClick={() => handleButtonClick(0)}>Rate as 0</button>
            <button onClick={() => handleButtonClick(1)}>Rate as 1</button>
            <p>Current rating: {rating}</p>
          </div>
        </Grid>
        {selectedMovie && <iframe width="560" height="315" src={selectedMovie.article_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
    </>
  );
};

export default MyPage;
