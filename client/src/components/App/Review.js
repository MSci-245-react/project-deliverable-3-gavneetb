import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Box, Grid, Button, Typography } from '@mui/material';

const Review = () => {

  const serverURL = "";

  //assuming setUserid will be used later
  const [movies, setMovies] = React.useState([]);
  const [userid, setUserid] = React.useState(1);

  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [completedField, setCompletedField] = React.useState(false);

  const [enteredTitle, setEnteredTitle] = React.useState("");
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [enteredReview, setEnteredReview] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");


  const [subEnteredTitle, setSubEnteredTitle] = React.useState("");
  const [subSelectedMovie, setSubSelectedMovie] = React.useState("");
  const [subEnteredReview, setSubEnteredReview] = React.useState("");
  const [subSelectedRating, setSubSelectedRating] = React.useState("");


  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
    setSubEnteredReview(enteredReview);
    setSubEnteredTitle(enteredTitle);
    setSubSelectedMovie(selectedMovie);
    setSubSelectedRating(selectedRating);
    callApiAddReview()


    if (enteredTitle !== "" && enteredReview !== "" && selectedMovie !== "" && selectedRating !== "") {
      setCompletedField(true);
      setEnteredReview("");
      setEnteredTitle("");
      setSelectedMovie("");
      setSelectedRating("");
    } else {
      setCompletedField(false);
    }
  };

  const findMovieID = () => {
    const movie = movies.find(movie => movie.name === selectedMovie);
    if (movie) {
      return movie.id
    }
    return null;
}

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

  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    const data = {
      id: findMovieID(),
      userId: userid,
      reviewTitle: enteredTitle,
      reviewContent: enteredReview,
      reviewScore: selectedRating
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
    <div>
      <Grid justifyContent="center" margin="10px" padding="20px" backgroundColor="#f0a8e0">
        <Typography align="center" variant="h3" component="h1" fontWeight="bold" color="secondary" >Review a Movie!</Typography>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Grid container spacing={4} justifyContent="center" marginTop="15px" marginLeft="10%">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" color="secondary" padding="7px">Enter the title of your review:</Typography>
            <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} buttonClicked={buttonClicked} />
            {buttonClicked && !completedField && !enteredTitle && (
              <>
                <Typography variant="body1" color="#cd2b1d" marginTop={2}>
                  Enter your review title
                </Typography>
              </>
            )}
            <Typography variant="h6" component="h2" padding="7px" marginTop="10%" color="secondary">Select a movie:</Typography>
            <MovieSelection movies={movies} selectedMovie={selectedMovie} handleSelectChange={handleSelectChange} buttonClicked={buttonClicked} />
            {buttonClicked && !completedField && !selectedMovie && (
              <>
                <Typography variant="body1" color="#cd2b1d" marginTop={2}>
                  Select your movie
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" padding="7px" color="secondary">Select your rating:</Typography>
              <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} buttonClicked={buttonClicked} />
              {buttonClicked && !completedField && !selectedRating && (
              <>
                <Typography variant="body1" color="#cd2b1d" marginTop={2}>
                  Select your rating
                </Typography>
              </>
              )}
              <Typography variant="h6" component="h2" padding="7px" marginTop="10%"  color="secondary">Enter your review:</Typography>
              <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} buttonClicked={buttonClicked}/>
              {buttonClicked && !completedField && !enteredReview && (
              <>
                <Typography variant="body1" color="#cd2b1d" marginTop={2}>
                  Enter your review
                </Typography>
              </>
               )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid marginLeft="45%" marginTop="15px" padding="20px">
        <Button variant="contained" color="secondary" onClick={handleButtonClick} marginTop={2}>
          Submit
        </Button>
      </Grid>
      <Grid padding="20px">
        {buttonClicked && completedField && (
          <>
            <Typography variant="body1" color="secondary" style={{ marginTop: "25px" }} textAlign={"center"}>
              Your review has been received! <br />
              <strong>Review Title:</strong> {subEnteredTitle} 🌸 <strong>Selected Movie:</strong> {subSelectedMovie} 🌸 <strong>Selected Rating:</strong> {subSelectedRating} 🌸 <strong>Review:</strong> {subEnteredReview}
            </Typography>
          </>
        )}
      </Grid>
    </div>
  );
}

export default Review;