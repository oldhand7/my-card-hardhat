require('dotenv').config()

const { REACT_APP_RINKEBY_ALCHEMY_URL } = process.env;

const axios = require("axios");

export const getTokenMetadata = async (contractAddress) => {
  const url = REACT_APP_RINKEBY_ALCHEMY_URL;
  const JSONBody = {
    jsonrpc: "2.0",
    method: "alchemy_getTokenMetadata",
    params: [contractAddress],
    id: 1,
  };
  //making axios POST request to alchemy ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {},
    })
    .then(function (response) {
      return {
        success: true,
        tokenMetaData: response.data.result,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
