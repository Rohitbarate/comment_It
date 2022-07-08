import React from 'react';
import './App.css';
import Home from './components/home/Home';
import CommentContainer from './components/CommentContainer/CommentContainer';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


const App = () => {
  return (
    <Router basename='/comment_It'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/commentContainer' element={<CommentContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
