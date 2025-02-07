const createInstance = require("./helper/contractInstance");

let web3;
let contract;

const transferHex =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const depositHex = "";
const withdrawHex =
  "0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568"; // add events hash and update subscribe's topic

const _createInstance = async (contract_address) => {
  let web3Obj = await createInstance(contract_address);
  web3 = web3Obj.web3;
  contract = web3Obj.contract;
};

/**
 * Subscribes to blockchain logs for the specified contract address and topic.
 *
 * @async
 * @function subscriber
 * @returns {Promise<void>}
 */
const subscriber = async () => {
  contract_address = "0x632C845EE81d0C6b1b3A53E81c80fa786DAaeBa8"; // LP
  // contract_address = "0x870dC4e13168c4Be844933f383751A4Ef5562469"; // Simple

  await _createInstance(contract_address);

  console.log("subsciber started listening for logs");

  await web3.eth.subscribe(
    "logs",
    {
      address: contract_address,
      topics: [transferHex],
    },
    async function (error, events) {
      console.log("current events:", events);
      // await _erc20SingleBalanceOf(_hexToAddress(events.topics[1]));
      // await _erc20SingleBalanceOf(_hexToAddress(events.topics[2]));
    }
  );
};

const _hexToAddress = (contract_address) => {
  return web3.eth.abi.decodeParameter("address", contract_address);
};

subscriber();
