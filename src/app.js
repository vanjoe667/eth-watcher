const Web3 = require('web3');
const moment = require('moment-timezone');
const axios = require('axios');
const dotenv = require('dotenv');
const TronWeb = require('tronweb')

const { getAddressBalances } =  require('eth-balance-checker/lib/web3');
const { contractABI } = require('./balance/configs/variable');

dotenv.config();
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const getBep20Balance = async(contractAddresses,walletAddress)=>{
  const bnbBalance = await web3.eth.getBalance(walletAddress).then(bal => bal);
  console.log("bnbBalance ==> ",Number(bnbBalance * (10**-18)));

  const balances = contractAddresses.map(async contractAddress =>{
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const balance = await contract.methods.balanceOf(walletAddress).call(); 
      console.log(contractAddress,' ==> ',Number(balance * (10**-18)));
      return {
          contractAddress:{
              walletAddress,
              contractAddress,
              balance : Number(balance * (10**-18))
          }
      };
  })

  const tokenBalances = await Promise.all(balances).then(docs =>{return docs});
  return {
      bnbBalance: Number(bnbBalance * (10**-18)),
      tokenBalances
  };
}

const getTrcBalance = async(address)=>{
  // const balance = await axios({
  //     method: 'GET',
  //     url: `https://apilist.tronscan.org/api/account/tokens?address=${address}&start=0&limit=20&hidden=0&show=0&sortType=0&sortBy=0&token=`,
  // })
  // .then(response => response.data.data)
  // .catch(error => error.response.data);

  // // const trx = balance.find(token => token.tokenName === 'trx')
  // // const usdt_trc = balance.find(token => token.tokenId === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t')
  // // return {
  // //     trx,
  // //     usdt_trc
  // // };
  // return balance;

  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": '40ac2db3-eefa-41b7-8664-7ba661a88771' },
    privateKey: '3c384d46bbc6d0e2496b35ba5d8cfec45fab58c2c8c03619220e7c9ace664e46'
  })
  const balance = await tronWeb.trx.getBalance(address).then(result => result)
  const b = await tronWeb.trx.getAccount(address).then(result => result)
  console.log("the balanceppp",balance * (10**-6))
  console.log("the bbb",b)

  return balance;
}

const tokenAddresses = ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c','0x55d398326f99059ff775485246999027b3197955','0x2170ed0880ac9a755fd29b2688956bd959f933f8']
const walletAddresses = [
  '0x9e56929b75f024b8092f7e46b470df8a4af40be1',
  '0x6e17026be0428888c4bf2cbbddff0d91061f40ff',
  '0x996053f4279112d67c9b53358950503c800e8e90',
  '0xd22c236b2de5440a0c40041f1436539a715181a1',
  '0x6d611733966d81340bc0fa3a0ac4936d158727a9',
  '0x31192b9067b1cbb8a413cf8d714fafc306876a81',
  '0xb881e1bc1fa6acd97b666e93e61ba2896d5fa0a4',
  '0x533c600610535fef647c203b9ddef39a99cbf13b',
  '0x85d3b9e6da88458e937a17a568baed64194f03a8',
  '0xb4aac19ef1e9bed62afbc25ed20928f1195597e3',
  '0x450fa169f6f065a4aa643c0f8c1c58dfb8d718e4'
]

const rootCall = async()=>{
  const balance = await getTrcBalance('TFf9KXJSWFVbCKAenoReEjSHCeiGoAoFzG');
  
  // const trx = balance.find(token => token.tokenName === 'trx')
  // const usdt_trc = balance.find(token => token.tokenId === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t') || {quantity: 0}

  // console.log('+++++==============++++++');
  // console.log('TB7rkhgJeMLqX7nRiVKLDTEXYbwvMiu2HH');
  // console.log('trx',trx);
  // console.log('usdt_trc',balance);


  // const b = walletAddresses.map(async walletAddress =>{
  //   const balances = await getBep20Balance(tokenAddresses,'0x9e56929b75f024b8092f7e46b470df8a4af40be1');
    
  //   // const fetch = balances.tokenBalances.find(token => token.contractAddress.walletAddress === '0x9e56929b75f024b8092f7e46b470df8a4af40be1' && token.contractAddress.contractAddress === '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c')
  // });
  console.log({balance});
}

// rootCall();

// const address = '0x55d398326f99059fF775485246999027B3197955';
// const tokens = ['0x0000000000000000000000000000000000000000',
// '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
// '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
// '0x2170ed0880ac9a755fd29b2688956bd959f933f8'];
// getAddressBalances(web3, address, tokens).then(balances => {
//   console.log(balances); 
// });


const BuildTransactionChecker = require('./checkers/transactionChecker')
const BuildTransactionChecker2 = require('./checkers/transactionChecker2')
// const Signer = require('./signers/signTransaction')
const CreateClient = require('./client')
const { web3http, web3 } = CreateClient(Web3)
// const {getBalance} = require('./balance/index')
// // const { checkLastBlock, checkBlocks } = BuildTransactionChecker(web3)
const {watchTransactions, bscWatcher} = BuildTransactionChecker2({ web3, web3http })
// // const { signPayment, payRecipient, TransferERC20Token } = Signer(web3);

// watchTransactions(); 
bscWatcher();

// getBalance(web3http,'0x2bbb28331f178e262b5d5e11f546d398bfbeadbf','0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe')
// .then(function (result) {
//   console.log(result);
// });

// setInterval(async () => {
//     // checkLastBlock()
//     await getBalance(web3,'0x9e56929b75f024b8092f7e46b470df8a4af40be1','0x55d398326f99059ff775485246999027b3197955')
//     .then(function (result) {
//       console.log(result);
//     });
// }, 10000)


// const payload = {
//     from: '0x1da57634046069af1405c8e1f6446e88027aa7ca',
//     privateKey: '9f9bbd3ea5add7e3688e61ab43465a6997231757c9158c35b699ebea3612b290',
//     recipientAddress: '0xde77de1ab2b1d65a9ea326258c1886873e4d0013',
//     contractAddress: '0xe263d50AE7891d342c4EDe47C8df099C13220559',
//     amount: '0.000113'
// }



// let fromAddr = "0x1da57634046069af1405c8e1f6446e88027aa7ca"
// let toAddr = "0xde77de1ab2b1d65a9ea326258c1886873e4d0013"
// let tokenValue = "1000000000000000000000"

// let calldata = ""

// // get the function signature by hashing it and retrieving the first 4 bytes
// let fnSignature = web3.utils.keccak256("transferFrom(address,address,uint256)").substr(0,10)

// // encode the function parameters and add them to the call data
// let fnParams = web3.eth.abi.encodeParameters(
//   ["address","address","uint256"],
//   [fromAddr,toAddr,tokenValue]
// )

// calldata = fnSignature + fnParams.substr(2)


// let rawData = web3.eth.abi.encodeParameters(
//     ['address','bytes'],
//     [DaiTokenAddress,calldata]
//   );
//   // hash the data.
//   let hash = web3.utils.soliditySha3(rawData);
//   // sign the hash.
//   let signature = web3.eth.sign(hash, signer);




// //110000000000000wei === 0.00011
// const runPayment = async () =>{
//     web3.eth.defaultAccount = payload.from;
//     web3.eth.getTransactionCount(payload.from, async(err, txCount) => {
//         let nonce = web3.utils.toHex(txCount);
//         if(err){
//             console.log("err signing ",err);
//             return;
//         }
//         let signature = await signPayment(
//             payload.privateKey,
//             payload.recipientAddress,
//             payload.amount,
//             nonce,
//             payload.contractAddress
//         );
//         console.log("na the sig be this man >>>>");
//         console.log(signature);

//         // payRecipient(
//         //     signature,
//         //     payload.recipientAddress,
//         //     payload.amount,
//         //     payload.from,
//         //     payload.contractAddress,
//         //     payload.privateKey,
//         //     nonce
//         // );
//     });

//     // let tx = await TransferERC20Token(
//     //     payload.recipientAddress, 
//     //     payload.amount, 
//     //     payload.contractAddress, 
//     //     payload.privateKey, 
//     //     payload.from
//     // )
//     // console.log("the end result of the overall tx ",tx);
// }
// runPayment();



