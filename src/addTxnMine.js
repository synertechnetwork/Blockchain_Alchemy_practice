const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine() {
  // TODO: mine a block

  const blockSize = blocks.length;
  const newBlock = {
    id: blockSize,
    nonce: 0,
  };

  const oldMemPool = [...mempool];

  const transactions = oldMemPool.filter((tnx, index) => {
    if (index < MAX_TRANSACTIONS) {
      mempool.shift();
      return tnx;
    }
  });

  newBlock.transactions = transactions;

  while (BigInt(`0x${SHA256(JSON.stringify(newBlock))}`) > TARGET_DIFFICULTY) {
    newBlock.nonce += 1;
  }

  let blockHash = SHA256(JSON.stringify(newBlock));
  newBlock.hash = blockHash;

  blocks.push(newBlock);
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
