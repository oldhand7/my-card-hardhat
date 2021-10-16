import React from "react";

import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import { contractAddress } from "../utils/CONSTANTS";
import { getTokenMetadata } from "../utils/getTokenMetadata";
import { NftCard } from "./NftCard";

export const Browser = () => {
  //getTokenMetadata- Contract Name and Symbol
  const [tokenMetaData, setTokenMetaData] = useState("");
  useEffect(() => {
    async function getAsync() {
      const tokenMetaData = await getTokenMetadata(contractAddress);
      setTokenMetaData(tokenMetaData);
    }
    getAsync();
  }, []);

  return (
    <>
      <Paper>
        <Box style={{ textAlign: "center" }} m={1}>
          {tokenMetaData.success ? (
            <>
              <Typography variant='h6'>
                NFT's minted to you from this contract: {tokenMetaData.tokenMetaData.name}
                {" ("}
                {tokenMetaData.tokenMetaData.symbol}
                {")"}
              </Typography>
              <a target='_blank' rel='noreferrer' href={`https://rinkeby.etherscan.io/address/${contractAddress}`}>
                {contractAddress}
              </a>
            </>
          ) : null}
        </Box>
        <NftCard></NftCard>
      </Paper>
    </>
  );
};
