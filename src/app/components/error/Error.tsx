import * as React from 'react'
import { Link } from 'react-router-dom';
import { 
  Container,
  Box,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "inherit"
  }
})

const Error = () => {
  const classes = useStyles()
  return(
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh"
        }}
      >
        <Typography
          variant="h1"
          color="error"
        >
          404 - Not found!
        </Typography>
        <Link 
          to="/"
          className={classes.link}
        >
          <Typography
            variant="button"
            color="inherit"
            sx={{
              textDecoration: "none"
            }}
          >
            Go back!
          </Typography>
        </Link>
      </Box>
    </Container>
  )
}

export default Error