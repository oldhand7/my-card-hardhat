import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { contractAddress, contractABI } from "../utils/CONSTANTS";
import { useTokens } from "../utils/useTokens";
import { useTokenJson } from "../utils/useTokenJson";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles({
  root: {
    maxWidth: 420,
    margin: "5px",
  },
  media: {
    height: 140,
  },
});



export const NftCard = () => {
  const classes = useStyles();
  const { data: tokensData } = useTokens(contractAddress, contractABI);
  
  const { data: tokenJsonData } = useTokenJson("https://gateway.pinata.cloud/ipfs/QmZutDuXLxV3FmJgaAkyEa1eBpgLLZvYeQZ6GERkK9ZXw6");

  console.log("tokenJsonData", tokenJsonData)

  return (
    <>
      <Paper>
        <Box>
          <Grid container direction='row' justifyContent='center' alignItems='center' spacing={3}>
            {tokensData &&
              tokensData.map((token, index) => {
                return (
                  <div key={token.tokenId.toString()}>
                    <Card className={classes.root}>
                      <CardMedia
                        className={classes.media}
                        image='/static/images/cards/contemplative-reptile.jpg'
                        title='Contemplative Reptile'
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h6' component='h2'>
                          Name of NFT
                        </Typography>
                        <Typography gutterBottom variant='subtitle2' component='h2'>
                          TokenId: {token.tokenId}
                        </Typography>

                        <Typography variant='body2' color='textSecondary' component='p'>
                          Description of NFT
                        </Typography>

                        <Typography variant="body2"> Owner:{token.ownerOf} </Typography>
                      </CardContent>

                      <CardActions>
                        <Link href={token.tokenURI} target='_blank' rel='noreferrer'>
                          Link to Token Metadata
                        </Link>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
