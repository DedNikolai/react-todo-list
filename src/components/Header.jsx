import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/user';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    handleCloseUserMenu();
    dispatch(logout());
  }

  return (
    <AppBar position='fixed'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'><AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></Link>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
             <Link to='/'>TODO'S</Link> 
            </Typography>
            <Link to='/'><AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /></Link>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
             <Link to='/'>TODO'S</Link> 
            </Typography>
          {
            !user ?
          <>   
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'right' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to='/login'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </Link>
              <Link to='/register'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
   
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'right' } }}>
            <Link to='/login'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </Link>
            <MenuItem sx={{padding: '0 5px'}}>
              <Typography textAlign="center">|</Typography>
            </MenuItem>
            <Link to='/register'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button>
            </Link>
          </Box>
          </>     
          :
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'right' } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to='/profile'>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
               <MenuItem onClick={signOut}>
                  <Typography textAlign="center">Logout</Typography>
               </MenuItem>
            </Menu>
          </Box>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;