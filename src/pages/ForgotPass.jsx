import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {forgotPass} from '../store/slice/user';
import Loader from '../components/Loader';

const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Please input email'),
}).required();

const defaultTheme = createTheme();

export default function ForgotPass() {  
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    setPending(true)
    dispatch(forgotPass(data)).finally(() => {
        console.log('ok')
        setPending(false)
    });
    reset();
  };

  if (pending) return <Loader />

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
                Forgot Password
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Box>
        </ThemeProvider>
      </div>
    </div>
  );
}