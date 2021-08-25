const Web3 = require('web3');
const dotenv = require('dotenv');

dotenv.config();

const BuildTransactionChecker = require('./checkers/transactionChecker')
const BuildTransactionChecker2 = require('./checkers/transactionChecker2')
const CreateClient = require('./client')

const { web3http, web3 } = CreateClient(Web3)
const { checkLastBlock, checkBlocks } = BuildTransactionChecker(web3)
const watchTransactions = BuildTransactionChecker2({ web3, web3http })

setInterval(() => {
    checkLastBlock()
}, 10000)

watchTransactions()