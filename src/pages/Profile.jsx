import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import { useSelector } from 'react-redux';

const defaultTheme = createTheme();


const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Please input email'),
  firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
  lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long')
}).required();

export default function Profile() {
  const {user} = useSelector(state => state.user)
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
                {`${user.firstName + ' ' + user.lastName} Profile`}
              </Typography>
              <Avatar 
                sx={{ width: 100, height: 100 }}
                src = {user.avatarUrl} 
              />
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
                      error={errors.hasOwnProperty('firlastNamestName')}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}