import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import HeaderIcon from "../images/HeaderIcon.PNG";
import eckowallet from "../images/eckoWallet.jpg";
import googleIcon from "../images/googleIcon.svg";
import apple from "../images/apple.svg";
import FaceBookIcon from "../images/FaceBook.svg";
import { useApi } from '../api';
import { useNavigate } from 'react-router-dom';
import WalletConnectActions from '../actions/walletconnect.actions';
import AuthActions from '../actions/auth.actions';

function LoginPage(props) {
  const isXWalletInstalled = () => {
    const { kadena } = window;
    return Boolean(kadena && kadena.isKadena);
  };
  const initialize = async () => {
      !isXWalletInstalled() && alert('Please install eckoWallet')
  };

  useEffect(() => {
    initialize()
  }, [])

  const logineckowallet = async () => {
    const { kadena } = window;
    if (kadena) {

      const response = await kadena.request({
        method: 'kda_checkStatus',
        networkId: 'mainnet01',
      });

      if (response.status === "success") {
        kadena.request({
          method: 'kda_connect',
          networkId: 'mainnet01',
        });
        // navigate('/home')
      }

      console.log('account : ', response.account.account)
    }
  }

  // const dispatch = useDispatch();
  // const {
  //   apiUrl,
  //   storageUrl,
  //   getAuthToken,
  //   getAccountDetails,
  //   getIsModerator,
  // } = useApi();
  // const { account, chainId, deactivate } = useWeb3React();
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);

  // const login = async () => {
  //   props.connect();

  //   try {
  //     setLoading(true);
  //     const token = await getAuthToken(account);
  //     const isModerator = await getIsModerator(account);
  //     dispatch(WalletConnectActions.connectWallet(token, isModerator));
  //     dispatch(AuthActions.fetchStart());
  //     try {
  //       const { data } = await getAccountDetails(token);
  //       dispatch(AuthActions.fetchSuccess(data));
  //     } catch {
  //       dispatch(AuthActions.fetchFailed());
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('>>>>>>>>>>>>>>error<<<<<<<<<<<<', error);
  //     setLoading(false);
  //   }
  //   navigate('/home')

  // }

  // useEffect(() => {
  //   if (account) {
  //     login();
  //   } else {
  //     handleSignOut();
  //   }
  // }, [account, chainId]);

  // const handleSignOut = () => {
  //   deactivate();
  //   dispatch(WalletConnectActions.disconnectWallet());
  //   dispatch(AuthActions.signOut());
  // };

  return (
    <Container>
      <div className="left_animations">
      </div>
      <div className="right_container">
        <img src={HeaderIcon} alt="" />
        <p className="title">Login to your account</p>
        <div className="buttons">
          <button
            onClick={logineckowallet}
          >
            <img src={eckowallet} width="40px" alt="" />
            <p>Continue with eckoWALLET</p>
          </button>
          <button>
            <img src={googleIcon} alt="" />
            <p>Continue with google</p>
          </button>
          <button className="apple_button">
            <img src={apple} alt="" />
            <p>Continue with apple</p>
          </button>
          <button className="facebook_button">
            <img src={FaceBookIcon} alt="" />
            <p>Continue with Facebook</p>
          </button>
        </div>

        <div className="line"></div>
        <p className="or">Or</p>

        <div className="name">
          <p>Username</p>
          <input type="text" placeholder="John.snow@gmail.com" />
        </div>

        <div className="name">
          <p>Password</p>
          <input type="password" />
        </div>

        <div className="login_options">
          <div className="remember">
            <input type="radio" />
            <p>Remember me</p>
          </div>

          <a href="">Forgot Password?</a>
        </div>
        <button className="logIn_button">Log in</button>
        <p className="join">
          Don't have an account?
          <span>Join free today</span>
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh;
  overflow-x : hidden;
  overflow-y : scroll;

  ::-webkit-scrollbar{
    display : none;
  }

  .left_animations {
    width: 50%;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 30px;
    height: 93%;
  }

  .right_container {
    margin: 30px;

    .title {
      font-weight: 700;
      font-size: 30px;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      button {
        background-color: #fff;
        border: 1px solid gray;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 450px;
        margin-bottom: 10px;

        &:hover {
            cursor : pointer;
        }

        p {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: 10px;
          font-weight: 500;
        }

        img {
          margin-top: auto;
          margin-bottom: auto;
        }
      }

      .apple_button {
        background: #2d3748;
        color: #ffffff;
      }

      .facebook_button {
        background: #3b5998;
        color: #ffffff;
      }
    }

    .line {
      border-top: 1px solid gray;
      margin-bottom: 25px;
      width: 450px;
      margin-top: 20px;
    }

    .or {
      margin-top: -30px;
      text-align: center;
      font-size: 14px;
      width: fit-content;
      background-color: white;
      margin-left: auto;
      margin-right: auto;
      padding: 0 20px 0 20px;
    }

    .name {
      margin-bottom: 15px;
      p {
        font-weight: 400;
        font-size: 15px;
        line-height: 24px;
        color: gray;
        /* margin-bottom : 5px; */
      }

      input {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 12px 10px 12px 10px;
        outline-width: 0;
        width: 440px;
      }
    }

    .login_options {
      display: flex;
      width: 90%;
      justify-content: space-between;

      .remember {
        display: flex;

        p {
          margin-left: 10px;
          margin-bottom: auto;
        }

        input {
          margin-top: 5px;
        }
      }

      a {
        text-decoration: none;
        color: #2c5282 !important;
      }
    }

    .logIn_button {
      width: 450px;
      height: 50px;
      border: 0;
      background: #fb25bd;
      color: white;
      border-radius: 5px;
      margin-top: 15px;
      margin-bottom: 15px;

      &:hover {
        cursor: pointer;
      }
    }

    .join {
      text-align: center;

      span {
        color: #e0335d;
        margin-left: 5px;
      }
    }
  }
`;

export default LoginPage;
