require("dotenv").config();
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType, hexToNumber } = require("@harmony-js/utils");
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  "https://api.s0.b.hmny.io",
  {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
  }
);

const contractJson = require("../../build/contracts/LinkToken.json");
let contract = hmy.contracts.createContract(contractJson.abi);

const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

const options3 = { data: contractJson.bytecode }; // contractConstructor needs contract bytecode to deploy

contract.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

contract.methods.contractConstructor(options3).estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.contractConstructor(options3).send(options2).then(response => {
    console.log('contract deployed at ' + response.transaction.receipt.contractAddress);
    process.exit(0);
  });
});