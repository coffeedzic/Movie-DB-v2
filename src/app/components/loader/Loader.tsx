import * as React from 'react';
import {
  Box,
  CircularProgress
} from '@mui/material';

const Loader = () => {
  return(
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 1
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader;