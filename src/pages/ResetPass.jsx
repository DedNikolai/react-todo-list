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
import {Link, useSearchParams, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPass } from '../store/slice/user';
import Loader from '../components/Loader';

const defaultTheme = createTheme();

const schema = yup.object({
  password: yup.string().required('Please input password').min(6, 'To short').max(20, 'To long'),
  passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

export default function ResetPass() {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const {id} = useParams();
  const [resetStatus, setResetStatus] = React.useState('')

  const onSubmit = (data) => {
      setResetStatus('pending')  
      const {password} = data
      dispatch(resetPass({password, id, token})).then(res => {
        setResetStatus('success')
      }).finally(() => setResetStatus('success'));
      reset();
  };

  if (resetStatus === 'pending') return <Loader />

  if (resetStatus === 'success') {
    return (
        <div className="container">
            <div className="todo-app">
                <p className="verify">
                   Your password successfully changeg please  
                   <Link to="/login" className="custom-link"> Sign In</Link>
                </p>      
            </div>
        </div>
        
    )
  }

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
                Reset Pass
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
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
                  Reset
                </Button>
                
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}