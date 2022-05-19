import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext';
import lotteryAbi from '../../Contracts/sorteio.json';
import liquidityAbi from '../../Contracts/ERC20'
import { ethers } from 'ethers';
import { getContract, getContractToken } from '../../Contracts/chain';
import { Label } from '../../Fragments/Label/Label';
import { Button } from '../../Fragments/Button/Button';
import style from './Lottery.module.css'

export const Lottery = () => {
    const { loading, setLoading, address, chainId } = useAppContext();
    const [contractLottery, setContractLottery] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contractLiquidity, setContractLiquidity] = useState(null);
    const [totalBalance, setTotalBalance] = useState('');
    const [contractLotteryBalance, setContractLotteryBalance] = useState('');
    const [tokenDecimal, setTokenDecimal] = useState('');
    const [valueTicket, setValueTicket] = useState('');
    const [userAlreadyLottery, setAlreadyLottery] = useState(false);
    const [lotteryWinner, setLotteryWinner] = useState('');

    useEffect(() => {
        if (address) {
            createProvider();
        }
    }, [address]);

    const getBalanceLiquidity = async (contract) => {
        let tokenDecimals = await contract.decimals();
        let balanceNumber = await contract.balances(address);
        let tokenBalance = balanceNumber.toString() / Math.pow(10, tokenDecimals);
        setTotalBalance(tokenBalance);
        setTokenDecimal(tokenDecimals);
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

    const listenContractLottery = async (signer) => {
        const contrato = new ethers.Contract(
            getContract(chainId.toString(), ('LOTTERY').toString()),
            lotteryAbi,
            signer
        );
        setContractLottery(contrato);
        return contrato;
    }

    const getContractBalance = async (contract) => {
        let balanceNumber = await contract.contractBalance();
        const etherValor = ethers.utils.formatUnits(balanceNumber.toHexString(), "ether");
        setContractLotteryBalance(parseInt(etherValor));
    }

    const getTicketValue = async () => {
        setValueTicket((parseInt(1000000000000000000000) / Math.pow(10, tokenDecimal)) * 1000);
    }

    const createProvider = async () => {
        setLoading(true);
        const pp = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(pp);
        const signer = await pp.getSigner();
        let contratoToken = await listenContractLiquidity(signer);
        let contratoLottery = await listenContractLottery(signer);
        await getBalanceLiquidity(contratoToken);
        await getContractBalance(contratoLottery);
        await getTicketValue();
        await getUserTokenBalance(contratoLottery);
        await getLotteryWinner(contratoLottery);
        setLoading(false);
    }

    const getAll = async () => {
        let balanceNumber = await contractLiquidity.allowance(address, getContract(chainId.toString(), ('LOTTERY').toString()));
        const etherValor = ethers.utils.formatUnits(balanceNumber.toHexString(), "ether");
        return (parseInt(etherValor) != 0);
    }

    const getUserTokenBalance = async (contract) => {
        let ret = await contract.userTokenBalance(address);
        const etherValor = ethers.utils.formatUnits(ret.toHexString(), "ether");
        setAlreadyLottery(parseInt(etherValor) != 0);
    }

    const getLotteryWinner = async (contract) => {
        let address = await contract.sorteado();
        if (address != '0x0000000000000000000000000000000000000000')
            setLotteryWinner(address);
    }

    const handleGetWinner = async () => {
        setLoading(true);
        try {
            let tx = await contractLottery.getSorteio()
                .catch((er) => {
                    alert(er.error.message);
                });
            await tx.wait();
            await createProvider();
        } catch (er) {
            alert(er);
        } finally {
            setLoading(false);
        }
    }


    const handleEnterLottery = async () => {
        setLoading(true);
        try {
            if (await getAll()) {
                let txApprove = await contractLottery.deposit(ethers.utils.parseEther('1000'))
                    .catch((er) => {
                        alert(er.error.message);
                    });
                await txApprove.wait();
            } else {
                await contractLiquidity.approve(getContract(chainId.toString(), ('LOTTERY').toString()), ethers.utils.parseEther('1000'));
            }
        } catch (er) {
            alert(er);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={style['lottery']}>
            <Label text={`My LIQUIDITY Tokens ${totalBalance}`} />
            <Label text={`Value for Ticket ${valueTicket}`} />
            <Label text={`TVL Lottery ${contractLotteryBalance}`} />
            {
                lotteryWinner ?
                    <Label text={`Last Lottery Winner ${lotteryWinner}`} />
                    :
                    <Label text='Waiting lottery!' />
            }
            {
                !userAlreadyLottery &&
                <Button onClick={handleEnterLottery}>Enter the Lottery</Button>
            }
            <br />
            {
                address.toUpperCase() == ('0x4c30E1F8c3c9335ef282b22a2D82bA04d9C22EEA').toUpperCase() &&
                <Button onClick={handleGetWinner}>Start Lottery</Button>
            }
        </div>
    )
}