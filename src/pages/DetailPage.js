import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './detail.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getOrder, getTokenData } from '../api/api';
import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import marketplaceABI from '../abi/marketplace.abi.json';
import Swal from 'sweetalert2';
import { buyOrder } from '../api/api';
import Loading from '../components/Loading';

const data = [{ name: '2/19', AvgPrice: 400, pv: 400, amt: 400 }, { name: '2/20', AvgPrice: 4020, pv: 4300, amt: 4100 }, { name: '2/21', AvgPrice: 1020, pv: 3300, amt: 2000 }]

const DetailPage = props => {
    const contractAddress = "0x6be1203c494601d1EBEb59e66c31BFFeC0231f97";
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [tokenData, setTokenData] = useState(null);
    const [metaData, setMetaData] = useState(null);
    const [buying, setBuying] = useState(false);

    useEffect(() => {
        const path_parts = pathname.split('/');
        const orderId = parseInt(path_parts[2]);
        setOrderId(orderId);
        getOrder(orderId).then(res => {
            if (res != null) {
                setOrderData(res);
                const token_array = [];
                token_array.push(res.tokenId);
                getTokenData(token_array).then(result => {
                    if (result != null) {
                        setTokenData(result[0]);
                        fetch(result[0].tokenUri).then(response => {
                            response.json().then(meta => {
                                setMetaData(meta);
                            });
                        });
                    }
                });
            }
        })
    });

    const clickBuy = () => {
        if (orderData.seller == props.account) {
            Swal.fire({
                title: 'Purchase Report',
                text: 'This is your NFT and you cannot buy it',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        const contract = new Contract(contractAddress, marketplaceABI, props.library).connect(props.library.getSigner(props.account));
        setBuying(true);
        contract.buyForOrder(orderId, { value: BigNumber.from(orderData.price) }).then(res => {
            res.wait().then(() => {
                buyOrder(orderId, props.account).then(res => {
                    if (res != null) {
                        Swal.fire({
                            title: 'Purchase Report',
                            text: 'You purchased the NFT successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        setBuying(false);
                        navigate('/marketplace');
                    }
                })
            }).catch(err => {
                console.log(err)
                setBuying(false);
            });
        }).catch(err => {
            console.log(err)
            setBuying(false);
        });

    }

    return (
        <React.Fragment>
            {!buying &&
                <div className='container detail-container pt-3 pb-2'>
                    <div className='row gx-5'>
                        <div className='col-md-12 col-lg-6 d-flex align  flex-column'>
                            <img alt='metadata-img' src={metaData == null ? '' : metaData.image} style={{ width: '100%', height: '510px' }}></img>
                            <div className="accordion mt-4" id="accordion-description">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                            <span className='ms-2 font-weight-700'>Description</span>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordion-description">
                                        <div className="accordion-body">
                                            <span>Created by</span>
                                            <a href='' className='text-decoration-none ms-2'>NFT Marketplace
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill ms-2 mb-2" viewBox="0 0 16 16">
                                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-md-12 col-lg-6'>
                            <p className='mt-4' style={{ fontSize: '30px' }}>{metaData == null ? '' : metaData.name + ' #' + tokenData.tokenId}</p>
                            <div>
                                <span>Owned by </span>
                                <a href='/' className='text-decoration-none'>{tokenData == null ? '' : tokenData.owner.substr(0, 5) + '...' + tokenData.owner.substr(38, 4)}</a>
                                <span role='button' className='btn-favorite '>
                                    <svg className="ms-4 bi bi-heart-fill" role="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                    <span className='ms-2'>{(tokenData == null ? '0' : tokenData.likes.length) + ' favorites'}</span>
                                </span>
                            </div>
                            <div className='current-price-div mt-4'>
                                <p>Current Price</p>
                                <div className='d-flex justify-content-between align-items-end'>
                                    <div className='d-flex align-items-end'>
                                        <img src='https://i.ibb.co/MPfK2mG/avax.png' alt='AVAX' style={{ width: '40px', height: '40px' }} />
                                        <span className='fw-bolder display-4 mt-2 ms-2' style={{ lineHeight: '50px' }}>{orderData == null ? '0' : ethers.utils.formatEther(orderData.price)}</span>
                                        <span></span>
                                    </div>
                                    <div className='btn-buy-now font-weight-bold' onClick={clickBuy}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet-fill me-2" viewBox="0 0 16 16">
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                                            <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                                        </svg>
                                        <span>Buy Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion mt-4" id="accordion-listing">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                            </svg>
                                            <span className='ms-2 font-weight-700'>Listings</span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse hide" aria-labelledby="headingOne" data-bs-parent="#accordion-listing">
                                        <div className="accordion-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <td scope="col">Price</td>
                                                        <td scope="col">USD Price</td>
                                                        <td scope="col">From</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <svg className='me-2' width="20" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                                                                    fill="#E84142"
                                                                />
                                                                <path
                                                                    d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                            0.01 AVAX</td>
                                                        <td>$0.32</td>
                                                        <td>0x7899</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion mt-4" id="accordion-offer">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                            </svg>
                                            <span className='ms-2 font-weight-700'>Offers</span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse hide" aria-labelledby="headingOne" data-bs-parent="#accordion-offer">
                                        <div className="accordion-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <td scope="col">Price</td>
                                                        <td scope="col">USD Price</td>
                                                        <td scope="col">Floor difference</td>
                                                        <td scope="col">From</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <svg className='me-2' width="20" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                                                                    fill="#E84142"
                                                                />
                                                                <path
                                                                    d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                            0.01 AVAX</td>
                                                        <td>$0.32</td>
                                                        <td>24% below</td>
                                                        <td>
                                                            <a href='/' className='text-decoration-none'>0xa823</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <svg className='me-2' width="20" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                                                                    fill="#E84142"
                                                                />
                                                                <path
                                                                    d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                            0.01 AVAX</td>
                                                        <td>$0.32</td>
                                                        <td>24% below</td>
                                                        <td>
                                                            <a href='/' className='text-decoration-none'>0xa823</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion mt-4" id="accordion-price-history">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                                                <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
                                            </svg>
                                            <span className='ms-2 font-weight-700'>Price History</span>
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse hide" aria-labelledby="headingFive" data-bs-parent="#accordion-price-history">
                                        <div className="accordion-body">
                                            <LineChart width={500} height={130} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                <Line type="monotone" dataKey="AvgPrice" stroke="#8884d8" />
                                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                            </LineChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion mt-4" id="accordion-details">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-front" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z" />
                                            </svg>
                                            <span className='ms-2 font-weight-700'>Details</span>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordion-details">
                                        <div className="accordion-body">
                                            <div className='f-flex justify-content-between'><span>Contract Address</span><a href='' className='text-decoration-none float-right'>0xdC16363e321fa962A85D5455c71572F35d7aB576</a></div>
                                            <div className='f-flex justify-content-between'><span>Token ID</span><a href='' className='text-decoration-none float-right'>{tokenData == null ? '0' : tokenData.tokenId}</a></div>
                                            <div className='f-flex justify-content-between'><span>Blockchain</span><span className='float-right'>Avalanche</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>}
            {buying && <Loading />}
        </React.Fragment>
    );
}

export const Logo = () => (
    <div style={{ display: "flex" }}>
        <svg width="60" height="38" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                fill="#E84142"
            />
            <path
                d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
                fill="white"
            />
        </svg>
    </div>

);


export default DetailPage;
