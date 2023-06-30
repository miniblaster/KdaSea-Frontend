import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography } from "@mui/material";

const NotableCollectionsData = [
  {
    collectionName: "Fitness Fiends",
    avatar:
      "https://i.seadn.io/gcs/files/55fc22d44db265cc351b8525f236eca3.png?auto=format&dpr=1&h=500",
    floorPrice: "0.02",
    totalVolumn: "0.44",
  },
  {
    collectionName: "Goofballs by Karen",
    avatar:
      "https://i.seadn.io/gcs/files/4a981d3e3647b7c48daa7a9419fd93d0.gif?auto=format&dpr=1&h=500",
    floorPrice: "0.02",
    totalVolumn: "0.26",
  },
  {
    collectionName: "REMO`s World",
    avatar:
      "https://i.seadn.io/gcs/files/34b459656ba152390101e1623227ddf1.png?auto=format&dpr=1&h=500",
    floorPrice: "0.08",
    totalVolumn: "6",
  },
  {
    collectionName: "ORBS by Tristan Rettich",
    avatar:
      "https://i.seadn.io/gcs/files/7d7c4da13909cf49716c36e3f22be4a7.png?auto=format&dpr=1&h=500",
    floorPrice: "0.38",
    totalVolumn: "75",
  },
  {
    collectionName: "CrypToadz by GREMPLIN",
    avatar:
      "https://i.seadn.io/gae/HobqLd9onF24ZGcyYoCjFIKwMUY6IfPT0Rtw6Xdn2lUx4Mfl00KpBSE7OhAvPoDf-_5o7AJWr4j_Qkw0gvuCUGK1JpQT10Rz4B3ourA?auto=format&dpr=1&h=500",
    floorPrice: "0.60",
    totalVolumn: "75000",
  },
  {
    collectionName: "GRIDS By Tristan Rettich",
    avatar:
      "https://i.seadn.io/gcs/files/74ae7b8d7ab21527ea548546614155e6.png?auto=format&dpr=1&h=500&fr=1",
    floorPrice: "0.30",
    totalVolumn: "491",
  },
  {
    collectionName: "VeeFriends Series 2",
    avatar:
      "https://i.seadn.io/gae/v5RN5nPGPkNScToAsH3ZtGevPBBZ1I3I4UZudqSw6vss5yteBBCsOI3EM94KHcjE9iyWmtnAYvqhZuffISL2OqRJFPmCW8pdseTQ?auto=format&dpr=1&h=500",
    floorPrice: "0.12",
    totalVolumn: "34000",
  },
  {
    collectionName: "GLIMPSES",
    avatar:
      "https://i.seadn.io/gcs/files/4ebe0f809a21a580f1011fe930d88f64.png?auto=format&dpr=1&h=500",
    floorPrice: "0.02",
    totalVolumn: "79",
  },
  {
    collectionName: "KILLATRAITS",
    avatar:
      "https://i.seadn.io/gcs/files/5b480c6cc6b6bffc2b66f51c7cfcd6ae.png?auto=format&dpr=1&h=500",
    floorPrice: "0.02",
    totalVolumn: "582",
  },
  {
    collectionName: "Distortion Genesis",
    avatar:
      "https://i.seadn.io/gae/cCg34XsMWEaeIZ_BRWyZXfOXny6A9xKhQ3ejbIrHvbpT3wPSSntcuZ5dz-Levc-W4CoveJ1xZfJnipGwV3NCZyA49vi_d4we-PPxWA?auto=format&dpr=1&h=500",
    floorPrice: "1.01",
    totalVolumn: "1651",
  },
  {
    collectionName: "Pudgy Rods",
    avatar:
      "https://i.seadn.io/gcs/files/14feb46a0d35ecc257bc830cca773b52.png?auto=format&dpr=1&h=500",
    floorPrice: "0.31",
    totalVolumn: "11000",
  },
  {
    collectionName: "Impostors Genesis Aliens",
    avatar:
      "https://i.seadn.io/gae/c-Z_v9W9Ege04QdpjzSsQQIkDR1h4tnBVgwgg9DBuJKdfpmziz9SBOEFBE3EjKW8XESxR_mndEtFFhhxyYUgEwZVAL32uBmQr4H1lQ?auto=format&dpr=1&h=500",
    floorPrice: "0.36",
    totalVolumn: "23000",
  },
  {
    collectionName: "ClownVamp Editions",
    avatar:
      "https://i.seadn.io/s/production/6693ad5c-3880-4e87-987a-ac3d62fa1e39.png?w=500&auto=format",
    floorPrice: "0.05",
    totalVolumn: "15",
  },
];

export default function NotableCollections() {
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Stack>
      <Slider {...settings} arrows={false}>
        {NotableCollectionsData.map((item, index) => (
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
