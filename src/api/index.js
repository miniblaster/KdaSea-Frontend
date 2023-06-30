import axios from 'axios';

// eslint-disable-next-line no-undef
// const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

export const useApi = () => {
  const explorerUrl = 'https://testnet.snowtrace.io/'
  const apiUrl = 'https://calm-everglades-46981.herokuapp.com';
  // const apiUrl = 'http://localhost:5001';
  const corsUrl = 'https://protected-beach-33448.herokuapp.com/'
  // const corsUrl = ''

  const storageUrl = 'https://storage.testnet.artion.io'
  // const tokenURL = 'https://fetch-tokens.vercel.app/api';
  // const tokenURL = 'https://api.artion.io/nftitems/fetchTokens';

  const getNonce = async (address, authToken) => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/account/nonce/${address}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getAuthToken = async address => {
    let result = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/auth/getToken`,
      data: JSON.stringify({ address: address }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.data.status == 'success') {
      let token = result.data.token;
      return token;
    }
    return null;
  };

  const getIsModerator = async address => {
    const { data } = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/mod/isModerator/${address}`,
    });
    if (data.status == 'success') {
      return data.data;
    }
    return false;
  };

  const getAccountDetails = async authToken => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/account/getaccountinfo`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("auth token is ", authToken);
    return res.data;
  };

  const getUserAccountDetails = async address => {
    const data = { address };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/account/getuseraccountinfo`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  };

  const getUserFigures = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/info/getFigures/${address}`,
    });

    return res.data;
  };

  const updateAccountDetails = async (
    alias,
    email,
    bio,
    avatar,
    authToken,
    signature,
    signatureAddress
  ) => {
    const formData = new FormData();
    formData.append('alias', alias);
    formData.append('email', email);
    if (bio) {
      formData.append('bio', bio);
    }
    if (avatar) {
      formData.append('imgData', avatar);
    }
    formData.append('signature', signature);
    formData.append('signatureAddress', signatureAddress);

    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/account/accountdetails`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const updateBanner = async (imageData, authToken) => {
    const formData = new FormData();
    formData.append('imgData', imageData);
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ipfs/uploadBannerImage2Server`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const get1155Info = async (contractAddress, tokenID) => {
    const { data } = await axios.get(
      `${corsUrl}${apiUrl}/info/get1155info/${contractAddress}/${tokenID}`
    );
    return data;
  };

  const getTokenHolders = async (contractAddress, tokenID) => {
    const { data } = await axios.get(
      `${corsUrl}${apiUrl}/info/getOwnership/${contractAddress}/${tokenID}`
    );
    return data;
  };

  const fetchCollections = async () => {
    const res = await axios.get(`${corsUrl}${apiUrl}/info/getcollections`);
    return res.data;
  };

  const fetchCollection = async contractAddress => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/collection/getCollectionInfo`,
      data: JSON.stringify({ contractAddress }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const fetchPendingCollections = async authToken => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/collection/getReviewApplications`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const approveCollection = async (contractAddress, authToken) => {
    const data = {
      contractAddress,
      status: 1,
    };
    await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/collection/reviewApplication`,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const rejectCollection = async (contractAddress, reason, authToken) => {
    const data = {
      contractAddress,
      status: 0,
      reason,
    };
    await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/collection/reviewApplication`,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchMintableCollections = async authToken => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/collection/getMintableCollections`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return res.data;
  };

  const fetchTokens = async (
    from,
    count,
    type = 'all',
    collections = [],
    category = null,
    sortBy = 'listedAt',
    filterBy = [],
    address = null,
    cancelToken
  ) => {
    
    const data = { from, count, type };
    if (collections.length > 0) {
      data.collectionAddresses = collections;
    }
    if (category !== null) {
      data.category = category;
    }
    if (address) {
      data.address = address;
    }
    if (filterBy.length) {
      data.filterby = filterBy;
    }
    data.sortby = sortBy;

    console.log('the type of fetchtoken endpoint argument is ', data.type)
    // let url = `${corsUrl}https://w8bm7xvxv6.execute-api.us-east-1.amazonaws.com/dev/listNfts`;
    
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/nftitems/fetchTokens`,
      // url : `${corsUrl}https://w8bm7xvxv6.execute-api.us-east-1.amazonaws.com/dev/listNfts`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      cancelToken,
    });
    console.log('TTTTTTTTTTTTTTTTT', res.data);
    return res.data;
  };

  // const fetchTokens = async (
  //   from,
  //   count,
  //   type = 'all',
  //   collections = [],
  //   category = null,
  //   sortBy = 'listedAt',
  //   filterBy = [],
  //   address = null,
  // ) => {
    
  //   const data = { from, count, type };
  //   if (collections.length > 0) {
  //     data.collectionAddresses = collections;
  //   }
  //   if (category !== null) {
  //     data.category = category;
  //   }
  //   if (address) {
  //     data.address = address;
  //   }
  //   if (filterBy.length) {
  //     data.filterby = filterBy;
  //   }
  //   data.sortby = sortBy;
  //   console.log('datadatadatadatadataadatad', data)
  //   // let url = `https://powerful-beach-55472.herokuapp.com/https://w8bm7xvxv6.execute-api.us-east-1.amazonaws.com/dev/listNfts`;
  //   let url = `https://powerful-beach-55472.herokuapp.com/https://api.opensea.io/tokens/?order_direction=desc`;
  //   let filters = {
  //     order_direction: 'desc',
  //     offset: from,
  //     limit: '30'
  //   }
  //   // let res = await axios.post(
  //   //   url,
  //   //   filters
  //   // );
  //   console.log(filters);
  //   let res = await axios.get(
  //     url
  //   );
  //   console.log('here is response data', res);
  //   return res.data;
  // };

  const getItemsLiked = async (items, authToken, cancelToken) => {
    const data = { items: JSON.stringify(items) };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/getPageLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      cancelToken,
    });
    return res.data;
  };

  const getBundleDetails = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/bundle/getBundleByID`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const increaseBundleViewCount = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/bundle/increaseViews`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const fetchItemDetails = async (contractAddress, tokenID) => {
    const data = { contractAddress, tokenID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/nftItems/getSingleItemDetails`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const increaseViewCount = async (contractAddress, tokenID) => {
    const data = { contractAddress, tokenID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/nftitems/increaseViews`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleOffers = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/offer/getBundleOffer`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleTradeHistory = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/tradehistory/getBundleTradeHistory`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getTransferHistory = async (address, tokenID, tokenType) => {
    const data = { address, tokenID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/nftitems/transfer${tokenType}History`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getAccountActivity = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/info/getAccountActivity/${address}`,
    });
    return res.data;
  };

  const getActivityFromOthers = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/info/getActivityFromOthers/${address}`,
    });
    return res.data;
  };

  const getMyOffers = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/info/getOffersFromAccount/${address}`,
    });
    return res.data;
  };

  const addMod = async (
    name,
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { name, address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/mod/add`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const removeMod = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/mod/remove`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const banCollection = async (
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/banCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const unbanCollection = async (
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/unbanCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const checkBan = async (address, authToken) => {
    const data = { address };
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/ban/banUser`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    let check = res.data;

    return check.status == 'success' ? true : false;
  };

  const banUser = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/banUser`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const unbanUser = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/removeBan`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const banItems = async (
    address,
    tokenIDs,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, tokenIDs, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/banItems`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const boostCollection = async (address, authToken) => {
    const data = { address };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/ban/boostCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const createBundle = async (name, paymentToken, price, items, authToken) => {
    const data = { name, paymentToken, price, items };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/bundle/createBundle`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const deleteBundle = async (bundleID, authToken) => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/bundle/removeBundle`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getFollowing = async (from, to) => {
    const data = { from, to };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/follow/isFollowing`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const followUser = async (follower, follow, authToken) => {
    const data = { follower, status: follow ? 1 : 0 };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/follow/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getFollowers = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/follow/getFollowers/${address}`,
    });
    return res.data;
  };

  const getFollowings = async address => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/follow/getFollowings/${address}`,
    });
    return res.data;
  };

  const getBundleLikes = async bundleID => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/bundle/getLikesCount/${bundleID}`,
    });
    return res.data;
  };

  const isLikingItem = async (contractAddress, tokenID, follower) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
      follower,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/isLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const isLikingBundle = async (bundleID, follower) => {
    const data = {
      type: 'bundle',
      bundleID,
      follower,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/isLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const likeItem = async (contractAddress, tokenID, authToken) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const likeBundle = async (bundleID, authToken) => {
    const data = {
      type: 'bundle',
      bundleID,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getItemLikeUsers = async (contractAddress, tokenID) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/getLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleLikeUsers = async bundleID => {
    const data = {
      type: 'bundle',
      bundleID,
    };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/getLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getMyLikes = async (step, address) => {
    const data = { step, address };
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/like/getMyLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getNotificationSettings = async authToken => {
    const res = await axios({
      method: 'get',
      url: `${corsUrl}${apiUrl}/account/getnotificationsettings`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const updateNotificationSettings = async (
    settings,
    authToken,
    signature,
    signatureAddress
  ) => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/account/notificationsettings`,
      data: JSON.stringify({
        settings: JSON.stringify(settings),
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const addUnlockableContent = async (
    contractAddress,
    tokenID,
    content,
    signature,
    signatureAddress,
    authToken
  ) => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/unlockable/addUnlockableContent`,
      data: JSON.stringify({
        contractAddress,
        tokenID,
        content,
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const retrieveUnlockableContent = async (
    contractAddress,
    tokenID,
    signature,
    signatureAddress,
    authToken
  ) => {
    const res = await axios({
      method: 'post',
      url: `${corsUrl}${apiUrl}/unlockable/retrieveUnlockableContent`,
      data: JSON.stringify({
        contractAddress,
        tokenID,
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  return {
    explorerUrl,
    apiUrl,
    storageUrl,
    getNonce,
    getAuthToken,
    getIsModerator,
    getAccountDetails,
    getUserAccountDetails,
    getUserFigures,
    updateAccountDetails,
    updateBanner,
    get1155Info,
    getTokenHolders,
    fetchCollections,
    fetchCollection,
    fetchPendingCollections,
    approveCollection,
    rejectCollection,
    fetchMintableCollections,
    fetchTokens,
    getItemsLiked,
    getBundleDetails,
    increaseBundleViewCount,
    fetchItemDetails,
    increaseViewCount,
    getBundleOffers,
    getBundleTradeHistory,
    getTransferHistory,
    getAccountActivity,
    getActivityFromOthers,
    getMyOffers,
    addMod,
    removeMod,
    banCollection,
    unbanCollection,
    banItems,
    banUser,
    unbanUser,
    checkBan,
    boostCollection,
    createBundle,
    deleteBundle,
    getFollowing,
    followUser,
    getFollowers,
    getFollowings,
    getBundleLikes,
    isLikingItem,
    isLikingBundle,
    likeItem,
    likeBundle,
    getItemLikeUsers,
    getBundleLikeUsers,
    getMyLikes,
    getNotificationSettings,
    updateNotificationSettings,
    addUnlockableContent,
    retrieveUnlockableContent,
  };
};
