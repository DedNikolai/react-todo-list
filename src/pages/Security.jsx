import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import {resetEmail, updateEmail} from '../store/slice/user';

const defaultTheme = createTheme();


const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Please input email'),
}).required();

export default function Security() {
  const {user} = useSelector(state => state.user);
  const [isToken, setIsToken] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: user.email,
      token: ''
    }
  });
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (!isToken) {
      dispatch(resetEmail({id: user._id, email: data.email}))
      .then(res => {
        if (res.payload.status === 200) {
          setIsToken(true);
        }
      });
    } else {
      dispatch(updateEmail({id: user._id, ...data}))
      .then(res => setIsToken(false))
    }
  };

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
              <Typography component="h1" variant="h5">
                Email
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: '100%' }}>
                <Grid container spacing={2}>
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
                  {
                    isToken ?
                    <Grid item xs={12}>
                      <TextField
                        {...register("token")}
                        label={errors.email?.message || "Code from email"}
                        fullWidth
                        id="token"
                        name="token"
                        autoComplete="Code"
                      />
                    </Grid> : ''
                  }
                  
                </Grid>
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
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}