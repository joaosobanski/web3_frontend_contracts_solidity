
import chainList from './chain.json';

export function getContractToken(chainId, symbol) {
    try {
        let data = '';
        chainList.filter(i => i.chain == chainId).forEach(i => {
            i.token.filter(t => t.symbol.toString() == symbol.toString()).forEach(t => {
                data = t.contract;
            });
        });
        return data;
    } catch (ex) {
        console.log(ex)
    }
}

export function getContract(chainId, contract) {
    try {
        let data = '';
        chainList.filter(i => i.chain == chainId).forEach(i => {
            i.contracts.filter(t => t.name.toString() == contract.toString()).forEach(t => {
                data = t.contract;
            });
        });
        return data;
    } catch (ex) {
        console.log(ex)
    }
}
