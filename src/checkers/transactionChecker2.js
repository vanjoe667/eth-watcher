module.exports = ({ web3, web3http }) => {
    const account = [
        '0x6e17026be0428888c4bf2cbbddff0d91061f40ff',
        '0x3f349bbafec1551819b8be1efea2fc46ca749aa1',
        '0x6d5a684ff9aa0e240c3d3d5a998429658c613753',
        '0x80aae114cd8482d6a86d279c38e56a8e64799500',
        '0x3efae40e66e98967a39fc26da62a7f8a973e0acf',
        '0xe592427a0aece92de3edee1f18e0157c05861564',
        '0x140713bbd82113e104c3a45661134f9764807922',
        '0xd9145CCE52D386f254917e481eB44e9943F39138'
    ];

    const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
        if (err) console.error(err);
    });

    return{
        watchTransactions() {
            console.log('[+] Watching transactions...');
            subscription.on('data', async(txHash) => {
                try {
                    let tx = await web3http.eth.getTransaction(txHash);
                    if (tx) {
                        if (tx.to) {
                            if (account.includes(tx.to.toLowerCase())) {
                                console.log(`[+++] Transaction found ${txHash}`, new Date());
                                console.log({ hash: tx.hash, address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                            }
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            });
        },
    
        bscWatcher(){
            const WebSocket = require('ws');
        
            const url = 'wss://Scalex BSC:tEAMsCALEX2022@apis.ankr.com/wss/c4f9a7177b984f428388bc0fc9f877b9/8805809574efe6f354f41afd2c2109a5/binance/full/main'  // url string
            const request = '{"id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}';  
            const ws = new WebSocket(url);
        
            ws.on('open', function open() {
                ws.send(request);
            });
            ws.on('message', (data) =>{
                const res = JSON.parse(data)
                if (res.params != null && res.params["result"] != null) {
                    const txHashes = res.params["result"];
                    // console.log({txHash});
                    try {
                        txHashes.map(async txHash =>{
                            // console.log('hash to check',txHash);

                            let tx = await web3http.eth.getTransaction(txHash);
                            // console.log('tx got',tx);

                            if (tx) {
                                if (tx.to) {
                                    if (account.includes(tx.to.toLowerCase())) {
                                        console.log(`[**+++**] Transaction found ${txHash}`, new Date());
                                        console.log({ hash: tx.hash, address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                                    }
                                }
                            }
                        })
                    } catch (err) {
                        console.error(err);
                    }
                }
                // if (res.result != null) {
                //     console.log('Subscription:',res.result);
                // } else if (res.params != null && res.params["result"] != null) {
                //     console.log(`New pending transaction:`,res.params['result']);
                // } else {
                //     console.log(`Unexpected`, data);
                // }
            });
        }
    }
}