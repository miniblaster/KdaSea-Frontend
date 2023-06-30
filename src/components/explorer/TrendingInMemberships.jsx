import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInMembershipsData = [
    {
        collectionName: 'Utility Wen',
        avatar: 'https://i.seadn.io/gcs/files/8b7f62949fdf907b557995dcb36eb7d9.jpg?auto=format&dpr=1&h=500',
        floorPrice: '0.13',
        totalVolumn: '144'
    },
    {
        collectionName: 'FF6000',
        avatar: 'https://i.seadn.io/gcs/files/fd06ceb05c6939fcd7ba0efac8600a56.png?auto=format&dpr=1&h=500',
        floorPrice: '0.06',
        totalVolumn: '15'
    },
    {
        collectionName: 'BlackRock',
        avatar: 'https://i.seadn.io/gcs/files/11b45cbdd42ba340294d208d44b863c6.png?auto=format&dpr=1&h=500',
        floorPrice: '0.18',
        totalVolumn: '14'
    },
    {
        collectionName: 'Steady Stack',
        avatar: 'https://i.seadn.io/gcs/files/d34ed1514aa22989df91aec0feda0aba.gif?auto=format&dpr=1&h=500',
        floorPrice: '0.30',
        totalVolumn: '6'
    },
    {
        collectionName: 'AlfaDAO Access Cards',
        avatar: 'https://i.seadn.io/gae/PwFTjdcKHO7r-z5MZKDUfvMe6bidJOcox5pvm-iFOwcnNMZwnKxffLjFRtApDSTLt_1rz0fwaQiFfApmSps3NsVPRTlyydVkVW7l4Q?auto=format&dpr=1&h=500',
        floorPrice: '2.60',
        totalVolumn: '5'
    },
    {
        collectionName: 'Social Bear',
        avatar: 'https://i.seadn.io/gcs/files/39247760241721deff6ad36870e59bf7.png?auto=format&dpr=1&h=500',
        floorPrice: '0.25',
        totalVolumn: '4'
    },
    {
        collectionName: 'Consortium Key',
        avatar: 'https://i.seadn.io/gcs/files/8bc879f0a6c5f92993686103285ce454.jpg?auto=format&dpr=1&h=500',
        floorPrice: '2.11',
        totalVolumn: '4'
    },
]

export default function TrendingInMemberships(){
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
            {TrendingInMembershipsData.map((item, index) => (
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