import {ethers} from 'ethers'
import BigNumber from 'bignumber.js'
const checkBalance = async address => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  let balance = await provider.getBalance(address)
  balance = ethers.utils.formatEther(balance)
  return balance
}
const toWei = (eth) => {
  const bn = new BigNumber(eth.toString())
  return bn.shiftedBy(18).toString()
}
const WalletUtils = {
  checkBalance,
  toWei,
}

export default WalletUtils
