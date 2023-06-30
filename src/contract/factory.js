import { calculateGasMargin, getHigherGWEI } from '../utils';
import useContract from '../hooks/useContract';
import { ethers } from 'ethers';

export const getSigner = async () => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
};

export const useFactoryContract = () => {
  const { getContract } = useContract();

  const Contracts = {
    songAlbumSingle: "0x0cf7A427Ad8b5472cAdFCaC6898Df9E921Cbe119", //ERC721 NFT factory address : 1song = 1NFT
    songAlbum: "0xD88dA5Eb6474FeaFC29c47E52F102eA23947e3E3"  // ERC1155 NFT factory address : 1song=1000NFT
  };

  const FACTORY_ABI = [
    {
      inputs: [
        { internalType: 'string', name: '_name', type: 'string' },
        { internalType: 'string', name: '_symbol', type: 'string' },
      ],
      name: 'createNFTContract',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'platformFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: "getValue",
      outputs: [
        {
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      stateMutability: "payable",
      type: "function"
    },
  ];

  const getSongAlbumSingleFactoryContract = async () =>
    await getContract(Contracts.songAlbumSingle, FACTORY_ABI);

  const getSongAlbumFactoryContract = async () =>
    await getContract(Contracts.songAlbum, FACTORY_ABI);


  const createNFTContract = async (contract, name, symbol, value, from) => {
    const args = [name, symbol];

    const options = {
      value,
      from,
      gasPrice: await getHigherGWEI(),
    };
    const platformFee = await contract.platformFee()
    console.log({platformFee: platformFee.toString(), value:value, gasPrice:options.gasPrice})
    
    const gasEstimate = await contract.estimateGas.createNFTContract(
      ...args,
      options
    );
    console.log('Gas Estimat is ', gasEstimate);
    options.gasLimit = calculateGasMargin(gasEstimate);
    console.log('Gas Limit is ', options.gasLimit.toString());
    return await contract.createNFTContract(...args, options);
  };

  return {
    getSongAlbumSingleFactoryContract,
    getSongAlbumFactoryContract,
    createNFTContract,
  };
};
