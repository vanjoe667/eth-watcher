'use strict';

module.exports = ({ web3, web3http }) => {
    const account = '0x443a0fced533cc1f3c780b3def81da471a3b12ad'.toLowerCase();
    const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
        if (err) console.error(err);
    });

    return function watchTransactions() {
            console.log('[+] Watching transactions...');
            subscription.on('data', (txHash) => {
                setTimeout(async () => {
                    try {
                        let tx = await web3http.eth.getTransaction(txHash);
                        if (tx) {
                            if (tx.to) {
                                if (tx.to.toLowerCase() === account) {
                                    console.log(`[+++] Transaction found`,tx);
                                    console.log({ address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                                }
                            }
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }, 60 * 1000);
            });
        }
}