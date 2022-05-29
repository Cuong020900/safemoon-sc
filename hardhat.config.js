require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require('@openzeppelin/hardhat-upgrades')
require("@nomiclabs/hardhat-etherscan")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */ 
const MAINNET_RPC_URL = "https://data-seed-prebsc-1-s2.binance.org:8545/"
const MNEMONIC = process.env.MNEMONIC
// optional
//const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
      accounts: ["407dc3cba4bbf5ee31934309a3042ee813e9b45242701c20ad93b6ff8310c370"],
      chainId: 97,
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      accounts: ["407dc3cba4bbf5ee31934309a3042ee813e9b45242701c20ad93b6ff8310c370"],
      chainId: 56,
    }
  },
  etherscan: {
    apiKey: "H922NUM3RTXX6FDRFFGZIQZX8J7Z441XRF"
  }
};

