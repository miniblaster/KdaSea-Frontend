import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const NFT101Data = [
    {
        title: 'What is an NFT?',
        avatar: 'https://opensea.io/static/images/learn-center//what-is-nft.png',
    },
    {
        title: 'How to buy an NFT',
        avatar: 'https://opensea.io/static/images/learn-center//how-to-buy-nft.png',
    },
    {
        title: 'What is minting?',
        avatar: 'https://opensea.io/static/images/learn-center//what-is-minting.png',
    },
    {
        title: 'How to stay protected in web3',
        avatar: 'https://opensea.io/static/images/learn-center//stay-protected-web3.png',
    },
    {
        title: 'How to create an NFT on Kadena',
        avatar: 'https://opensea.io/static/images/learn-center//how-to-create-nft.png',
    },
    {
        title: 'How to sell an NFT using Kadena',
        avatar: 'https://opensea.io/static/images/learn-center//how-to-sell-nft.png',
    },
    {
        title: 'What is a crypto wallet?',
        avatar: 'https://opensea.io/static/images/learn-center//what-is-crypto-wallet.png',
    },
    {
        title: 'Who is Kadena',
        avatar: 'https://opensea.io/static/images/learn-center//who-is-opensea.png',
    },
]

export default function NFT101(){
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
            {NFT101Data.map((item, index) => (
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