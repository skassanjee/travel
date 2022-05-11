import React, {useState} from 'react'
import axios from 'axios'
import Post from '../Post/Post'
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useEffect  } from 'react';

 


const Posts = ({posts, setPosts}) => {  



  const classes = useStyles();
    
  return (

    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={6}>
            <Post post={post}  setPosts={setPosts} />
          </Grid>
        ))}
      </Grid>
    
    
  )
  )
}

export default Posts