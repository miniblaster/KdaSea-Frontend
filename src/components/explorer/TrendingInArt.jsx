import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInArtData = [
    {
        collectionName: 'Opepen Edition',
        avatar: 'https://openseauserdata.com/files/d49add1f1c59ec1f3d808e4c81ae4065.svg',
        floorPrice: '0.70',
        totalVolumn: '105'
    },
    {
        collectionName: 'Ethernal Butterfly',
        avatar: 'https://i.seadn.io/gcs/files/eba95cbc69c5d7e18b66175ce6bec5d3.png?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '7'
    },
    {
        collectionName: 'Saved Souls',
        avatar: 'https://i.seadn.io/gcs/files/20b7d08ab3a1604b6548c89d16dfec95.png?auto=format&dpr=1&h=500',
        floorPrice: '0.05',
        totalVolumn: '8'
    },
    {
        collectionName: 'Bitlady Maker',
        avatar: 'https://i.seadn.io/gcs/files/eecf5cd71f7d00ea97d59aad35876f47.gif?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '1'
    },
    {
        collectionName: 'AIORBIT',
        avatar: 'https://i.seadn.io/gcs/files/af77635f88a552e0257f562fb820d17c.gif?auto=format&dpr=1&h=500',
        floorPrice: '<0.01',
        totalVolumn: '2'
    },
    {
        collectionName: 'Checks-VV Originals',
        avatar: 'https://openseauserdata.com/files/017514265b66647dad5f58ab55cc0ab1.svg',
        floorPrice: '0.54',
        totalVolumn: '40'
    },
    {
        collectionName: 'The Broken Keys',
        avatar: 'https://i.seadn.io/gcs/files/2a920ef8fff5a3a2ac191d68fd647ac8.png?auto=format&dpr=1&h=500',
        floorPrice: '38.89',
        totalVolumn: '27'
    },
]

export default function TrendingInArt(){
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
            {TrendingInArtData.map((item, index) => (
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