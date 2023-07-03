import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Stack,
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
  Divider,
  Drawer,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material';
import { Container } from '@mui/system';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
          '#fff'
        )}' d='M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
        '#fff'
      )}' d='M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Header = (props) => {
  const [account, setAccount] = useState('');
  const [cartopen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const clickLogo = () => {
    navigate('/marketplace');
  };

  const isXWalletInstalled = () => {
    const { kadena } = window;
    return Boolean(kadena && kadena.isKadena);
  };

  const initialize = async () => {
    !isXWalletInstalled() && alert('Please install eckoWallet');
  };

  useEffect(() => {
    initialize();
  }, []);

  const toggleMode = () => {
    props.setMode(props.mode === 'light' ? 'dark' : 'light');
  };

  const connectwallet = async () => {
    const { kadena } = window;

    if (kadena) {
      const response = await kadena.request({
        method: 'kda_checkStatus',
        networkId: 'mainnet01',
      });

      if (response.status === 'fail') {
        kadena.request({
          method: 'kda_connect',
          networkId: 'mainnet01',
        });
      }

      setAccount(response.account.account);
    }
  };

  const handleCart = (event) => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }

    setCartOpen(true);
  }

  // Shows the border bottom box shadow of toolbar
  // only when users scorll down.
  useEffect(() => {
    window.addEventListener('scroll', function () {
      var toolbar = document.getElementById('toolbar-menu');
      var searchBar = document.getElementById('nav-searchbar');
      var btnConnect = document.getElementById('btn-connect');
      var btnAccount = document.getElementById('btn-account');
      var btnCart = document.getElementById('btn-cart');
      if (toolbar) {
        toolbar.style.boxShadow = 'none';
        toolbar.style.backgroundColor = 'transparent';
        toolbar.style.color = 'white';
        searchBar.style.border = 'none';
        btnConnect.style.border = 'none';
        btnAccount.style.border = 'none';
        btnCart.style.border = 'none';
        searchBar.style.border = 'none';
        if (window.scrollY > 0) {
          toolbar.style.boxShadow = '1px 2px 8px rgba(0, 0, 0, 0.2)';
          toolbar.style.backgroundColor = 'white';
          toolbar.style.color = 'black';
          searchBar.style.border = '1px solid lightgray';
          btnConnect.style.border = '1px solid lightgray';
          btnAccount.style.border = '1px solid lightgray';
          btnCart.style.border = '1px solid lightgray';
        }
      }
    });
  }, []);

  return (
    <Stack ml={'-24px'} >
      <Container maxWidth={'100%'}>
        <Stack
          id='toolbar-menu'
          width={'100%'}
          py={1}
          pl={'2rem'}
          pr={'3.5rem'}
          direction={'row'}
          position={'fixed'}
          alignItems={'center'}
          backgroundColor={'transparent'}
          zIndex={10001}
          color={'white'}
          style={{transition: 'background-color 0.4s, color 0.2s'}}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
          >
            <Logo />
            <Typography
              sx={{
                mx: '25px',
                color: 'inherit',
                fontWeight: 900,
                fontSize: 24,
              }}
            >
              KdaSea
            </Typography>
          </Stack>
          <Divider
            orientation='vertical'
            variant='middle'
            sx={{ height: '40px !important' }}
          />
          <Stack direction={'row'} alignItems={'center'} mt={'3px'}>
            <Button
              color='inherit'
              sx={{
                mx: '15px',
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'initial',
              }}
            >
              Drops
            </Button>
            <Button
              color='inherit'
              sx={{
                mr: '20px',
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'initial',
              }}
            >
              Stats
            </Button>
          </Stack>
          <Box
            id="nav-searchbar"
            direction={'row'}
            sx={{
              pr: '0.5rem',
              p: 0.5,
              mr: '0.75rem',
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              border: 'none',
              borderRadius: '0.75rem',
              backgroundColor: 'rgb(255, 255, 255, 0.2)',
            }}
          >
            <IconButton sx={{ pl: '0.5rem', color: 'inherit' }} aria-label='menu'>
              <SearchOutlinedIcon />
            </IconButton>
            <InputBase
              sx={{ flex: 1, color: 'inherit' }}
              placeholder='Search items, collections, and accounts'
              inputProps={{
                'aria-label': 'Search items, collections, and accounts',
              }}
            />
            <Button
              variant='contained'
              sx={{
                minWidth: '1rem',
                p: '0.05rem 0.65rem',
                borderRadius: '0.5rem',
                color: 'white !important',
              }}
              disabled
            >
              {'/'}
            </Button>
          </Box>
          <Button
            id='btn-connect'
            variant='outlined'
            color='inherit'
            startIcon={<WalletOutlinedIcon />}
            onClick={connectwallet}
            sx={{
              mr: '-1px',
              p: 1.5,
              minWidth: '190px',
              borderRadius: '0.75rem 0px 0px 0.75rem',
              border: 'none',
              backgroundColor: 'rgb(255, 255, 255, 0.2)',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'initial',
              }}
            >
              {' '}
              {account ? showAddress(account) : 'Connect wallet'}
            </Typography>
          </Button>
          <Button
            id='btn-account'
            variant='outlined'
            color='inherit'
            sx={{
              ml: '0px',
              p: 1.5,
              minWidth: 2.5,
              borderRadius: '0px 0.75rem 0.75rem 0px',
              border: 'none',
              backgroundColor: 'rgb(255, 255, 255, 0.2)',
            }}
          >
            <AccountCircleOutlinedIcon />
          </Button>
          <Button
            id='btn-cart'
            variant='outlined'
            color='inherit'
            sx={{ ml: 1, p: 1.5, minWidth: '45px', border: 'none', borderRadius: '0.75rem', backgroundColor: 'rgb(255, 255, 255, 0.2)' }}
            onClick={handleCart}
          >
            <ShoppingCartOutlinedIcon />
          </Button>
          {/* <Drawer
            sx={{m: '1rem'}}
            anchor={'right'}
            open={cartopen}
            onClose={setCartOpen(false)}
          >
            <Box
              width={'auto'}
              role='presentation'
              onClick={setCartOpen(false)}
            >
              <Typography variant='h2'>Your cart</Typography>
              <Divider />
              <Box>
                <Button variant='contained' color='secondary'>Complete purchase</Button>
              </Box>
            </Box>
          </Drawer> */}
        </Stack>
      </Container>
    </Stack>
  );
};

const showAddress = (addrStr) => {
  const firstStr = addrStr.substr(0, 5);
  const secondStr = addrStr.substr(38, 4);
  return firstStr + '...' + secondStr;
};

export const Logo = () => (
  <div style={{ display: 'flex', width: '40px' }}>
    <img src='logo_kdasea.png' width='70px' />
  </div>
);

export default Header;
