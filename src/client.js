'use strict';

module.exports = Web3 => ({
    web3http: new Web3(new Web3.providers.HttpProvider(`https://Scalex BSC:tEAMsCALEX2022@apis.ankr.com/c4f9a7177b984f428388bc0fc9f877b9/8805809574efe6f354f41afd2c2109a5/binance/full/main`)),
    web3: new Web3(new Web3.providers.WebsocketProvider(`wss://Scalex BSC:tEAMsCALEX2022@apis.ankr.com/wss/c4f9a7177b984f428388bc0fc9f877b9/8805809574efe6f354f41afd2c2109a5/binance/full/main`))
})

// web3http: new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`)),
// web3: new Web3(new Web3.providers.WebsocketProvider(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`))