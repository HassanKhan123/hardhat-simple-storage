require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const { PRIVATE_KEY, RINKEBY_RPC_URL, ETHERSCAN_API_KEY } = require("./secret");
require("./tasks/block-number");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
