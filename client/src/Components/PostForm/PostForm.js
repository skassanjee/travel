import React, { useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import axios from 'axios';
import useStyles from './Styles';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";


const PostForm = ({posts, setPosts}) => {

  const navigate = useNavigate()

  const [postData, setPostData] = useState({ 
    title: '', 
    message: '', 
    tags: '', 
    selectedFile: '' 
  });

  const classes = useStyles();


  const clear = () => {
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };







  const user = JSON.parse(localStorage.getItem('profile'))

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!postData.title || !postData.message || !postData.selectedFile ){
      return toast.error('Please fill out the entire form!')
  }

  try {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` || 'hey',
      }
    }
    await axios.post('https://sahiltravel.herokuapp.com/api/posts', {
      name: user?.result?.name,
      title: postData.title,
      message: postData.message,
      tags: postData.tags,
      selectedFile: postData.selectedFile,
      creator: user?.result._id || user?.result?.googleId
  }, config)
    .then(clear())
    .then(setPosts([...posts, postData]))

  } catch (error) {
    console.log(error)
  }
  };

  if( !user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create a memory
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <ToastContainer position="bottom-center" limit={1} />
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography></Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default PostForm;