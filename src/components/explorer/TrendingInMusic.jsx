import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInMusicData = [
    {
        collectionName: 'PIXELATED',
        avatar: 'https://i.seadn.io/gcs/files/697002d708a060a18d490c3213627ecd.jpg?auto=format&dpr=1&h=500',
        floorPrice: '0.10',
        totalVolumn: '2'
    },
    {
        collectionName: 'A0K1VERSE Passport',
        avatar: 'https://i.seadn.io/gcs/files/03812601d31dc45ac91e69a6afc0a93f.png?auto=format&dpr=1&h=500',
        floorPrice: '0.04',
        totalVolumn: '2'
    },
    {
        collectionName: 'Stickmen Toys',
        avatar: 'https://i.seadn.io/gcs/files/2d21367a0bdef1d9db4505e86dba8fdd.gif?auto=format&dpr=1&h=500',
        floorPrice: '0.02',
        totalVolumn: '1'
    },
    {
        collectionName: 'WVRPS by WarpSound',
        avatar: 'https://i.seadn.io/gcs/files/696760b3a50f8f59bcccadd190e3abe0.jpg?auto=format&dpr=1&h=500',
        floorPrice: '0.04',
        totalVolumn: '0.87'
    },
    {
        collectionName: 'SAN Origin',
        avatar: 'https://i.seadn.io/gcs/files/5afb86d58153fdaa435143f57d7c62b5.png?auto=format&dpr=1&h=500',
        floorPrice: '0.03',
        totalVolumn: '0.59'
    },
    {
        collectionName: 'Another Life by Violetta',
        avatar: 'https://i.seadn.io/gcs/files/5672ef507be9e77938bd467ce0eabe22.png?auto=format&dpr=1&h=500',
        floorPrice: '0.02',
        totalVolumn: '0.42'
    },
]

export default function TrendingInMusic(){
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
            {TrendingInMusicData.map((item, index) => (
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