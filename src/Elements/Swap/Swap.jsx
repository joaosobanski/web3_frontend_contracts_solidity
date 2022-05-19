import React, { memo, useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext';
import { getContractRouter, getContractToken, getTokensByChain } from '../../Contracts/chain';
import { Button } from '../../Fragments/Button/Button';
import { Label } from '../../Fragments/Label/Label';
import { InputNumber } from '../../Fragments/Input/Input';
import style from './Swap.module.css';
import { BigNumber, ethers } from 'ethers';
import liquidityAbi from '../../Contracts/ERC20'
import routerAbi from '../../Contracts/UniswapV2Router02.json'

export const Swap = () => {
    const { chainId, ethBalance, address, setLoading } = useAppContext();

    const [provider, setProvider] = useState(null);
    const [amount_a, setAmount_a] = useState('');
    const [amount_b, setAmount_b] = useState('');
    const [tokenA, setTokenA] = useState();
    const [tokenB, setTokenB] = useState();
    const [totalA, setTotalA] = useState(0);
    const [totalB, setTotalB] = useState(0);
    const [tokens, setTokens] = useState([]);


    const [contractLiquidity, setContractLiquidity] = useState('');
    const [contractRouter, setContractRouter] = useState('');

    useEffect(() => {
        if (address) {
            createProvider();
        }
        let t = getTokensByChain(chainId);
        setTokens(t);
        if (t.length > 0) {
            setTokenA(t[1].symbol);
            setTotalA(ethBalance)
            setTokenB(t[0].symbol);
        }
    }, [ethBalance, address]);

    const createProvider = async () => {
        setLoading(true);
        const pp = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(pp);
        const signer = await pp.getSigner();
        let contratoToken = await listenContractLiquidity(signer);
        let contratoRouter = await listenContractRouter(signer);

        await getBalanceLiquidity(contratoToken);
        setLoading(false);
    }
    const getBalanceLiquidity = async (contract) => {
        let tokenDecimals = await contract.decimals();
        let balanceNumber = await contract.balances(address);
        let tokenBalance = balanceNumber.toString() / Math.pow(10, tokenDecimals);
        setTotalB(tokenBalance);
    }

    const listenContractLiquidity = async (signer) => {
        const contrato = new ethers.Contract(
            getContractToken(chainId.toString(), ('REACT').toString()),
            liquidityAbi,
            signer
        );
        setContractLiquidity(contrato);
        return contrato;
    }

    const listenContractRouter = async (signer) => {
        const contrato = new ethers.Contract(
            getContractRouter(chainId.toString(), ('UniswapV2Router02').toString()),
            routerAbi,
            signer
        );
        setContractRouter(contrato);
        return contrato;
    }

    const onChangeAmountA = (e) => {
        setAmount_a(e);
    }

    const onChangeAmountB = (e) => {
        setAmount_b(e);
    }
    const onBlurAmountA = () => {
        if (amount_a)
            getAmountOut(tokenA, tokenB, amount_a);
    }
    const onBlurAmountB = () => {
        if (amount_b)
            getAmountIn(tokenA, tokenB, amount_b);
    }

    const getAmountOut = async (a, b, amount) => {
        setLoading(true)
        try {
            let contractA = (tokens.find(t => t.symbol == a).contract);
            let contractB = (tokens.find(t => t.symbol == b).contract);
            let path = [contractA, contractB];

            await contractRouter.getAmountsOut((ethers.utils.parseEther(amount)).toString(), path)
                .then(e => {
                    const etherValor2 = ethers.utils.formatUnits(e[1].toHexString(), "ether");
                    setAmount_b(etherValor2 < 1 ? parseFloat(etherValor2).toFixed(7) : parseFloat(etherValor2).toFixed(3));
                })

        } catch (er) {
            alert(er);
        } finally {
            setLoading(false);
        }
    }

    const getAmountIn = async (a, b, amount) => {
        setLoading(true)
        try {
            let contractA = (tokens.find(t => t.symbol == a).contract);
            let contractB = (tokens.find(t => t.symbol == b).contract);
            let path = [contractA, contractB];

            await contractRouter.getAmountsIn((ethers.utils.parseEther(amount)).toString(), path)
                .then(e => {
                    console.log(e)
                    const etherValor1 = ethers.utils.formatUnits(e[0].toHexString(), "ether");
                    setAmount_a(etherValor1 < 1 ? parseFloat(etherValor1).toFixed(7) : parseFloat(etherValor1).toFixed(3));
                })

        } catch (er) {
            alert(er);
        } finally {
            setLoading(false);
        }
    }

    const handleInvert = () => {
        if (tokens.length > 0) {
            setTokenA(tokenA == tokens[0].symbol ? tokens[1].symbol : tokens[0].symbol);
            setTokenB(tokenB == tokens[0].symbol ? tokens[1].symbol : tokens[0].symbol);
            setAmount_a('');
            setAmount_b('');
            let memory = totalA;
            setTotalA(totalB)
            setTotalB(memory);
        }
    }

    const getValueApproved = async () => {

        let ret = await contractLiquidity.allowance(address, getContractToken(chainId.toString(), ('REACT').toString()));
        const etherValor = ethers.utils.formatUnits(ret.toHexString(), "ether");
        return (parseInt(etherValor) != 0);
    }

    const swapExactTokenEth_ = async () => {
        setLoading(true);

        try {
            if (await getValueApproved()) {
                let contractA = (tokens.find(t => t.symbol == tokenA).contract);
                let contractB = (tokens.find(t => t.symbol == tokenB).contract);
                let path = [contractA, contractB];
                const ret = await contractRouter.swapExactTokensForETH(ethers.utils.parseEther(amount_a), 1, path, address, 99999999999).catch(e => alert(e));
                await ret.wait()
            } else {
                let ret = await contractLiquidity.approve(contractA, ethers.utils.parseEther(amount_a));
                await ret.wait()
            }

        } catch (er) {
            console.log(er)
        } finally {
            setLoading(false);
        }
    }

    const swapExactETHFortoken = async () => {
        setLoading(true);
        try {
            let contractA = (tokens.find(t => t.symbol == tokenA).contract);
            let contractB = (tokens.find(t => t.symbol == tokenB).contract);
            let path = [contractA, contractB];

            const ret = await contractRouter.swapExactETHForTokens(0, path, address, 99999999999,
                { value: ethers.utils.parseEther(amount_a).toString(), gasPrice: 1000000 }).catch(e => alert(e));
            await ret.wait()
        } catch (er) {
            console.log(er)
        } finally {
            setLoading(false);
        }
    }

    const handleSwap = () => {
        if (tokenA == 'WETH') {
            swapExactETHFortoken();
        } else {
            swapExactTokenEth_();
        }
    }

    return (
        <div className={style.swap}>
            <div className={style.container}>
                <div className={style.item}>
                    <InputNumber onChange={onChangeAmountA} value={amount_a} onBlur={onBlurAmountA} />
                    <div className={style.colunm} >
                        <Label text={tokenA} />
                        <Label text={`Saldo: ${parseFloat(totalA).toFixed(3)}`} onClick={() => setAmount_a(totalA)} />
                    </div>
                </div>
                <div className={style.item}>
                    <InputNumber onChange={onChangeAmountB} value={amount_b} onBlur={onBlurAmountB} />
                    <div className={style.colunm} >
                        <Label text={tokenB} />
                        <Label text={`Saldo: ${parseFloat(totalB).toFixed(3)}`} onClick={() => setAmount_b(totalB)} />
                    </div>
                </div>

                <div className={style.item}>
                    <Button onClick={handleInvert}>Invert</Button>
                    <Button onClick={handleSwap}>Swap</Button>
                </div>
            </div>
        </div >
    )

}