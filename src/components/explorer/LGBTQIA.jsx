import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from '@mui/material'

const LGBTQIAData = [
    {
        collectionName: 'I Live Here Now',
        avatar: 'https://i.seadn.io/s/production/dad50fcb-455d-42d9-af33-94b41cf21c7a.png?w=500&auto=format',
        floorPrice: '1.75',
        totalVolumn: '78'
    },
    {
        collectionName: 'Shakti Gomez',
        avatar: 'https://i.seadn.io/s/production/dba15a19-5a3b-4c7e-b93c-3b4f21d348b6.png?w=500&auto=format',
        floorPrice: '0.05',
        totalVolumn: '0.03'
    },
    {
        collectionName: 'ClownVamp',
        avatar: 'https://i.seadn.io/s/production/38d851cc-474f-48bd-bd5f-636a7d9ff75c.png?w=500&auto=format',
        floorPrice: '0.03',
        totalVolumn: '82'
    },
    {
        collectionName: 'Emotion Check-In',
        avatar: 'https://i.seadn.io/s/production/34f5e483-ffc3-45cb-81b0-ba31c263e128.png?w=500&auto=format',
        floorPrice: '0.05',
        totalVolumn: '26'
    },
    {
        collectionName: 'Middle Of Nowhere',
        avatar: 'https://i.seadn.io/s/production/8659f6e4-d1fd-4585-91f3-5940cf33db4c.png?w=500&auto=format',
        floorPrice: '0.05',
        totalVolumn: '0.27'
    },
    {
        collectionName: 'Midnight Meta',
        avatar: 'https://i.seadn.io/s/production/8b7d00fa-2bd8-41ef-a0f5-3d32faa0e317.png?w=500&auto=format',
        floorPrice: '<0.01',
        totalVolumn: '0.11'
    },
    {
        collectionName: 'Memorias Fer RAW',
        avatar: 'https://i.seadn.io/s/production/c0ad500e-2602-4fb4-ac65-901233c20abc.png?w=500&auto=format',
        floorPrice: '<0.01',
        totalVolumn: '0.06'
    },
    {
        collectionName: 'Whatsherface Editions',
        avatar: 'https://i.seadn.io/s/production/17b7e0cc-af72-477f-9d33-666724e8013d.png?w=500&auto=format',
        floorPrice: '0.02',
        totalVolumn: '0.21'
    },
]

export default function LGBTQIA(){
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
            {LGBTQIAData.map((item, index) => (
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