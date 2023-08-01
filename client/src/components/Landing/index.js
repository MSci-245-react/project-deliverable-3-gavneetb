import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import cinema from "../../../src/cinema.png"
import heart from "../../../src/heart.png"
import movieticket from "../../../src/movieticket.png"
import popcorn from "../../../src/popcorn.png"

function Landing() {
  
  const navigate = useNavigate();

  return (
  <>
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div>
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
    <Box
      style={{
        backgroundColor: "#FCE8FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        position: "relative",
        overflow: "hidden",
        height: "85vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          opacity: 0.1,
          zIndex: 1,
        }}
      >
        <img
          src={heart}
          style={{
            gridArea: "1 / 1 / 2 / 2",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          alt="Movie 1"
        />
        <img
          src={popcorn}
          style={{
            gridArea: "1 / 2 / 2 / 3",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          alt="Movie 2"
        />
        <img
          src={movieticket}
          style={{
            gridArea: "1 / 3 / 2 / 4",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          alt="Movie 3"
        />
      </div>
      <div
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          zIndex: 2,
          position: 'relative',
        }}
      >
        <p style={{fontSize: '96px', fontFamily: 'DM Serif Text'}}>moviesgalore.web</p>
        <img src={cinema} alt="logo" style={{height: '96px', marginRight: '10px'}} />
      </div>
    </Box>
  </>
  );
}

export default Landing;

