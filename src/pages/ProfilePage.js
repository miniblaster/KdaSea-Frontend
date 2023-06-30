import React, { useEffect } from 'react';
import './profile.css'
import { useState, useRef } from "react";
import ProfileItem from '../components/ProfileItem';
import { useNavigate } from 'react-router-dom';
import { login, getTokenData } from '../api/api';
import Loading from '../components/Loading';

const ProfilePage = props => {

    const navigate = useNavigate();
    //const [userInfo, setUserInfo] = useState({});
    const [collectedData, setCollectedData] = useState([]);
    const [createdData, setCreatedData] = useState([]);
    const [navIndex, setNavIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const navCollected = useRef();
    const navCreated = useRef();

    useEffect(() => {
        login(props.account).then(res => {
            if (res != null) {
                //setUserInfo(res);
                (async () => {
                    if (res.owned.length > 0) {
                        const collected = await getTokenData(res.owned);
                        setCollectedData(collected);
                        setLoading(false);
                    } else setLoading(false);
                    if (res.created.length > 0) {
                        const created = await getTokenData(res.created);
                        setCreatedData(created);
                    }
                })();
            }
        });
    }, []);

    useEffect(() => {
        if (navIndex == 0 && !loading) {
            navCollected.current.classList.add('active')
            navCreated.current.classList.remove('active')
        } else if (navIndex == 1 && !loading) {
            navCollected.current.classList.remove('active')
            navCreated.current.classList.add('active')
        }
        return true
    }, ([navIndex]));

    const clickCreate = () => {
        navigate('/create');
    }

    return (
        <React.Fragment>
            {loading && <Loading />}
            {!loading &&
                <section className="profile-container">
                    <nav className='d-flex'>
                        <div className='nav-btn nav-btn-one active' ref={navCollected} onClick={() => setNavIndex(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-diff me-2" viewBox="0 0 16 16">
                                <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                            <span>Collected</span>
                        </div>
                        <div className='nav-btn nav-btn-two' ref={navCreated} onClick={() => setNavIndex(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-heart me-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                            </svg>
                            <span>Created</span>
                        </div>
                        <button type="button" className="btn btn-secondary ms-auto me-4 btn-create" onClick={clickCreate}>
                            Create
                        </button>
                    </nav>
                    {navIndex == 0 ?
                        <div className='container mt-4'>
                            <div className='row'>
                                {
                                    collectedData.map((item, index) => {
                                        return (
                                            <div className='col-xs-12 col-sm-6 col-lg-4 my-2' key={index}>
                                                <ProfileItem type={'collected'} data={item} account={props.account} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div> :
                        <div className='container mt-4'>
                            <div className='row'>
                                {
                                    createdData.map((item, index) => {
                                        return (
                                            <div className='col-xs-12 col-sm-6 col-lg-4 my-2 item-container' key={index}>
                                                <ProfileItem type={'created'} data={item} account={props.account} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    }

                </section>}</React.Fragment>
    );
}


export default ProfilePage;
