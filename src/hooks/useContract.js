import { useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line no-undef
const RPCurl = "https://api.avax.network/ext/bc/C/rpc";
const RPCurlTest = "https://api.avax-test.network/ext/bc/C/rpc";
// const ChainID = 43113;
// const ChainIDTest = 43114;

export default () => {
  const { chainId } = useWeb3React();
  
  const getContract = useCallback(
    async (address, abi) => {
      if (chainId) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(address, abi, signer);
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          RPCurlTest,
          chainId
        );

        return new ethers.Contract(address, abi, provider);
      }
    },
    [chainId]
  );

  return { getContract };
};
