async function main() {
  // Grab the contract factory
  const Contract = await ethers.getContractFactory("PhunMinter");

  // Start deployment, returning a promise that resolves to a contract object
  const myContract = await Contract.deploy(); // Instance of the contract

  console.log("FULL deployTransaction:", myContract.deployTransaction);
  console.log("-------------------------------------------------------------------");
  console.log("Transaction Hash      :", myContract.deployTransaction.hash);
  console.log("Deployed From         :", myContract.deployTransaction.from);
  console.log("Creates Contract      :", myContract.deployTransaction.creates);
  console.log("Contract.address      :", myContract.address);
  console.log("-------------------------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
