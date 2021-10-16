import { pinJSONToIPFS } from "./pinata.js";
import { contractABI, contractAddress } from "./CONSTANTS";
import { Typography } from "@material-ui/core";

require("dotenv").config();

const { REACT_APP_RINKEBY_ALCHEMY_URL } = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_RINKEBY_ALCHEMY_URL);

//check if an address is already connected to our dApp
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "--",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the button on top of page.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target='_blank' rel='noreferrer' href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

//request account from user metamask
export const connectWallet = async () => {
  //https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const obj = {
        status: "--",
        address: addressArray[0], //simple only first address instead of handling user changing account
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target='_blank' rel='noreferrer' href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() === "" || name.trim() === "" || description.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = {};
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  //init the contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transactionParameters

  //check if currentloggedin user is same as owner of contract if so then does not need to pay fee, else need to pay fee to mint

  let transactionParameters = {};

  if (window.ethereum.selectedAddress === "0x9a58d7376e21a561904d68fac239eaaf2915437a") {
    transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI(), //make call to NFT smart contract
    };
  } else {
    transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI(), //make call to NFT smart contract
      value: "0x2386F26FC10000", // 0.01 eth
    };
  }

  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status: (
        <>
          <Typography variant='body1' color='textPrimary'>
            ✅ Check out your transaction on Etherscan:
          </Typography>
          <Typography variant='body2'>
            <a target='_blank' rel='noreferrer' href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
              {txHash}
            </a>
          </Typography>
        </>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
