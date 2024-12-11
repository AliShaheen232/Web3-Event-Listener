const Web3 = require("web3");
const ethers = require("ethers");
const config = require("config");

const injectedWeb3 = {
  getRPC: async () => {
    return new Web3(
      new Web3.providers.HttpProvider(config.get("web3_rpc_url"))
    );
  },
  getSocket: async () => {
    return await new Web3(
      new Web3.providers.WebsocketProvider(config.get("web3socket_url"))
    );
  },
  getEthersSocket: async () => {
    return new ethers.WebSocketProvider(config.get("web3socket_url"));
  },
};

module.exports = injectedWeb3;
