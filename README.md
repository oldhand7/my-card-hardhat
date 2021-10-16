# 1 - Deploy Smart Contract
#### Deploy with Hardhat

1. Deploy the smart contract to rinkeby using hardhat
```
npx hardhat run scripts/deploy.js --network rinkeby
```
2. Check alchemy.com to see if it recevived the request.
3. Check if contract has been deployed on etherscan to interact with it using the Transaction Hash

---
TODO - Before deploying with hardhat we would want to compile and run tests first. Would need to:
1. Compile
2. Deploy to localhh
3. Run Tests
4. Once tests are good then deploy to rinkeby

#### Deploy with Remix
Aternatively can use Remix to deploy to to vm with quick ui elements for manual testing.
Then deploy to rinkeby there.

# 2 - Fronend Configurations

1. Copy the deployed smart contract address and paste it into CONSTANTS.js
2. (If Hardhat deployed) Copy the ABI from artifacts/contracts/Contractname.json
3. (If Remix) Copy the ABI from ContractName_metadata.json within artifacts folder and paste it into frontend contract-abi.json
   1. note abi is the array property of "abi": []


TODO - automate the hooking up of the frontend config to deployed contract

4. Now our frontend is hooked up to that smartcontract and can start to read and write to the smart contract.

using a new terminal:
````
yarn start
````

# Customer Minting Process
















# Using Hardhat to deploy an NFT smart contract
https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft

deploy the smart contract to rinkeby
```
npx hardhat run scripts/deploy.js --network rinkeby
```


# TODO

### Module 2 - Smart Contract / Backend

1. (DONE) Make sure [Code 10000 NFT Mint Dapp part1](https://www.youtube.com/watch?v=SD1DTrlJeKM&t=1942s) .sol code is tight and can be deployed on remix
2. (DONE) Make sure that using remix can deploy on rinkeby
3. Manually upload images to be on nft.storage or pinata.cloud and be able to have smartcontract NFT uri correctly point to them
4. Ensure images work and can see on testnets.opensea
   1. Need test images and metadata
5. Figure out how to programmatically using nft.storage API and node.js to post on nft.storage and get back the CID. Then pass the CID into the smartcontract. HOW? Can do this one by one passing the CID as the data when minting? This is lazy minting good right? [Using IPFS as baseURI](https://forum.openzeppelin.com/t/using-ipfs-as-baseuri/8121)
6. Premint everything? Then everything is visible on the Smart Contract.Or mint a subset and release in batches? How to ensure that images are uploaded in batches? Can get the CID before upload?
7. Commented per [Solidity NatSpec](https://docs.soliditylang.org/en/v0.8.3/natspec-format.html#)
8. 2 or more good design patterns 
9. Secured - protect against at least 2 attack vectors with [SWC#](https://swcregistry.io/)

## Module 3 - Frontend

this can be learned in the dApp section of bootcamp

(done) Setup cra and hardhat
learn ethers or web3js(with hardhat)
react query and querying the blockchain


1. A frontend where users can see the images collection.
2. Users can filter based on the layers and each variations.
3. User can click "buy button" on the NFT and metamask opens. We load the appropriate transaction data and our smart contract address into Metamask for user to submit the transaction.
4. The NFT is then assigned/transferred to user's eth account.
5. Our website updates - by putting a SOLD sticker on the NFT's has been sold

### Individually pin and mint each NFT

[Uploading Files to IPFS from a Web Application - Nader Dabit](https://dev.to/dabit3/uploading-files-to-ipfs-from-a-web-application-50a)


# Frontend
## 🗃 NFT Minter Tutorial Starter Files

This project contains the starter files for [Alchemy's NFT Minter tutorial](https://docs.alchemyapi.io/alchemy/tutorials/nft-minter), in which we teach you how to connect your smart contract to your React dApp project by building an NFT Minter using Metamask and Web3.


https://docs.alchemy.com/alchemy/tutorials/nft-minter/~/settings/env
https://composer.alchemyapi.io/

https://docs.alchemy.com/alchemy/tutorials/nft-minter/~/settings/env#step-5-nft-metadata-101

This is good stuff -

## TODO
0. Change the endpoint for [NFTE](https://nfte.app/docs) to rinkeby or just build my own
1. point to our own smart contract
   1. update this with out own smart contract `window.contract = await new web3.eth.Contract(contractABI, contractAddress)`
2. deploy this to netlify
3. Add in viewing and browsing of NFTs in the contract
4. update the pinata pipeline to handle the 10000 images!!!

"It would be great to have a little web page that you could paste a token ID into and view the token asset and metadata.

This should be pretty simple to wire up using nfte.app, a react component that does some nice presentation if you give it info about an NFT. Since our contract won't be deployed on mainnet, we'll need to provide our own endpoint for the viewer to connect to, so this implies a minty serve command (or similar) that will host an endpoint to supply the data.

We'll also need a simple react app that has a text field for the token ID and updates the NFTE component on changes."
https://nfte.app/

https://docs.alchemy.com/alchemy/tutorials/transfers-tutorial

https://docs.alchemy.com/alchemy/documentation/alchemy-web3/enhanced-web3-api - use this to display tokens

https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13




# 0 - Generate and Pin Images and Metadata
1. Using a separate program - this is non part of the final project and will be done later by me




-------------------------
# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

```
npx hardhat
```

## Installation
[Hardhat Getting Started](https://hardhat.org/getting-started/)

Hardhat is used through a local installation in your project. This way your environment will be reproducible, and you will avoid future version conflicts.

To install it, you need to create an npm project by going to an empty folder, running `npm init`, and following its instructions. Once your project is ready, you should run

INSTEAD of `npm init` this repo used:

```
npx create-react-app my-cra-hardhat
```
then

```
npm install --save-dev hardhat
```

To use your local installation of Hardhat, you need to use `npx` to run it (i.e. `npx hardhat`).

To create your Hardhat project run npx hardhat in your project folder.
```
npx hardhat
```

then **install dependencies - hardhat will tell you how**

## Start hardhat network
TODO: look up which network starting
`npx hardhat node`
## Compile
Compile .sol files in the contracts folder

```
npx hardhat compile
```

files are then generated in the artifacts\ folder.
note that `artifacts\hardhat\console.sol` was automatically compiled along with our `artifacts\contracts\Greeter.sol` file.

## Test

You can run your tests - files in the test folder
```
npx hardhat test
```

## Deploy

Next, to deploy the contract we will use a Hardhat script. Inside scripts/ you will find sample-script.js.

Run it with:
```
npx hardhat run scripts/sample-script.js
```

## Connecting a wallet or Dapp to Hardhat Network
Hardhat will always spin up an in-memory instance of Hardhat Network on startup by default. 

It's also possible to run Hardhat Network in a standalone fashion so that external clients can connect to it. This could be MetaMask, your Dapp front-end, or a script.

To run Hardhat Network in this way, run 
```
npx hardhat node
```

This will expose a JSON-RPC interface to Hardhat Network. To use it connect your wallet or application to http://localhost:8545.

If you want to connect Hardhat to this node to, for example, run a deployment script against it, you simply need to run it using --network localhost.

To try this, start a node with npx hardhat node and re-run the sample script using the network option:

```
npx hardhat run scripts/sample-script.js --network localhost
```
In summary the command above deploys the Greeter to localhost instead of the default in-memory Hardhat Network

## Configuration

https://hardhat.org/config/

configure to default run JSON-RPC localhh instead of the inmemory hardhat network. 

This means that when deploying don't have to specify --network localhost. can just use this

```
npx hardhat run scripts/sample-script.js
```

## Starting up an existing project
```js
npx hardhat node //starts up JSON-RPC Hardhat Network 
npx hardhat run scripts/sample-script.js // this script does a deployment of whatever .sol files is specified inside it
```