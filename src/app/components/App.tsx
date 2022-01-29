import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Search from './search/Search'
import Movies from './display/all/Movies'
import Shows from './display/all/Shows'
import SingleMovie from './display/single/SingleMovie'
import SingleShow from './display/single/SingleShow'
import Error from './error/Error';

const App = () => {  
  const renderMovies = () => {
    return(
      <div>
        <Search />
        <Movies />
      </div>
    )
  }

  const renderShows = () => {
    return(
      <div>
        <Search />
        <Shows />
      </div>
    )
  }
  return(
    <Container>
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path="/" element={renderMovies()} />
        <Route path="/movies" element={renderMovies()} />
        <Route path="/shows" element={renderShows()} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/show/:id" element={<SingleShow />} />
      </Routes>
    </Container>
  )
}

export default App