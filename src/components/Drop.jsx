import React , {useState , useEffect} from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Profile from "../images/profile.jpg";
import {useNavigate} from 'react-router-dom'
import { ethers } from 'ethers';

function Drop(props) {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState('');
  const [itemName, setItemName] = useState('');

//   useEffect(() => {
//     fetch(props.data.tokenUri).then(res => {
//         res.json().then(result => {
//             setImgUrl(result.image);
//             const item_name = result.name + ' #' + props.data.tokenId;
//             setItemName(item_name);
//             // setFavCount(props.data.likes.length);
//             const idx = props.data.likes.findIndex(element => element == props.account);
//             // if(idx > -1)
//                 // setFav(true);
//         });
//     });
// }, [props.data]);

const clickBuy = () => {
  const url = '/detail/' + props.orderId;
  if(props.account){
    navigate(url);
  }else{
    alert('Please login to buy')
    navigate('/login');
  }
}


  return (
    <Container>
      <div className="cover_image"
       style = {{
         backgroundImage : `url(${imgUrl})`
       }}
      ></div>
      <div className="user_info">
        <Avatar src={Profile} className="avatar" />
        <p>Anon</p>
      </div>
      <div className="drop_details">
        <p className="name">{itemName}</p>
        <div className="price">
          <p className="quid">{ethers.utils.formatEther(props.price)} QUID</p>
          {/* <p className = 'dollar'>$3,594.00</p> */}
        </div>
      </div>
      <div className="buttons">
        <button onClick={clickBuy}>Buy now</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: fit-content;
  width: 351px;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-right : 20px;
  margin-bottom : 20px;

  .cover_image {
    height: 343px;
    width : 349px;
    /* background-image: url("https://media.npr.org/assets/img/2012/02/02/mona-lisa_custom-31a0453b88a2ebcb12c652bce5a1e9c35730a132.jpg"); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid lightgray;
  }

  .user_info{
    width: 170px;
    height: 50px;
    background-color: white;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: -25px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 64px;
    align-items: center;

    .avatar {
      margin-left: 10px;
      margin-right: 8px;
    }

    p {
      font-weight: 600;
      font-size: 16px;
      margin-top : auto;
      margin-bottom : auto;
    }
  }

  .drop_details {
    margin-top: 10px;
    display: flex;
    padding: 0 15px 0 15px;
    width: 100%;
    margin-bottom : 20px;

    .name{
      font-weight: 500;
      font-size: 20px;
    margin-right: 40px;
    width : 50%;

    }

    .price { 
      .quid {
        font-weight: 700;
        font-size: 20px;
        color: #e0335d;
      }

      .dollar {
        font-weight: 400;
        font-size: 15px;
        color: #858FA2;
      }
    }
  }

  .buttons{
    width: 100%;
    display : flex;
    padding: 0px 0 20px 0;
    justify-content: center;
    button{
      width : 90%;
      /* margin-left : auto;
      margin-right : auto; */
      background-color : #e0335d;
      color : white;
      padding : 8px 0 8px 0;
      border-radius : 5px;
      border : 0;

      &:hover {
        cursor  : pointer;
      }

    }
  }
`;
export default Drop;
