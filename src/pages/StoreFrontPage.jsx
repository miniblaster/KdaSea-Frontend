import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography, Container, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Trending from '../components/Tab/Trending';
import Top from '../components/Tab/Top';
import NotableCollections from '../components/explorer/NotableCollections';
import TrendingInGaming from '../components/explorer/TrendingInGaming';
import TopCollectorBuysToday from '../components/explorer/TopCollectorBuysToday';
import LGBTQIA from '../components/explorer/LGBTQIA';
import TrendingInArt from '../components/explorer/TrendingInArt';
import TrendingInMemberships from '../components/explorer/TrendingInMemberships';
import TrendingInMusic from '../components/explorer/TrendingInMusic';
import TrendingInPFPs from '../components/explorer/TrendingInPFPs';
import TrendingInPhotography from '../components/explorer/TrendingInPhotography';
import NFT101 from '../components/explorer/NFT101';
import ExploreCategories from '../components/explorer/ExploreCategories';

function StoreFrontPage(props) {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState('trending');

  const handleCurrentTab = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box style={{background: 'linear-gradient(#000, #fff'}}>
        <Container maxWidth={'90%'}>
          <Box sx={{ pt: '100px', fontSize: '16px' }}>
            <Stack direction={'row'} gap={2} ml={2}>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: '#f0b',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                All
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                Art
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                Gaming
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                Memberships
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                PFPs
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                Photography
              </Button>
              <Button
                variant='text'
                sx={{
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '700',
                  textTransform: 'initial',
                  ':hover': {backgroundColor: 'rgb(255, 255, 255, 0.2)'},
                }}
              >
                Music
              </Button>
            </Stack>
            <Box
              sx={{
                backgroundImage:
                  'url("https://i.seadn.io/gcs/files/ddb4eeeb499f36bfd4df94c36d1caf6b.png?auto=format&dpr=1&w=1920")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
                height: '70vh',
                m: 2,
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <img
                // src='https://i.seadn.io/gcs/files/ddb4eeeb499f36bfd4df94c36d1caf6b.png?auto=format&dpr=1&w=1920'
                style={{
                  ':hover': {
                    transform: 'scale(1.01)',
                    transition: 'transform 0.4s',
                    backgroundSize: 'cover',
                  },
                }}
              />
              <Button
                // variant='contained'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  width: '15%',
                  fontWeight: 700,
                  mb: 5,
                  mr: 5,
                  p: 2,
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: 0,
                }}
              >
                View Collection
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container maxWidth={'90%'}>
          <Box sx={{ mt: '20px' }}>
            <TabContext value={currentTab}>
              <Box>
                <TabList onChange={(e, newValue) => handleCurrentTab(newValue)} sx={{ml: 2}}>
                  <Tab label='Trending' value='trending' />
                  <Tab label='Top' value='top' />
                </TabList>
              </Box>
              <TabPanel value='trending'>
                <Trending />
              </TabPanel>
              <TabPanel value='top'>
                <Top />
              </TabPanel>
            </TabContext>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Notable Collections
            </Typography>
            <Box>
              <NotableCollections />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Top Collector Buys Today
            </Typography>
            <Box>
              <TopCollectorBuysToday />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              LGBTQIA + Pride Month Creator Spotlight
            </Typography>
            <Box>
              <LGBTQIA />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in Art
            </Typography>
            <Box>
              <TrendingInArt />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in Gaming
            </Typography>
            <Box>
              <TrendingInGaming />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in Memberships
            </Typography>
            <Box>
              <TrendingInMemberships />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in Music
            </Typography>
            <Box>
              <TrendingInMusic />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in PFPs
            </Typography>
            <Box>
              <TrendingInPFPs />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Trending in Photography
            </Typography>
            <Box>
              <TrendingInPhotography />
            </Box>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              NFT 101
            </Typography>
            <Box>
              <NFT101 />
            </Box>
          </Box>
          <Box sx={{ my: '30px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 20, m: 2 }}>
              Explore Categories
            </Typography>
            <Box>
              <ExploreCategories />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default StoreFrontPage;
