import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './Styles.js'
import Input from '../../Components/Input/Input'
import GoogleLogin from 'react-google-login'
import Icon from './Icon'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import {toast, ToastContainer} from 'react-toastify'


const Auth = () => {

  const API_KEY = process.env.REACT_APP_clientid
  const classes = useStyles()
  const navigate = useNavigate()

  
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

  const [showPassword, setShowPassword] =useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [form, setForm] = useState(initialState)



  const [isSignup, setIsSignup] = useState(false)
  
  const handleSubmit = async (e, password, confirmPassword) => {
    e.preventDefault();

    if(isSignup === false){

      try {
        await axios.post('https://sahiltravel.herokuapp.com/signin', form)
        .then(res => localStorage.setItem('profile', JSON.stringify(res.data)))
        //save result to local storage
        navigate('/')
        toast.success('Logged in succesfully!')
      } catch (error) {
        toast.error('The passwords you entered do not match, or that user does not exist!')
      }

}

    if (isSignup) {

      if(form.password !== form.confirmPassword){
        toast.error('Passwords do not match!!')
      }

      try {

        if(initialState.password !== initialState.confirmPassword){
          toast.error('Passwords do not match!!')
        }

        await axios.post('https://sahiltravel.herokuapp.com/signup', form)
        .then( res => {
         localStorage.setItem('profile', JSON.stringify(res.data))
          })
          navigate('/')
          toast.success('Account successfully created!')
      } catch (error) {

        toast.error('Sorry! That email is already in use!')
      }

    } 



    }


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj //doesn't throw an error if it doesn't exist

    const token = res?.tokenId

    try {
      //save result to local storage
      localStorage.setItem('profile', JSON.stringify({result, token}))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log('Google Sign in was unsuccessful. Try again laterr.')
  }

  
  return (
    <Container component="main" maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
        <ToastContainer position="bottom-center" limit={1} />
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {
                    isSignup && (
                      <>
        
                      <Input  name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                      <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                        
                      </>
                      )}
                      <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                      <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                      { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                      { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>

                    <GoogleLogin 
                      clientId={`${API_KEY}`}
                        render={(renderProps) => (
                        <Button className={classes.googleButton} 
                        color='primary' 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon />} 
                        variant='contained' >Sign In with Google
                        </Button>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleFailure}
                      cookiePolicy="single_host_origin"
                      />

                    <Grid container="flex-end">
                      <Grid item>
                        <Button onClick={switchMode}>
                          {isSignup ? 'Already have an account? Sign In' : `Don't have an account? Create an Account`}
                        </Button>
                      </Grid>
                    </Grid>
          
        </form>
        <ToastContainer />
      </Paper>
    </Container>
  )
}

export default Auth