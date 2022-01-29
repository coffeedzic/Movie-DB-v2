import * as React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setQuery, setTyping } from '../../redux/reducers/search/search';
import { setLoading } from '../../redux/reducers/settings/settings';
import { 
  Container,
  Box,
  TextField,
  Button,
  Stack
} from '@mui/material';

const Search = () => {
  const query = useAppSelector(state => state.search.query);
  const path: string = useLocation().pathname;
  const dispatch = useAppDispatch();
  
  const isPathMovie = () => {
    return path == '/' || path == '/movies' ? 'contained' : 'outlined';
  }

  const isPathShow = () => {
    return path == '/shows' ? 'contained' : 'outlined';
  }

  const handleInput = (event: any) => {
    dispatch(setQuery(event.target.value));
    dispatch(setLoading(true));
  };

  return(
    <Container>
      <Box
        sx={{
          mt: 3
        }}
      >
        <TextField 
          id="outlined-search" 
          label="Search for movie or tv show" 
          type="search"
          variant="outlined"
          value={query}
          onChange={handleInput}
          placeholder="Example: Lord of the Rings"
          fullWidth
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: 3
        }}
      >
        <Stack 
          direction="row"
          spacing={2}
        >
          <Button
            component={Link}
            to="/movies"
            variant={isPathMovie()}
          >
            Movies
          </Button>
          <Button
            component={Link}
            to="/shows"
            variant={isPathShow()}
          >
            TV Shows
          </Button>
        </Stack>        
      </Box>
    </Container>
    
  );
};

export default Search;