import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import thumbsdown from "../../../src/thumb-down.png"
import thumbsup from "../../../src/thumb-up.png"

const serverURL = " ";

const MyPage = () => {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [rating, setRating] = React.useState(null);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');


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
    const movie = movies.find(movie => movie.name === selectedMovie.name);
    console.log("SELECTEDMOVIE:", selectedMovie);
    console.log("MOVIE:", movie);
    if (movie) {
      return movie.id
    }
    return null;
  }

  const handleFeedbackClick = () => {
    if (feedback === '') {
      console.log('No feedback provided');
      return;
    }

    callApiAddArticleRating()

    setFeedback('');
    setRating(null);
    setButtonClicked(false);
    setSelectedMovie("");
  }
  
  const handleButtonClick = (value) => {
    setButtonClicked(true);
    setRating(value);
  };


    const callApiAddArticleRating = async () => {
      const url = serverURL + "/api/addArticleRating";
      const data = {
        movie_id: findMovieID(),
        rating: rating,
        feedback: feedback
      };
    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      const body = await response.json();
      if (response.status !== 200 && response.status !== 201) throw Error(body.message);
  
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
    <CssBaseline />
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#FCE8FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px"
      }}
    >
      <Container maxWidth="lg">  {/* Change here */}
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>
            <FormControl style={{ width: '350px'}} color="secondary">
              <InputLabel id="movie-select-label">Select a Movie</InputLabel>
              <Select labelId="movie-select-label" id="movie-select" value={selectedMovie?.name} onChange={handleSelectChange}>
                {movies.map((movie) => (
                  <MenuItem key={movie.name} value={movie.name}>
                    {movie.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedMovie && (
            <>
              <Grid item>
                <iframe style={{ backgroundColor: "white" }} width="700px" height="350px" src={selectedMovie.article_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleButtonClick(0)}>
                  <img src={thumbsdown} alt="Rate as 0" style={{width: "60px", height: "60px"}} />
                </IconButton>
                <IconButton  onClick={() => handleButtonClick(1)}>
                  <img src={thumbsup} alt="Rate as 1" style={{width: "60px", height: "60px"}} />
                </IconButton>
              </Grid>
            </>
          )}
          {buttonClicked && (
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Provide feedback"
                  variant="outlined"
                  color="secondary"
                  style={{ width: '500px', marginTop: '20px', marginBottom: '20px' }}
                  onChange={(event) => setFeedback(event.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={() => handleFeedbackClick()} style={{ marginBottom: '20px' }}>
                  Submit
                </Button>
              </Grid>
            </Grid>            
          )}
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default MyPage;
