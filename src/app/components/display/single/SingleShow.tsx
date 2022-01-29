import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axios from 'axios';
import { setLoading } from '../../../redux/reducers/settings/settings';
import Loader from '../../loader/Loader';
import Error from '../../error/Error';
import { 
  Container,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "inherit"
  }
})

const SingleShow = () => {
  const classes = useStyles();
  const { id } = useParams();
  const loading = useAppSelector(state => state.settings.loading);
  const [show, setShow] = React.useState<any>([]);
  const [error, setError] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchShow();
  }, [])

  const fetchShow = () => {
    dispatch(setLoading(true))
      axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US`)
      .then((response: any) => {
        setShow(response.data)
        dispatch(setLoading(false))
      })
      .catch((error: any) => {
        setError(true)
        dispatch(setLoading(false))
      })
  }

  const renderShow = () => {
    if(!error) {
      return(
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h6" color="inherit">
              {show.name}
            </Typography>
            <Link
              to="/movies"              
              className={classes.link}
            >
              <Typography 
                variant="button"
                color="inherit"
              >
                Go back              
                <IconButton              
                  sx={{
                    ml: 1
                  }}
                >
                  <ArrowBackIosNewIcon
                    fontSize="small"
                    color="primary"
                  />
                </IconButton>
              </Typography>
            </Link>
          </Box>
          <Grid 
            container
            spacing={2}
            sx={{
              mt: 3
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="500"
                  image={show.poster_path ? 'https://image.tmdb.org/t/p/w500/' + show.poster_path : '/assets/images/noimage.png'}
                  alt={show.title}
                />
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
            >
              <Box>
                <Typography 
                  variant="button"
                  color="primary"
                >
                  Name of the show: 
                </Typography>
                <Typography 
                  variant="body1"
                  component="span"
                  color="inherit"
                  sx={{
                    ml: 1
                  }}
                >
                  {show.name}
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="button"
                  color="primary"
                >
                  Genres: 
                </Typography>
                <Typography 
                  variant="body1"
                  component="span"
                  color="inherit"
                  sx={{
                    ml: 1
                  }}
                >
                  {
                    show.genres ?
                    show.genres.map((item: any, index: number) => {
                      return(
                        <span 
                          key={index}
                        >
                          {item.name + ' '}
                        </span>
                      )
                    })
                    :
                    null
                  }
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="button"
                  color="primary"
                >
                  First air date: 
                </Typography>
                <Typography 
                  variant="body1"
                  component="span"
                  color="inherit"
                  sx={{
                    ml: 1
                  }}
                >
                  {show.first_air_date}
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="button"
                  color="primary"
                >
                  Rating: 
                </Typography>
                <Typography 
                  variant="body1"
                  component="span"
                  color="inherit"
                  sx={{
                    ml: 1
                  }}
                >
                  {show.vote_average}
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="button"
                  color="primary"
                >
                  Description: 
                </Typography>
                <Typography 
                  variant="body1"
                  component="span"
                  color="inherit"
                  sx={{
                    ml: 1
                  }}
                >
                  {show.overview}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
        </Container>

      )
    } else {
      return(
        <Error />
      )
    }
  }
  
  const renderComponent = () => {
    if(loading) {
      return <Loader />
    } else {
      return renderShow()
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
}

export default SingleShow