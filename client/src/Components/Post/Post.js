import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useStyles from './styles';
import { toast } from 'react-toastify';

const Post = ({post, posts, setPosts }) => {

  const navigate = useNavigate()
  
  const classes = useStyles();


  
const user = JSON.parse(localStorage.getItem('profile'))

const postDelete =  async (e, id) => {
  e.preventDefault()

  let config = {
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` || 'hey',
    }
  }
  

  try {
    await axios.delete(`https://sahiltravel.herokuapp.com/api/posts/delete/${id}`, config)
    .then(res => toast.success('Deleting...'))
    .then(res => axios.get('https://sahiltravel.herokuapp.com/api/posts'))
    .then(res => setPosts(res.data))
    
    
  } catch (error) {
    console.log(error)
  }
 
  
}

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {/* <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small"><MoreHorizIcon fontSize="default" /></Button>
      </div> */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" ><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button> */}
        
        {user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ? (
          <Button size="small" 
          color="primary"
           onClick={(e) => postDelete(e, post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
        ) : ''}
        
      </CardActions>
    </Card>
  );
};

export default Post;