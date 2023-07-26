import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Review from './Review';

const App = () => {
  const navigate = useNavigate();

  return (
  <div>
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
    <Review/>
  </div>
  );
};

export default App;