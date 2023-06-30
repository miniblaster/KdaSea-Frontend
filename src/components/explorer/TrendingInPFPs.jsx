import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInPFPsData = [
    {
        collectionName: 'Azuki',
        avatar: 'https://i.seadn.io/gae/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A?auto=format&dpr=1&h=500',
        floorPrice: '14.80',
        totalVolumn: '2331'
    },
    {
        collectionName: 'BEANZ Official',
        avatar: 'https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500',
        floorPrice: '1.28',
        totalVolumn: '1373'
    },
    {
        collectionName: 'Lil Pudgys',
        avatar: 'https://i.seadn.io/gcs/files/ff12374123ac5e8571b01d03874e8a76.png?auto=format&dpr=1&h=500',
        floorPrice: '0.35',
        totalVolumn: '37'
    },
    {
        collectionName: 'internet swag',
        avatar: 'https://i.seadn.io/gcs/files/0531e051c6c5193ba067e54e9a7a5dd4.jpg?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '19'
    },
    {
        collectionName: 'Nakamigos',
        avatar: 'https://i.seadn.io/gcs/files/4582367dff6ee62dcc023a2339a5fdea.png?auto=format&dpr=1&h=500',
        floorPrice: '0.25',
        totalVolumn: '45'
    },
    {
        collectionName: 'reepz',
        avatar: 'https://i.seadn.io/gcs/files/bfd85085ffeca0147b22808813630075.png?auto=format&dpr=1&h=500',
        floorPrice: '0.07',
        totalVolumn: '13'
    },
    {
        collectionName: 'Fumo Maker',
        avatar: 'https://i.seadn.io/gcs/files/0ed12fe92220f123944fc69a0cf5861b.png?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '2'
    },
]

export default function TrendingInPFPs(){
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
        ]
      };
    return (
      <Stack>
        <Slider {...settings} arrows={false}>
            {TrendingInPFPsData.map((item, index) => (
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