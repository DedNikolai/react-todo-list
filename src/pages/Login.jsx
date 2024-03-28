import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, Navigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSelector, useDispatch} from "react-redux";
import {login} from '../store/slice/user';

const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Please input email'),
  password: yup.string().required(),
}).required();

const defaultTheme = createTheme();

export default function Login() {  
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    reset();
  };

  if (user) return <Navigate to='/' />

  return (
    <div className="container">
      <div className="todo-app">
        <ThemeProvider theme={defaultTheme}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                  {...register("email")}
                  label={errors.email?.message || "Email Address"}
                  error={errors.hasOwnProperty('email')}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  {...register("password")}
                  label={errors.password?.message || "Input password"}
                  error={errors.hasOwnProperty('password')}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container className='auth-container'>
                  <Grid item xs>
                    <Link to="/forgot-pass" className="custom-link">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" className="custom-link">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
        </ThemeProvider>
      </div>
    </div>
  );
}