const abi = require('ethereumjs-abi');
const { Transaction } = require('ethereumjs-tx');

module.exports = web3 => {
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "total",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                }
            ],
            "name": "metaTransfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                }
            ],
            "name": "metaTransferHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "replayNonce",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    return {
        async signPayment(privateKey, recipient, amount, nonce, contractAddress) {   
            var hash = "0x" + abi.soliditySHA3(
                ["address", "uint256", "uint256", "address"],
                [recipient, amount, nonce, contractAddress]
            ).toString("hex");
        
            try {
                const { signature } = web3.eth.accounts.sign(hash,privateKey);
                console.log("signature: ",signature, "nonce: ",nonce, "amount: ",amount,"recipient: ",recipient,"contractAddress: ",contractAddress);
                return signature;
            } catch (error) {
                console.log("error ooo ", error);
            }
        },

        async payRecipient(signature,recipient,amount,from,contractAddress,privateKey,nonce){
            let contract = new web3.eth.Contract(contractABI, contractAddress);
        
            web3.eth.defaultAccount = from;
            const private_key = Buffer.from(privateKey, 'hex');
            const meta_transfer = contract.methods.metaTransfer(signature,recipient,web3.utils.toWei(amount, 'ether'),nonce).send({
                from
            })
            .then(result =>{
                console.log('the result is ',result);
            })
            .catch(error =>{
                console.log('the error is ',error);
            })

            console.log("meta_transfer", meta_transfer);

            // Build the transaction
            const txObject = {
                nonce,
                to:       contractAddress,
                value:    web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
                gasLimit: web3.utils.toHex(2100000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
                data: meta_transfer  
            }
            // Sign the transaction
            const tx = new Transaction(txObject, { chain: 'kovan', hardfork: 'petersburg' });
            tx.sign(private_key);
        
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');
        
            // Broadcast the transaction
            const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
                if(err){
                    console.log("err again ",err);
                    return;
                }
                console.log("transaction id ",tx)
            });

            
            // let claim_payment = contract.methods.metaTransfer(signature,recipient, amount,nonce,).send({
            //     from
            // })
            // .then(result =>{
            //     console.log('the result is ',result);
            // })
            // .catch(error =>{
            //     console.log('the error is ',error);
            // });;

            // console.log("claim payment ", claim_payment);
           
       },

        async TransferERC20Token(toAddress, value, contractAddress, private_key, from) {
            return new Promise(function (resolve, reject) {
                try {
                    web3.eth.getBlock("latest", false, (error, result) => {
                        var _gasLimit = result.gasLimit;
                        let contract = new web3.eth.Contract(contractABI, contractAddress);

                        contract.methods.decimals().call().then(function (result) {
                            try {
                                var decimals = result;
                                let amount = parseFloat(value) * Math.pow(10, decimals);
                                web3.eth.getGasPrice(function (error, result) {
                                    var _gasPrice = result;
                                    try {
                                        const privateKey = Buffer.from(private_key, 'hex')

                                        var _hex_gasLimit = web3.utils.toHex((_gasLimit + 1000000).toString());
                                        var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                                        var _hex_value = web3.utils.toHex(amount.toString());
                                        var _hex_Gas = web3.utils.toHex('60000');

                                        web3.eth.getTransactionCount(from).then(
                                            nonce => {
                                                var _hex_nonce = web3.utils.toHex(nonce); 

                                                const rawTx =
                                                {
                                                    nonce: _hex_nonce,
                                                    from: contractAddress,
                                                    to: toAddress,
                                                    gasPrice: _hex_gasPrice,
                                                    gasLimit: _hex_gasLimit,
                                                    gas: _hex_Gas,
                                                    value: '0x0',
                                                    data: contract.methods.transfer(toAddress, _hex_value).encodeABI()
                                                };

                                                const tx = new Transaction(rawTx, { 'chain': 'rinkeby' });
                                                tx.sign(privateKey);

                                                var serializedTx = '0x' + tx.serialize().toString('hex');
                                                web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function (err, hash) {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve(hash);
                                                    }
                                                })
                                            });                                
                                    } catch (error) {
                                        reject(error);
                                    }
                                });
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                } catch (error) {
                    reject(error);
                }
            })
        }

    }
}

// Metadata of "metatransaction" was published successfully.
// contracts/meta-transaction.sol : 
// ipfs://QmU2hbZ2WVEor3jBP2heU28wnMkd9BKZvdi1aPp2zVuAPr
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol : 
// ipfs://Qmd5c7Vxtis9wzkDNhxwc6A2QT5H9xn9kfjhx7qx44vpro
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol : 
// ipfs://QmcqjUoFLLMyx7dbwSHUnDBH6aphkVHXWQvQRRev5EAWEh
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol : 
// ipfs://Qmbn5Mj7aUn8hJuQ8VrQjjEXRsXyJKykgnjR9p4C3nfLtL
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol : 
// ipfs://QmSim72e3ZVsfgZt8UceCvbiSuMRHR6WDsiamqNzZahGSY
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol : 
// ipfs://QmWcsmkVr24xmmjfnBQZoemFniXjj3vwT78Cz6uqZW1Hux
// metadata.json : 
// ipfs://QmXR7UPozzrkSht8G8scvZtGThpG35bhKmk9VGSXmdhgfq