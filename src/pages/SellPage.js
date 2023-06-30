import React, { useEffect, useState } from 'react';
import './sell.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileItem from '../components/ProfileItem';
import { getTokenData, createOrder } from '../api/api';
import { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import marketplaceABI from '../abi/marketplace.abi.json';
import nftABI from '../abi/nft.abi.json';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';

const AVAX_ICON = '/img/avax.png'
const SellPage = props => {

    const [price, setPrice] = useState(0);
    const [data, setData] = useState({});
    const [tokenId, setTokenId] = useState(0);
    const { pathname } = useLocation();
    const [selling, setSelling] = useState(false);
    const navigate = useNavigate();

    const contractAddress = '0x6be1203c494601d1EBEb59e66c31BFFeC0231f97';
    const contractNftAddress = '0xdC16363e321fa962A85D5455c71572F35d7aB576';

    useEffect(() => {
        const path_parts = pathname.split('/');
        const tokenId = parseInt(path_parts[2]);
        setTokenId(tokenId);
        const token_array = [];
        token_array.push(tokenId);
        getTokenData(token_array).then(res => {
            if (res != null)
                setData(res[0]);
        });
    }, []);

    const clickCreateOrder = (e) => {
        e.preventDefault();
        const contract = new Contract(contractAddress, marketplaceABI, props.library).connect(props.library.getSigner(props.account));
        const contractNft = new Contract(contractNftAddress, nftABI, props.library).connect(props.library.getSigner(props.account));

        if (price == 0) {
            Swal.fire({
                title: 'Creating Order',
                text: 'Price is invalid',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        if (tokenId > 0 && props.library && price > 0) {
            setSelling(true);
            contractNft.approve(contractAddress, tokenId).then(txRes => {
                txRes.wait().then(() => {
                    contract.createOrderForSale(tokenId, '0x0000000000000000000000000000000000000000', parseEther('' + price)).then(res => {
                        res.wait().then(result => {
                            const orderId = result.events[3].args[1].toNumber();

                            createOrder(orderId, tokenId, '0x0000000000000000000000000000000000000000', parseEther(price).toString(), props.account).then(res => {
                                if (res != null) {
                                    Swal.fire({
                                        title: 'Order Report',
                                        text: 'The NFT is ready for sale',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    });
                                    setSelling(false);
                                    navigate('/marketplace');
                                }
                            })

                        }).catch(err => {
                            setSelling(false);
                            console.log(err)
                        });
                    }).catch(err => {
                        console.log(err)
                        setSelling(false);
                    });
                });
            });
        }
    }

    return (
        <React.Fragment>
            {!selling &&
                <div className='container sell-container'>
                    <div className='row'>
                        <div className='col-md-12 col-lg-6 mt-4 d-flex flex-column justify-content-center min-height-90vh'>
                            <h3>List item for sale</h3>
                            <form>
                                <div className="form-group mt-4">
                                    <span className='price-text mb-2'>Price</span>
                                    <div className='d-flex mb-4'>
                                        <div className='eth-select d-flex align-items-center'>
                                            <img src={AVAX_ICON} width={24} height={24} className="mx-2" alt='alt' />
                                            <span>AVAX</span>
                                            <div className='arrow-down ms-auto me-2' />
                                        </div>
                                        <div className='amount-input ms-2 p-0 w-100 d-flex align-items-center'>
                                            <input placeholder='Amount' value={price} type="number" onChange={(e) => setPrice(e.target.value)} required />
                                        </div>
                                    </div>
                                    <span className='price-text mb-2'>Fees</span>
                                    <div className='service-fee d-flex justify-content-between mb-4'>
                                        <span>Service Fee</span>
                                        <span>2.5%</span>
                                    </div>
                                    <button className='btn-listing mt-4 mx-auto text-center' onClick={clickCreateOrder}>
                                        Complete Listing
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-12 col-lg-6 flex-column min-height-90vh d-flex justify-content-center align-items-center'>
                            <span className='price-text my-4'>Preview</span>
                            <ProfileItem className='preview-item' type='preview' price={price} data={data} account={props.account} />
                        </div>
                    </div>
                </div>}
            {selling && <Loading />}
        </React.Fragment>
    );
}


export default SellPage;
