const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider"); // For connecting to an Ethereum network
const DigitalAssetMarketplaceAbi = require("./DigitalAssetMarketplace.json").abi; // Replace with the actual path to your contract's ABI

const MNEMONIC = "your-mnemonic-here"; // Replace with your Ethereum wallet mnemonic
const INFURA_API_KEY = "your-infura-api-key"; // Replace with your Infura API key or your Ethereum node URL
const CONTRACT_ADDRESS = "your-contract-address"; // Replace with your contract address

const web3 = new Web3(new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_API_KEY}`)); // Use the Ethereum mainnet or your desired network

async function listAssets() {
  try {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(DigitalAssetMarketplaceAbi, CONTRACT_ADDRESS);

    // List 5 assets
    await contract.methods.listAsset("Asset 1", "Description 1", web3.utils.toWei("1", "ether")).send({ from: accounts[0] });
    await contract.methods.listAsset("Asset 2", "Description 2", web3.utils.toWei("2", "ether")).send({ from: accounts[0] });
    await contract.methods.listAsset("Asset 3", "Description 3", web3.utils.toWei("0.5", "ether")).send({ from: accounts[0] });
    await contract.methods.listAsset("Asset 4", "Description 4", web3.utils.toWei("3", "ether")).send({ from: accounts[0] });
    await contract.methods.listAsset("Asset 5", "Description 5", web3.utils.toWei("0.75", "ether")).send({ from: accounts[0] });

    console.log("Assets listed successfully.");
  } catch (error) {
    console.error("Error listing assets:", error);
  }
}

listAssets();
