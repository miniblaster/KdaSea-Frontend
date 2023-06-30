import Axios from 'axios';

Axios.defaults.baseURL = 'https://wow-marketplace.herokuapp.com/api/';

export async function getUserData(addr) {
    const result = await Axios.get('/users/current', {
        params: {
            address: addr
        }
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function login(addr) {
    const result = await Axios.post('/users/login', {
        address: addr
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getTokenData(tokenIds) {
    if(tokenIds.length > 1) {
        const result = await Axios.post('/nfts/tokens', {
            tokenIds: tokenIds
        }).then(
            async function(response) {
                return response.data;
            }
        ).catch(err => {
            console.log(err);
            return null;
        });
    
        return result;
    }
    if(tokenIds.length < 2) {
        const result = await Axios.post('/nfts/token', {
            tokenId: tokenIds[0]
        }).then(
            async function(response) {
                const resData = [];
                resData.push(response.data);
                return resData;
            }
        ).catch(err => {
            console.log(err);
            return null;
        });
    
        return result;
    }
}

export async function createNft(tokenId, tokenUri, account) {
    const result = await Axios.post('/nfts/create', {
        tokenId: tokenId,
        tokenUri: tokenUri,
        operator: account
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function createOrder(orderId, tokenId, quoteToken, price, seller) {
    const result = await Axios.post('/orders/create', {
        id: orderId,
        tokenId: tokenId,
        quoteToken: quoteToken,
        price: price,
        seller: seller
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getAllOrders() {
    const result = await Axios.get('/orders/allOpenOrders').then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getOrder(orderId) {
    const result = await Axios.post('/orders/order', {
        id: orderId
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function addToLike(tokenId, operator) {
    const result = await Axios.post('/nfts/like', {
        tokenId: tokenId,
        operator: operator
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function buyOrder(orderId, buyer) {
    const result = await Axios.post('/orders/buy', {
        id: orderId,
        buyer: buyer
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}
