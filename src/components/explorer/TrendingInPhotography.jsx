import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInPhotographyData = [
    {
        collectionName: 'Justin Aversano',
        avatar: 'https://i.seadn.io/gae/9nZWLd8XGK7afpwcSiv8T6KGFXqumlWMmPH0HfeqAY9ly6w1D_qP3b3-4F3pTdE8gXn-6AReXWHr1gvtBoWDYTCo80oPxz_KIFDSNnQ?auto=format&dpr=1&h=500',
        floorPrice: '16.90',
        totalVolumn: '4'
    },
    {
        collectionName: 'Every Day is a Gift',
        avatar: 'https://i.seadn.io/gcs/files/4bb654a5699142a3cef14e0a3a98058a.jpg?auto=format&dpr=1&h=500',
        floorPrice: '0.44',
        totalVolumn: '2'
    },
    {
        collectionName: 'Rad by Barry Sutton',
        avatar: 'https://i.seadn.io/gcs/files/617b6dcd87c841be305d0df7b7c6af30.png?auto=format&dpr=1&h=500',
        floorPrice: '0.11',
        totalVolumn: '0.73'
    },
    {
        collectionName: 'Auf Reisen',
        avatar: 'https://i.seadn.io/gcs/files/b7a53535f01ce4722583b9ded87a4bcd.jpg?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '0.62'
    },
    {
        collectionName: 'Women Unite',
        avatar: 'https://i.seadn.io/gae/DLA-sw1dn7YIpH-OCaY1Ci9GAO7Vc6tMlKV-46PqvdS7quNvRXfZB214rbFAv1qG7eKx8rqqS5qgNAATHQcy-tej1BPWrqeMDWPs?auto=format&dpr=1&h=500',
        floorPrice: '0.09',
        totalVolumn: '0.43'
    },
    {
        collectionName: 'Fellowship Print Deeds',
        avatar: 'https://i.seadn.io/gcs/files/469bc1fe6c954a2c65ad8379bb871af0.png?auto=format&dpr=1&h=500',
        floorPrice: '0.30',
        totalVolumn: '0.30'
    },
]

export default function TrendingInPhotography(){
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
            {TrendingInPhotographyData.map((item, index) => (
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