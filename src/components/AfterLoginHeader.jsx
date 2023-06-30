import React , {useState ,  useEffect} from "react";
import styled from "styled-components";
import HeaderIcon from "../images/HeaderIcon.PNG";
import SearchIcon from "../images/Search.svg";
import NotificationIcon from "../images/Notification.svg";
import Profile from "../images/profile.jpg";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from 'react-router-dom'


function AfterLoginHeader({account}) {
  const navigate = useNavigate();
  const[profileUrl,setProfileUrl] = useState(undefined);
  const[name , setName] = useState();

  useEffect(() => {
    if(account === '0xce31E9F5503FaBdCBd99137944F6f71933831cb9'){
        setName('Thomas Lang');
        setProfileUrl('https://dr56wvhu2c8zo.cloudfront.net/drumuniverse/assets/33600dfd-caa5-45b5-9726-44205e9a42d2/Francesco_002.jpg')
    }else if(account === '0xF1FDC4eb37a8395858F20AC26F4114330DD62491'){
        setName('Mel Bay');
        setProfileUrl('http://www.spotlightagency.co.za/photos/2019/20190912/176341_imageorig_513615c4.jpg')
    }else{
        setName('Craig Austin')
    }
  } ,[])

  console.log("Account is" ,account);


  return (
    <Container>
      <div className="headerIcon">
        <img src={HeaderIcon} alt="" />
      </div>
      <div className="headerInfo">
        <div className="search_bar">
          <img src={SearchIcon} alt="" />
          <input
            type="text"
            placeholder="Search artworks,collections and accounts"
          />
        </div>
        <div className="header_options">
          <div className="header_tabs">
            <p className="home"onClick={() => navigate('/home')}>Home</p>
            <p>Resources</p>
            <p onClick={() => navigate('/create')}>Create</p>
          </div>
          <div className="notifications_icon">
            <img src={NotificationIcon} alt="" />
            <div className="number">10</div>
          </div>
          <div className="profile">
              {profileUrl?(<Avatar src={profileUrl} className="avatar" onClick = {() => navigate(`/profile/${account}`)}/>):(<Avatar src={Profile} className="avatar" onClick = {() => navigate(`/profile/${account}`)}/>)}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 10px 40px rgba(0, 0, 0, 0.06);
  padding-left : 1vw;
  padding-right : 1vw;
  display: flex;
  justify-content: space-between;
  width : 100vw;
  padding-top : 1vh;
  padding-bottom : 2vh;
  height: 10vh;


  .headerIcon {
    img {
      width: 40px;
      height : 40px;
      margin-top : 5px;
    }
  }

  .headerInfo {
    display: flex;

    .search_bar {
      display: flex;
      width: 40vw;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 10px;
      margin-right: 20px;
      background: #F3F3F4;

      input {
        outline-width: 0;
        border: 0;
        width: 95%;
        background: #F3F3F4;
      }

      img {
        width: 16px;
        object-fit: contain;
        margin-right: 5px;
      }
    }

    .header_options {
      display: flex;

      .header_tabs {
        display: flex;
        p {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: 20px;
          margin-right: 20px;
          font-weight: 600;
          /* font-family: "Poppins"; */
          font-style: normal;
          font-size: 16px;
          color: #858fa2;

          &:hover {
              cursor: pointer;
          }
        }
      }
    }

    .home {
      color: black !important;
    }

    .notifications_icon {
      margin-top: 10px;
      
      margin-left: 10px;

      img{
      width: 29px;
      object-fit: contain;
      z-index: -1;
      }
    }

    .number {
      width: 21px;
      height: 21px;
      background: #e0335d;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 50%;
      font-size : 13px;
      color : #ffffff;
      text-align: center;
      margin-top : -20px;
      z-index: 999;
      position : sticky;
      margin-left : 13px;
    }

    .profile{
        margin-left : 30px;
        margin-top : auto;
        
        .avatar{
          width : 50px;
          height : 50px;

          &:hover {
              cursor : pointer;
          }
        }
    }
  }
`;

export default AfterLoginHeader;
