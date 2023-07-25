import * as React from 'react';
import Review from './Review';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';

//need landing, search, review and home

const App = () => {
  return (
    <div>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage />} />
          {/* <Route path="/Review" element={<Review />} /> */}

        </Routes>
      </div>
    </Router>
    <Review/>
    </div>
  );
}

export default App;
