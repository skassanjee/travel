import Posts from '../../Components/Posts/Posts'
import PostForm from '../../Components/PostForm/PostForm'
import { Container, Grow, Grid} from '@material-ui/core';
import React, {useState} from 'react'
import axios from 'axios'
import { useEffect  } from 'react';

 

const Home = () => {

  const [posts, setPosts] = useState([])

  let config = {
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` || 'hey',
    }
  }
  
  useEffect(() => {

    axios.get('https://sahiltravel.herokuapp.com/api/posts', config)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
    
  }, [])

  

  return (

    <Container maxWidth="lg">
      
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts posts={posts} setPosts={setPosts} /> 
            </Grid>
            <Grid item xs={12} sm={4}>
              <PostForm  posts={posts} setPosts={setPosts} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Home