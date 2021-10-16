import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

import { connectWallet, getCurrentWalletConnected, mintNFT } from "../utils/interact";

const useStyles = makeStyles((theme) => ({
  outerbox: {
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70ch",
    },
  },
  field: {
    //backgroundColor: "",
  },
  bottombox: {
    width: "100%",
  },
}));

const Minter = (props) => {
  const classes = useStyles();

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  //wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("--");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the button on top of page.");
        }
      });
    } else {
      setStatus(
        <p>
          🦊
          <a target='_blank' rel='noreferrer' href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }

  //get the account if it's already previously connected
  useEffect(() => {
    async function getAsync() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getAsync();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <>
      <Box className={classes.outerbox} m={1}>
        <Grid container direction='column' justifyContent='flex-start' alignItems='center' spacing={1}>
          <Grid item xs>
            <Paper>
              <Typography variant='h3'>NFT Minter and Browser</Typography>
              <Typography variant='subtitle2' align='center'>
                {" "}
                Smart Contract lives on Rinkeby
              </Typography>
              <Typography variant='subtitle2' align='center'>
                {" "}
                Fee to mint is 0.01 ETH
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper className={classes.paper}>
              <Button variant='outlined' id='walletButton' color='primary' onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                  "Connected to MetaMask Account: " + String(walletAddress)
                ) : (
                  <span>Connect To Your Meta Mask Account on Rinkeby</span>
                )}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs>
            <Paper className={classes.paper}>
              <form className={classes.form} autoComplete='on'>
                <Tooltip
                  title={
                    <>
                      To make sure your image has a permanent/decentralized tie to your NFT, the link you put here
                      should point to an image pinned on IPFS.
                      <p>This link will be put into the image attribute of the metadata file.</p>
                      <p>The metadata file will be pinned onto IPFS.</p>
                      <p>The NFT will point to this pinned metadata file.</p>
                    </>
                  }
                >
                  <Box>
                    <TextField
                      fullWidth
                      id='asset-link'
                      label='Link to Asset / Image'
                      variant='outlined'
                      type='text'
                      placeholder='e.g. https://gateway.pinata.cloud/ipfs/<hash>'
                      onChange={(event) => setURL(event.target.value)}
                    />
                  </Box>
                </Tooltip>

                <Box>
                  <TextField
                    fullWidth
                    id='token-name'
                    label='Name of NFT'
                    variant='outlined'
                    type='text'
                    placeholder='e.g. My best NFT!'
                    onChange={(event) => setName(event.target.value)}
                  />{" "}
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    id='token-description'
                    label='Description of NFT'
                    variant='outlined'
                    type='text'
                    placeholder='e.g. More 🟩shapes🟣 than BAYC 😊'
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Box>

                <Tooltip title='Metamask will popup and ask you to submnit the transaction to the Smart Contract.'>
                  <span>
                    <Button
                      disabled={!(walletAddress.length > 0)}
                      variant='contained'
                      color='primary'
                      id='mintButton'
                      onClick={onMintPressed}
                    >
                      Mint NFT
                    </Button>
                  </span>
                </Tooltip>

                <Box className={classes.bottombox}>{status}</Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Minter;
