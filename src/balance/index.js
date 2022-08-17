const { contractABI } = require("./configs/variable");

const getBalance = async(web3,walletAddress,contractAddress) =>{
    console.log('walletAddress',walletAddress)
    // console.log('contractABI',contractABI)
    // web3.eth.defaultAccount = walletAddress;
    const contract = new web3.eth.Contract(contractABI,contractAddress);
    console.log('contract',contract.methods)
    const balance = await contract.methods.balanceOf(walletAddress).call()
    .then(docs => docs)
    .catch(error => error)
    // const {estimateGas} = balance;
    // const format = web3.utils.fromWei(balance)
    console.log('this is the balance',balance)
    // console.log('estimateGas',estimateGas)
    return balance;
}

module.exports = {
    getBalance
}