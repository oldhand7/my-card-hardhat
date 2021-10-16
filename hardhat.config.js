//require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { MY_PRIVATE_KEY, REACT_APP_ROPSTEN_ALCHEMY_URL, REACT_APP_RINKEBY_ALCHEMY_URL } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

//this task list acount connected accounts related to privatekey
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    localhh: {
      url: "http://127.0.0.1:8545/",
    },
    rinkeby: {
      url: REACT_APP_RINKEBY_ALCHEMY_URL,
      accounts: [`0x${MY_PRIVATE_KEY}`],
    },
    ropsten: {
      url: REACT_APP_ROPSTEN_ALCHEMY_URL,
      accounts: [`0x${MY_PRIVATE_KEY}`],
    },
  },
};
