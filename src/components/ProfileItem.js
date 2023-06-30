import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { addToLike } from '../api/api';

const AVAX_ICON = '/img/avax.png';

const ProfileItem = (props) => {
    const navigate = useNavigate();
    const imgDiv = useRef();
    const [width, setWidth] = useState();
    const [imgUrl, setImgUrl] = useState('');
    const [itemName, setItemName] = useState('');
    const [favCount, setFavCount] = useState(0);
    const [isFav, setFav] = useState(false);
    
    useLayoutEffect(() => {
        function updateSize() {
            setWidth(imgDiv.current.getBoundingClientRect().width);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    /*
    useEffect(() => {
        //console.log(props.data.tokenUri);
        fetch(props.data.tokenUri).then(res => {
            res.json().then(result => {
                //console.log(result);
                setImgUrl(result.image);
                const item_name = result.name + ' #' + props.data.tokenId;
                setItemName(item_name);
                setFavCount(props.data.likes.length);
                const idx = props.data.likes.findIndex(element => element == props.account);
                if(idx > -1)
                    setFav(true);
            });
        });
    }, []);
    */
    useEffect(() => {
        if(props.data.tokenUri) {
            fetch(props.data.tokenUri).then(res => {
                res.json().then(result => {
                    //console.log(result);
                    setImgUrl(result.image);
                    const item_name = result.name + ' #' + props.data.tokenId;
                    setItemName(item_name);
                    setFavCount(props.data.likes.length);
                    const idx = props.data.likes.findIndex(element => element == props.account);
                    if(idx > -1)
                        setFav(true);
                });
            });
        }
    }, [props.data]);

    const clickSell = () => {
        navigate('/sell/' + props.data.tokenId);
    }

    const clickFavorite = () => {
        addToLike(props.data.tokenId, props.account).then(res => {
            if(res != null) {
                setFav(true);
                setFavCount(favCount => favCount + 1);
            }
        });
    }

    if(props.data == null)
        return null;

    return (
        <div className={props.className}>
            <div className='profile-item' role={'button'}>
                <div className='d-flex align-items-center' ref={imgDiv} style={{ height: width }}>
                    <img src={imgUrl} alt='alt' className='h-100 w-100'/>
                </div>
                <div className='title-div d-flex flex-column'>
                    <span className='collection-title'>rightsmint.com</span>
                    <span className='item-title'>{itemName}</span>
                </div>
                <div className='bottom-div'>
                    {/* <svg id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" data-placement="top" title="More" width="20" height="20" fill="currentColor" className="bi bi-three-dots  dropdown-toggle" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg> */}
                    {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <ul>
                        <li>
                            <div className='ps-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <span className='ms-4'>Sell</span>
                            </div>
                        </li>

                        <li>
                            <div className='ps-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                                    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                                </svg>
                                <span className='ms-4'>Copy Link</span>
                            </div>
                        </li>
                        <li>
                            <div className='ps-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                </svg>
                                <span className='ms-4'>Transfer</span>
                            </div>
                        </li>
                        <li>
                            <div className='ps-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                <span className='ms-4'>Edit</span>
                            </div>
                        </li>
                    </ul>
                </div> */}
                    {props.type === "collected" &&
                        <React.Fragment>
                            <div className='ps-2'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg> */}
                                <span className='ms-2 sell-caption text-primary' onClick={clickSell}>Sell</span>
                            </div>
                            {
                                isFav ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill ms-auto icon-favorite-select" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart ms-auto icon-favorite" data-toggle="tooltip" data-placement="top" title="favorite" viewBox="0 0 16 16" onClick={clickFavorite}>
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                  </svg>
                            }
                            <span className='ms-2'>{favCount}</span>
                        </React.Fragment>
                    }
                    {props.type === "preview" &&
                        <React.Fragment>
                            <div className='d-flex align-items-center'>
                                <img src={AVAX_ICON} width={24} height={24} className="mx-2" alt='alt' />
                                <span>{props.price ? props.price : 0}</span>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    );
}


export default ProfileItem;
