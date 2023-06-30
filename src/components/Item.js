import React, { useEffect, useState } from 'react';
import LikeOutline from './assets/like_outline.png';
import LikeFilled from './assets/like_filled.png';
import AvaxLogo from './assets/avax.png';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { addToLike } from '../api/api';
import { nonames } from './admin';


const NFTItem = props => {

    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState('');
    const [favCount, setFavCount] = useState(0);
    const [isFav, setFav] = useState(false);
    const [itemName, setItemName] = useState('');
    


    

    useEffect(() => {
        fetch(props.data.tokenUri).then(res => {
            res.json().then(result => {
                setImgUrl(result.image);
                const item_name = result.name + ' #' + props.data.tokenId;
                setItemName(item_name);
                setFavCount(props.data.likes.length);
                const idx = props.data.likes.findIndex(element => element == props.account);
                if(idx > -1)
                    setFav(true);
            });
        });
    }, [props.data]);

    const clickBuy = () => {
        const url = '/detail/' + props.orderId;
        navigate(url);
    }

    const clickFavorite = () => {
        if(!isFav && props.account) {
            addToLike(props.data.tokenId, props.account).then(res => {
                if(res != null) {
                    setFav(true);
                    setFavCount(favCount => favCount + 1);
                }
            });
        }
    }

    return (
        <>
            {!nonames.includes(itemName) && (<div className='border nft-item'>
                {console.log("Name is " , itemName)}
                <img src={imgUrl} alt='NFT here' className='w-100 h-75' />
                <div className='d-flex flex-row justify-content-between p-2'>
                    <div className='d-flex flex-column justify-content-start align-items-start'>
                        <p className='mt-1 ms-2 item-text-title'>{itemName}</p>
                        <p className='ms-3 item-text-buy' onClick={clickBuy}>Buy Now</p>
                    </div>
                    <div className='d-flex flex-column justify-content-start align-items-end me-2'>
                        <p className='mb-0 text-secondary item-text-type'>Price</p>
                        <div className='d-flex flex-row justify-content-start align-items-center'>
                            <img src={AvaxLogo} alt='crypto' className='img-crypto' />
                            <p className='item-text-price mb-0 ms-2'>{ethers.utils.formatEther(props.price)}</p>
                        </div>
                        <div className='d-flex flex-row justify-content-start align-items-center mt-3'>
                            <img src={isFav ? LikeFilled : LikeOutline} alt='like' className='img-like' onClick={clickFavorite} />
                            <p className='item-text-like mb-0 ms-2'>{favCount}</p>
                        </div>
                    </div>
                </div>
            </div>)}
            </>
    );
}

export default NFTItem;
