import { WalletConnectConstants } from '../actionType/walletconnect.actionTypes';

const WalletConnectActions = {
  connectWallet,
  disconnectWallet,
};

function connectWallet(authToken, isModerator) {
  return dispatch => {
    dispatch(_connectWallet(authToken, isModerator));
  };
}

const _connectWallet = (authToken, isModerator) => {
  return {
    type: WalletConnectConstants.WALLETCONNECTED,
    token: authToken,
    isModerator,
  };
};

function disconnectWallet() {
  return dispatch => {
    dispatch(_disconnectWallet());
  };
}

const _disconnectWallet = () => {
  return {
    type: WalletConnectConstants.WALLETDISCONNECTED,
  };
};

export default WalletConnectActions;
