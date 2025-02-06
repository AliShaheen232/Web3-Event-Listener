const createInstance = require("./helper/contractInstance");

let web3;
let contract;
const creationBlock = 19523275; // Replace this with the actual contract creation block

let latestBlock = 0;
const transferHex =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const depositHex = "";
const withdrawHex =
  "0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568";

  // add events hash and update subscribe's topic

const _createInstance = async (contract_address) => {
  let web3Obj = await createInstance(contract_address);
  web3 = web3Obj.web3;
  contract = web3Obj.contract;
  latestBlock = await web3.eth.getBlockNumber();
};

const subscriber = async () => {
  //   contract_address = "0x632C845EE81d0C6b1b3A53E81c80fa786DAaeBa8"; // LP
  contract_address = "0x870dC4e13168c4Be844933f383751A4Ef5562469"; // Simple

  await _createInstance(contract_address);
  await fetchEventsInBatches(contract, creationBlock);
};

async function fetchEventsInBatches(
  contract,
  creationBlock,
  batchSize = 10000
) {
  let fromBlock = latestBlock;
  let toBlock = latestBlock;

  let totalEvents = 0;
  let eventArray = [];

  while (fromBlock > creationBlock) {
    fromBlock = Math.max(creationBlock, toBlock - batchSize);

    await contract.getPastEvents(
      "Deposit", // Replace with  event name here
      {
        fromBlock: fromBlock,
        toBlock: toBlock,
      },
      (err, events) => {
        if (err) {
          console.error("Error fetching events:", err);
        } else if (events.length > 0) {
          eventArray.push(...events);
          totalEvents += events.length;
          console.log(
            `Fetched ${events.length} events from block ${fromBlock} to ${toBlock}`,
            events
          );
        }
      }
    );

    toBlock = fromBlock - 1;
  }

  console.log(`Total events fetched: ${totalEvents}`);
  return eventArray;
}

const _hexToAddress = (contract_address) => {
  return web3.eth.abi.decodeParameter("address", contract_address);
};

subscriber();
