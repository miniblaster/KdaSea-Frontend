import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const TrendingInGamingData = [
    {
        collectionName: 'HV-MTL',
        avatar: 'https://i.seadn.io/gcs/files/c3e23f87e1f8cb30837ec3ac3d9db808.png?auto=format&dpr=1&h=500',
        floorPrice: '0.73',
        totalVolumn: '96'
    },
    {
        collectionName: 'AQUA FARM NFTs: Aree',
        avatar: 'https://i.seadn.io/gae/aIE-KdRyQXVZAI3QDsiXTIp4wC-QzwOg8XV4BnDN2sUmmwXd9HqYWsHeYbUYCx0JWd8iSqZAnbjjjsiavSFe-QjkACCfhVibza__Ng?auto=format&dpr=1&h=500',
        floorPrice: '0.33',
        totalVolumn: '0.40'
    },
    {
        collectionName: 'League of Kingdoms',
        avatar: 'https://i.seadn.io/gcs/files/4965e5bc08af5969d2a5b711e277e70a.png?auto=format&dpr=1&h=500',
        floorPrice: '58.99',
        totalVolumn: '4'
    },
    {
        collectionName: 'The Beacon',
        avatar: 'https://i.seadn.io/gcs/files/acc49678ae67e78a18f868dc23e5c6dc.png?auto=format&dpr=1&h=500',
        floorPrice: '0.01',
        totalVolumn: '2'
    },
    {
        collectionName: 'Otherside Koda',
        avatar: 'https://i.seadn.io/gcs/files/90319cbe55a88e2051b09e5d4058ce43.png?auto=format&dpr=1&h=500',
        floorPrice: '5.69',
        totalVolumn: '34'
    },
    {
        collectionName: 'Otherdeed Expanded',
        avatar: 'https://i.seadn.io/gcs/files/993fb5fc51ba0ad55f15e2856bc32f83.png?auto=format&dpr=1&h=500&fr=1',
        floorPrice: '0.59',
        totalVolumn: '33'
    },
    {
        collectionName: 'Pixelmon',
        avatar: 'https://i.seadn.io/gcs/files/15253f057fda61d8498f3e8264c2be23.png?auto=format&dpr=1&h=500',
        floorPrice: '0.54',
        totalVolumn: '30'
    },
]

export default function TrendingInGaming(){
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
            {TrendingInGamingData.map((item, index) => (
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