import React, { useEffect, useState, useCallback, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate  } from 'react-router-dom';
import {useWeb3React} from '@web3-react/core';
import "./mint.css";
import { useDropzone } from "react-dropzone";
import {useApi} from '../api'
import Swal from "sweetalert2";
import { Contract } from "@ethersproject/contracts";
import NftABI from "../abi/nft.abi.json";
import { uploadImageToPinata, uploadMetaDataToPinata } from "../api/pinata";
import { createNft } from "../api/api";
import Loading from "../components/Loading";
import styled from "styled-components";
import BackIcon from "../images/back.svg";
import UploadIcon from "../images/Upload.svg";
import DownArrowIcon from "../images/DownIcon.svg";

import LOGO from "../images/LOGO.svg";
import AfterLoginFooter from "../components/AfterLoginFooter";
import styles from './styles.module.scss'

const thumb = {
  display: "inline-flex",
  borderRadius: 10,
  border: "1px solid #eaeaea",
  width: "100%",
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
  position: "absolute",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: 10,
};

const MintPage = (props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [minting, setMinting] = useState(false);
  const [uploading, setUploading] = useState(true);
  const [onDroped, setOnDroped] = useState(false);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [artist, setArtist] = useState();
  const [collections, setCollections] = useState([])
  const [albums, setAlbums] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedAlbumAddress, setSelectedAlbumAddress] = useState();
  const {account} = useWeb3React();
  const {authToken} = useSelector(state => state.ConnectWallet)
  const [selected, setSelected] = useState([])

  const contractAddress = "0xdC16363e321fa962A85D5455c71572F35d7aB576";

  const accept = ['audio/*'];
  const imageRef = useRef()
  const audioRef = useRef()

  const {
    explorerUrl,
    apiUrl,
    fetchMintableCollections,
    getNonce,
    addUnlockableContent,
    checkBan,
  } = useApi()

  const getCollections = async () => {
    try {
      const {data} = await fetchMintableCollections(authToken)
      setCollections(data);
      setAlbums(data);
      console.log("Data is ", data)
      if (data.length) {
        setSelected([data[0]])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getCollections()
    }
  }, [authToken])

  const onDrop = useCallback(acceptedFiles => {
    console.log('This file is ', acceptedFiles[0]);
    if(acceptedFiles[0].type.indexOf('audio') != -1) {
      setAudio(acceptedFiles[0]);
    }
    else {
      setImage(acceptedFiles[0]);
    }
  }, [])
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept.join(', '),
    multiple: false,
    onDrop,
    maxSize: 157286400,
  });


  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <img src={file.preview} alt="alt" style={img} />
    </div>
  ));

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const selectAudio = (e) => {
    if (e.target.files[0]) {
      setAudio(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      try {
        (async () => {
          const res = await uploadImageToPinata(image);
          const url = "https://gateway.pinata.cloud/ipfs/" + res.IpfsHash;
          setImgUrl(url);
        })();
      } catch (err) {
        console.log("Error uploading files: ", err);
        Swal.fire({
          title: "Uploading to IPFS",
          text: "There is an error in uploading to IPFS",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }, [image]);

  const clickCreate = () => {
    if (name == "" || description == "" || imgUrl == "") {
      Swal.fire({
        title: "Warning",
        text: "Fill in the required fields(Name, Description, Image)",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (amount < 1) {
      Swal.fire({
        title: "Warning",
        text: "Amount is invalid",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (props.library) {
      setMinting(true);
      const contract = new Contract(
        contractAddress,
        NftABI,
        props.library
      ).connect(props.library.getSigner(props.account));
      const meta_data = {
        name,
        description,
        image: imgUrl,
        album : selectedAlbum,
        artist : selectedArtist
      };
      uploadMetaDataToPinata(meta_data)
        .then((res) => {
          setUploading(false);
          const url = "https://gateway.pinata.cloud/ipfs/" + res.IpfsHash;
          if (amount < 2) {
            contract
              .mint(url)
              .then((res) => {
                res
                  .wait()
                  .then((result) => {
                    const tokenId = result.events[0].args[2].toNumber();
                    createNft(tokenId, url, props.account).then((res) => {
                      if (res != null) {
                        Swal.fire({
                          title: "Minting Report",
                          text: "A new NFT is minted successfully",
                          icon: "success",
                          confirmButtonText: "OK",
                        });
                        setImgUrl("");
                        setFiles([]);
                        setName("");
                        setDescription("");
                        setAmount(1);
                      }
                    });
                    setMinting(false);
                    setOnDroped(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setMinting(false);
                  });
              })
              .catch((err) => {
                console.log(err);
                setMinting(false);
              });
          } else {
            const uris = [];
            for (let i = 0; i < amount; i++) uris.push(url);
            contract
              .mintBatch(uris)
              .then((res) => {
                res
                  .wait()
                  .then((result) => {
                    const txResults = [];
                    result.events.forEach((event) => {
                      const tokenId = event.args[2].toNumber();
                      const txRes = createNft(tokenId, url, props.account);
                      txResults.push(txRes);
                    });
                    Promise.all(txResults).then(() => {
                      Swal.fire({
                        title: "Minting Report",
                        text: "New NFTs are minted successfully",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                      setFiles([]);
                      setName("");
                      setDescription("");
                      setAmount(1);
                    });
                    setMinting(false);
                    setOnDroped(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setMinting(false);
                  });
              })
              .catch((err) => {
                console.log(err);
                setMinting(false);
              });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      {/* {!minting && <section className="container create-container pb-2 ma">
                <h1>Create New Item</h1>
                <div className='row d-flex align-items-center'>
                    <div className='col-md-12 col-lg-6'>
                        <h4>Image</h4>
                        <div {...getRootProps({ className: 'dropzone' })} >
                            <input {...getInputProps()} />
                            <span>File types supported: JPG, PNG Max size: 100 MB</span>
                            <div className='dropzone-placeholder'>
                                <div className={'dropzone-placeholder-mask'}>
                                    {thumbs}
                                    {!onDrop && <svg xmlns="http://www.w3.org/2000/svg" opacity={0.15} width={84} height={84} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                    </svg>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-12 col-lg-6'>
                        <label htmlFor='amount form-label font-weight-bold'>Amount</label>
                        <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='amount-input mt-2'></input>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input className="form-control" id="exampleFormControlInput1" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea disabled={minting} onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" placeholder='Provide a detail description of your item.' id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>
                <div className='mt-3'>
                    <button type="button" disabled={minting && uploading} className="btn btn-secondary" onClick={clickCreate}>Create</button>
                </div>
            </section>} */}

      {!minting && (
        <Container>
          <div className="page">
            <div className="mintPage">
              <div className="back_icon">
                <img src={BackIcon} alt="" />
              </div>
              <div className="title_info">
                <p className="title">Create New Song</p>
                <p className="info">Let’s mark your ownership to an NFT</p>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", flexDirection:'row'}}>

                <div {...getRootProps({className: styles.uploadCont})} className="item_info" style={{position:"relative"}}>
                  <p className="head">Song MP3 File</p>
                  {/* <input {...getInputProps()} ref={imageRef}/> */}
                  <label htmlFor="audio">
                      {audio && (
                        <audio controls><source src={URL.createObjectURL(audio)} type="audio/mpeg"></source></audio>
                      )}
                  </label>
                </div>
              </div>

              <div className="other_info">
                <div className="name">
                  <p>Trackname</p>
                  <input
                    type="text"
                    placeholder="A desire to Win"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="name">
                  <p>External Link</p>
                  <input
                    type="text"
                    placeholder="https://test.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/114404699..."
                  />
                </div>
                <div className="name">
                  <p>Description</p>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    disabled={minting}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="line"></div>
                <p className="noticed">
                  We noticed that you uploaded a media track would you like to
                  create an album and attach an artist to it
                </p>

                <div className="select_album">
                  <p className="select_title">Select Album and Artist</p>
                  <div className="select_album_div">
                    <div className="inner_div">
                      <p>Select Album and Artist</p>
                      <img
                        src={DownArrowIcon}
                        alt=""
                        onClick={() => setOpenMenu(!openMenu)}
                      />
                    </div>
                    <div className="create_button" onClick={() => navigate('/create-album')}>
                      <p>create new album</p>
                    </div>
                  </div>
                  {openMenu && (
                    <div className="dropdown_menu">
                      {albums.map((album, key) => (
                        <div
                          className="option"
                          onClick={() => {
                            setSelectedAlbum(album.collectionName);
                            setSelectedArtist(album.symbol);
                            setSelectedAlbumAddress(album.erc721Address);
                            setOpenMenu(false)
                          }}
                          key ={key}
                        >
                          <p>{album.collectionName}</p>
                          <p>{album.symbol}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedAlbum && (
                    <div className="name selectedAlbum">
                      <p>Album</p>
                      <div>{selectedAlbum}</div>
                    </div>
                  )}

                  {selectedArtist && (
                    <div className="name selectedArtist">
                      <p>Artist</p>
                      <div>{selectedArtist}</div>
                    </div>
                  )}
                </div>

                <div className="line"></div>

                {/* <div className="select_album">
                  <p className="select_title">Collection</p>
                  <div className="name">
                    <p>Select any collection that is there in your profile</p>
                    <div className="collection">
                      <Avatar src={Profile} className="avatar" />
                      <p>Animal Ambition</p>
                    </div>
                  </div>
                </div> */}

                <div className="select_album">
                  <p className="select_title">BlockChain</p>
                  <div className="name">
                    <div className="collection blockchain">
                      <img src={LOGO} alt="" className="logo" />
                      <p>QUID</p>
                      <img className="down_icon" src={DownArrowIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="create">
                <button>Create New Song</button>
              </div>
            </div>
            <AfterLoginFooter/>
          </div>
        </Container>
      )}
      {minting && (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width : 100vw;
  overflow-x: hidden;

  .page{
    max-height: 90vh !important;
    overflow-y : scroll;
  ::-webkit-scrollbar{
    display : none;
  }

  .mintPage {
    flex: 1;
    width: 60vw;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;

    .back_icon {
      img {
        width: 25px;
      }
      margin-bottom: 10px;
      &:hover {
        cursor : pointer;
      }
    }

    .title_info {
      .title {
        font-weight: 700;
        font-size: 30px;
      }
      .info {
        font-size: 14px;
        margin-left: 5px;
        margin-top: 10px;
      }
    }

    .item_info {
      margin-top: 20px;
      .head {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
      }
    }

    .imageContainer {
      width: 400px;
      height: 400px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      border: 1px solid lightgray;

      .uploaded_img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height : 360px;
      }

      .upload {
        display: flex;
        justify-content: center;
        background: #efefef;
        padding: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #999898;

        img {
          margin-right: 5px;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .other_info {
      display: flex;
      flex-direction: column;
      margin-top : 20px;

      .name {
        margin-bottom : 20px;
        p {
          font-weight: 400;
          font-size: 15px;
          line-height: 24px;
          color: gray;
          margin-bottom : 5px;
        }

        input{
          border : 1px solid lightgray;
          border-radius : 5px;
          padding : 10px;
          outline-width: 0;
          width : 730px;
        }

        textarea{
          border : 1px solid lightgray;
          border-radius : 5px;
          resize : none;
          width : 730px;
          height : 100px;
          outline-width: 0;
          padding : 10px;

        }
      }

      .line{
        border-top : 1px solid lightgray;
        margin-bottom : 20px;
        width : 730px;
      }

      .noticed{
        width : 600px;
        color : gray;
        font-size : 14px;
        margin-bottom : 30px;
      }
    }

    .select_title{
      font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .dropdown_menu{
         border: 1px solid lightgray;
         margin-top : -30px;
         width : 55%;
         border-top : 0 !important;
         margin-bottom : 20px;
         margin-left : 2px;

         .option{
           display : flex;
           width : 100%;
           justify-content : space-between;
           padding : 10px;
           border-bottom : 1px solid lightgray;

           &:hover {
             cursor : pointer;
             background-color : #e9e6e6;

           }

         }


      }

      .selectedAlbum{
        div{
          padding : 10px;
        background-color : #e4e2e2;
        border : 1px solid gray;
        border-radius : 5px;
        }
      }

      .selectedArtist{
        div{
          padding : 10px;
        background-color : #e4e2e2;
        border : 1px solid gray;
        border-radius : 5px;
        }
      }

    .select_album_div{
      display : flex;
      width : 730px;
      margin-bottom : 30px;

      .inner_div{
        border : 1px solid lightgray;
        border-radius : 5px;
        padding : 10px;
        display : flex;
        width : 70%;
        justify-content : space-between;

        p{
          font-size : 14px;
        }

        img{
           width : 15px;

           &:hover {
             cursor : pointer;
           }
        }
      }

      .create_button{
        border : 3px solid gray;
        border-radius : 5px;
        padding : 10px;
        display : flex;
        width : fit-content;
        margin-left : 10px;    
      }
    }

    .collection{
      border : 1px solid gray;
      border-radius : 5px;
      padding : 10px;
      display : flex;

      .avatar{
           width : 44px;
           height : 44px;
           margin-right : 15px;
      }

      p{
        margin-top : auto !important;
        margin-bottom  : auto !important;
        color : black !important;
      }
    }

    .blockchain{
      p{
        flex : 1;
      }
      .down_icon{
        width : 15px;
      }
      
      .logo{
        width : 20px;
        margin-right : 8px;
      }

    }

    .create{
      margin-top : 40px;
      display : flex;
      width : 100%;
      justify-content : center;
      margin-bottom : 40px;

      button{
          width : 250px;
          height : 50px;
          border : 0;
          background: #E0335D;
          color : white;
          border-radius : 5px;

          &:hover {
            cursor : pointer;
          }
      }
    }
  }
`;

export default MintPage;
