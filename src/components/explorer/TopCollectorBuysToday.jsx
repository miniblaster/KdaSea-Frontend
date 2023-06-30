import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TopCollectorBuysTodayData = [
    {
        collectionName: 'BEANZ Official',
        avatar: 'https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500',
        floorPrice: '1.28',
        totalVolumn: '1373'
    },
    {
        collectionName: 'BoringPunks',
        avatar: 'https://i.seadn.io/gcs/files/d2625a77b485bad7b6fffcd65af3c461.png?auto=format&dpr=1&h=500',
        floorPrice: '0.06',
        totalVolumn: '47'
    },
    {
        collectionName: 'Ethscriptions',
        avatar: 'https://i.seadn.io/gcs/files/d314228041840fda1137a562479ca0b6.png?auto=format&dpr=1&h=500',
        floorPrice: '-',
        totalVolumn: '19'
    },
    {
        collectionName: 'Kubz Relic',
        avatar: 'https://i.seadn.io/gcs/files/db2992cf06544d02438035695ecd9de7.gif?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '0.97'
    },
    {
        collectionName: 'Momoguro: Holoself',
        avatar: 'https://i.seadn.io/gcs/files/50182b51b061766036ee3912a6117873.png?auto=format&dpr=1&h=500',
        floorPrice: '0.02',
        totalVolumn: '1'
    },
    {
        collectionName: 'Lil Pudgys',
        avatar: 'https://i.seadn.io/gcs/files/ff12374123ac5e8571b01d03874e8a76.png?auto=format&dpr=1&h=500',
        floorPrice: '0.35',
        totalVolumn: '37'
    },
    {
        collectionName: 'HV-MTL',
        avatar: 'https://i.seadn.io/gcs/files/c3e23f87e1f8cb30837ec3ac3d9db808.png?auto=format&dpr=1&h=500',
        floorPrice: '0.73',
        totalVolumn: '96'
    },
    {
        collectionName: 'Doodles',
        avatar: 'https://i.seadn.io/gcs/files/ad1e55ac8d380714566a3ecfe2a7dbcb.png?auto=format&dpr=1&h=500',
        floorPrice: '1.72',
        totalVolumn: '68'
    },
    {
        collectionName: 'Azuki',
        avatar: 'https://i.seadn.io/gae/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A?auto=format&dpr=1&h=500',
        floorPrice: '14.80',
        totalVolumn: '2331'
    },
    {
        collectionName: 'Bored Ape',
        avatar: 'https://i.seadn.io/gae/RBX3jwgykdaQO3rjTcKNf5OVwdukKO46oOAV3zZeiaMb8VER6cKxPDTdGZQdfWcDou75A8KtVZWM_fEnHG4d4q6Um8MeZIlw79BpWPA?auto=format&dpr=1&h=500',
        floorPrice: '38.69',
        totalVolumn: '1354'
    },
]

export default function TopCollectorBuysToday(){
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
      };
    return (
      <Stack>
        <Slider {...settings} arrows={false}>
            {TopCollectorBuysTodayData.map((item, index) => (
                <Box key={index}>
                <Box
                  sx={{
                    margin: "10px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 16px",
                    cursor: "pointer",
                    transition: 'margin 0.3s',
                    ':hover': {marginTop: '0px'},
                  }}
                >
                  <img
                    alt={item.collectionName}
                    src={item.avatar}
                    style={{ width: "100%", height: '200px', borderRadius: '10px 10px 0px 0px', objectFit: "cover" }}
                  />
                  <Typography sx={{ margin: "15px", fontWeight: 600 }}>{item.collectionName}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "0px 0px 15px 15px",
                    }}
                  >
                    <Box sx={{ flex: "50%", margin: "" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          color: "gray",
                        }}
                      >
                        Floor
                      </Typography>
                      <Typography sx={{ fontWeight: 600 }}>{item.floorPrice} ETH</Typography>
                    </Box>
                    <Box sx={{ flex: "50%" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          marginBottom: "0px",
                          color: "gray",
                        }}
                      >
                        {" "}
                        Total Volumn{" "}
                      </Typography>
                      <Typography sx={{ fontWeight: 600 }}>{item.totalVolumn} ETH</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Slider>
      </Stack>
    );
  }