import React from "react";
import styled from "styled-components";
// import HeaderIcon from "../images/HeaderIcon.PNG";
import InstagramIcon from "../images/Instagram.svg";
import TwitterIcon from "../images/Twitter.svg";
import FaceBookIcon from "../images/FaceBook.svg";

function AfterLoginFooter(props) {
  return (
    <Container>
      <div className="footer">
        <div className="social">
          <p className="title">KDASEA</p>
          <p className="social_info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <div className="icons">
            <a href = "" className="icon">
              <img src={TwitterIcon} alt="" />
            </a>
            <a href = "" className="icon facebook_icon">
              <img src={FaceBookIcon} alt="" />
            </a>
            <a href = "" className="icon instagram_icon">
              <img src={InstagramIcon} alt="" />
            </a>
          </div>
        </div>
        <div className="links_div">

          <div className="linkquid_div">
            <p className="title">Linkquid</p>
            <div className="links">
              <a href = "">Discover</a>
              <a href = "">ArtWork</a>
              <a href = "">Explore</a>
              <a href = "">How it Work</a>
            </div>
          </div>

          <div className="linkquid_div">
            <p className="title">Community</p>
            <div className="links">
              <a href = "">FAQ</a>
              <a href = "">Help Center</a>
              <a href = "">Mint NFT</a>
              <a href = "">Feedback</a>
            </div>
          </div>
           
          <div className="linkquid_div third">
            <p className="title">Join NewsLetter</p>
             <p className = "info">Lorem Ipsum is simply dummy and typesetti</p>
             <input type="text" placeholder = "Enter Email" />
          </div>



        </div>



      </div>
      <div className="copyright">
          <p>© 2023 Copyright ownership • All Rights Reserved</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #282828;
  padding: 60px 0px 40px 0px;
  align-items: center;
  width : 100vw;

  .footer {
    display: flex;
    width : 70%;

    .social {
      .title {
        font-weight: 700;
        font-size: 28px;
        color: white;
      }

      .social_info {
        width: 200px;
        color: white;
        margin-top: 20px;
        font-size: 14px;
      }

      .icons {
        margin-top: 25px;
        display: flex;
        width: fit-content;

        .icon {
          display: flex;
          padding: 0px 8px 0px 8px;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          border-radius: 50%;
          margin-right: 20px;
        }

        .facebook_icon {
          padding: 8px 14px 8px 14px;
        }

        .instagram_icon {
          padding: 8px 9px 8px 9px;
        }
      }
    }

    .links_div {
      display: flex;
      padding-left: 40px;
      flex : 1;
      width : 100%;
      justify-content : space-between;

      .linkquid_div {
        margin-left: 20px;
        .title {
          color: #fb25bd;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 20px;
        }

        .links {
        display : flex;
        flex-direction: column;
          a{
            color: white;
            font-weight: 500;
            font-size: 14px;
            margin-bottom : 20px;
            text-decoration: none;
          }
        }
      }
    }

    .third{
        .info{
            width: 200px;
        color: white;
        margin-top: 20px;
        font-size: 14px; 
        }

        input{
            border-radius : 5px;
            border : 0;
            padding : 15px 10px 15px 10px;
            width : 250px;
            margin-top : 30px;
            outline-width : 0;
        }
    }
  }

  .copyright{
      p{
          text-align : center;
          color  : white;
          font-size: 14px;
          margin-top : 30px;
          margin-bottom : 15px;
      }
  }
`;

export default AfterLoginFooter;
