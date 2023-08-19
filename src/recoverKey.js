const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
  // hash message
  const hashMsg = hashMessage(message);
  // recover the public key by passing in the hash message, signature, and recovery bit
  return secp.recoverPublicKey(hashMsg, signature, recoveryBit);
}

module.exports = recoverKey;
