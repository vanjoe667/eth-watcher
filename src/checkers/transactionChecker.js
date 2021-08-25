'use strict';

module.exports = web3 => {
    const account = '0x443a0fced533cc1f3c780b3def81da471a3b12ad'.toLowerCase();

    return {
        async checkLastBlock(){
            let block = await web3.eth.getBlock('latest');
            console.log(`[*] Searching block ${ block.number }...`);
            if (block && block.transactions) {
                for (let tx of block.transactions) {
                    let transaction = await web3.eth.getTransaction(tx);
                    if(transaction){
                        if(transaction.to){
                            if (account === transaction.to.toLowerCase()) {
                                console.log(`[+] Transaction found on block ${ block.number }`,transaction);
                                console.log({ address: transaction.from, value: web3.utils.fromWei(transaction.value, 'ether'), timestamp: new Date() });
                            }
                        }
                    }
                }
            }
        },

        async checkBlocks(start, end){
            for (let i = start; i < end; i++) {
                let block = await web3.eth.getBlock(i)
                console.log(`[**] Searching block ${ i }`);
                if (block && block.transactions) {
                    for (let tx of block.transactions) {
                        let transaction = await web3.eth.getTransaction(tx);
                        if(transaction.to){
                            if (account === transaction.to.toLowerCase()) {
                                console.log(`[++] Transaction found on block ${ block.number }`,transaction);
                                console.log({ address: transaction.from, value: web3.utils.fromWei(transaction.value, 'ether'), timestamp: new Date() });
                            }
                        }
                    }
                }
            }       
        }
    }
}