const injectedWeb3 = require("./injectedWeb3");
const CONTRACT_ABI = require("../abi/zentuSimpleStaking_ABI.json");

let web3;
let contract;
module.exports = createInstance = async (address) => {
  web3 = await injectedWeb3.getSocket();
  contract = new web3.eth.Contract(CONTRACT_ABI, address);

  return { web3, contract };
};
