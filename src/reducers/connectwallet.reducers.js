import { WalletConnectConstants } from '../actionType/walletconnect.actionTypes';

export function ConnectWallet(
  state = { authToken: null, isModerator: false },
  action
) {
  switch (action.type) {
    case WalletConnectConstants.WALLETCONNECTED: {
      return {
        ...state,
        authToken: action.token,
        isModerator: action.isModerator,
      };
    }
    case WalletConnectConstants.WALLETDISCONNECTED: {
      return {
        ...state,
        authToken: null,
        isModerator: false,
      };
    }
    default: {
      return state;
    }
  }
}
