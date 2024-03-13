import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { create } from '../store/slice/user';

const defaultTheme = createTheme();

const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Please input email'),
  password: yup.string().required('Please input password').min(6, 'To short').max(20, 'To long'),
  passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
  lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long')
}).required();

export default function Register() {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();


  const onSubmit = (data) => {
      dispatch(create(data))
  };

  if (user) return <Navigate to='/' />

  return (
    <div className="container">
      <div className="todo-app">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register("firstName")}
                      label={errors?.firstName?.message || "First Name"}
                      error={errors.hasOwnProperty('firstName')}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register("lastName")}
                      label={errors?.lastName?.message || "Last Name"}
                      error={errors.hasOwnProperty('lastName')}
                      required
                      fullWidth
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("email")}
                      label={errors.email?.message || "Email Address"}
                      error={errors.hasOwnProperty('email')}
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("password")}
                      label={errors.password?.message || "Input password"}
                      error={errors.hasOwnProperty('password')}
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("passwordConfirmation")}
                      label={errors.passwordConfirmation?.message || "Confirm password"}
                      error={errors.hasOwnProperty('passwordConfirmation')}
                      required
                      fullWidth
                      name="passwordConfirmation"
                      type="password"
                      id="passwordConfirmation"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" className="custom-link">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}