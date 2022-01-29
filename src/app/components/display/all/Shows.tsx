import * as React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setLoading } from '../../../redux/reducers/settings/settings';
import { setTopShows, setSearchShows } from '../../../redux/reducers/shows/shows';
import Loader from '../../loader/Loader';
import { 
  Container,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "inline-block"
  },
  overflowHidden: {
    overflow: "hidden"
  }
})

const Shows = () => {
  const classes = useStyles();
  const [siteInitialized, setSiteInitialized] = React.useState(false);
  const loading = useAppSelector(state => state.settings.loading);
  const topShows = useAppSelector(state => state.shows.topShows);
  const searchShows = useAppSelector(state => state.shows.searchShows);
  const query = useAppSelector(state => state.search.query);
  const dispatch = useAppDispatch();

  const topMoviesFetch = () => {
    dispatch(setLoading(true));
    const callOne = 'https://api.themoviedb.org/3/tv/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=1';
    const callTwo = 'https://api.themoviedb.org/3/tv/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=2';
    const requestOne = axios.get(callOne);
    const requestTwo = axios.get(callTwo);
    
    axios.all([requestOne, requestTwo])
    .then(axios.spread((...response) => {
      const showsArray = [...response[0].data.results, ...response[1].data.results];
      dispatch(setTopShows(showsArray.splice(0, 30)));
      dispatch(setLoading(false));
    }));
  };

  const searchShowsFetch = () => {    
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=1&query=${query}&include_adult=false`)
    .then(response => {
      dispatch(setSearchShows(response.data.results));
    }); 
  };

  React.useEffect(() => {
    if(query.length >= 2) {  
      dispatch(setLoading(true));
      searchShowsFetch();         
      const timeout = setTimeout(() => {       
        dispatch(setLoading(false));     
      }, 350)   
      return () => {  
        clearTimeout(timeout);
      };
    } else {
      if(!siteInitialized) {
        setSiteInitialized(true);
        topMoviesFetch();
      } else {
        dispatch(setLoading(false));
      }
    }
  }, [query]);

  const renderList = (array: any) => {
    return(
      <Grid 
        container
        spacing={5}
      >
        {array.map((item: any, index: number) => {
          return(
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
            >
              <Card>
                <Link
                  to={'/show/' + item.id}
                >
                  <CardMedia
                    component="img"
                    height="500"
                    image={item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : '/assets/images/noimage.png' }
                    alt={item.name}
                  />
                </Link>                
                <CardActions>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      width: 1
                    }}
                  >                    
                    <Link
                      to={'/show/' + item.id}
                      className={`${classes.link} ${classes.overflowHidden}`}
                    >
                      <Typography
                        variant="button"
                        noWrap
                      >
                        {item.name}
                      </Typography>                        
                    </Link>
                    <Link
                      to={'/show/' + item.id}
                      className={classes.link}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          ml: 1
                        }}
                      >                      
                        {item.vote_average} 
                      </Button>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Grid>          
          )
        })}
      </Grid>
    )
  }

  const noResults = () => {
    return(
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 1
        }}
      >
        <Typography
          variant="button"
        >
          No results!
        </Typography>
      </Box>      
    )
  }

  const renderShows = () => {
    if(query.length < 2) {
      return topShows.length > 0 ? renderList(topShows) : <Loader/>
    } else {
      return searchShows.length > 0 ? renderList(searchShows) : loading ? <Loader/> : noResults()
    }
  }

  const renderComponent = () => {
    if(loading) {
      return <Loader />
    } else {
      return renderShows()
    }
    
  }

  return(
    <Container
      sx={{
        my: 3
      }}
    >
      {renderComponent()}    
    </Container>  
  );
};

export default Shows;