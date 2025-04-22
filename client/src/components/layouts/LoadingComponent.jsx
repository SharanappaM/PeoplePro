import { Backdrop, Button, CircularProgress } from '@mui/material';
import React from 'react'

const LoadingComponent = () => {

  return (
    <div>
     
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
       
      >
        <CircularProgress color="primary.main" />
      </Backdrop>
    </div>
  )
}

export default LoadingComponent
