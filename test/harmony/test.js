const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType, hexToNumber } = require("@harmony-js/utils");
const hmy = new Harmony("https://api.s0.b.hmny.io", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const contractJson = require("../../build/contracts/LinkToken.json");
const contractAddr = "0xe22fa8a29abb58dfef52f520712ec828624e38f2";

const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);
const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

const addr = "0xc162199cDaeAa5a82f00651dd4536F5d2d4277C5";

contract.methods.balanceOf(addr).estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.balanceOf(addr).call(options2).then(balance => {
    console.log('balanceOf ' + addr + ' is ' + balance.toString());
    process.exit(0);
  });
});