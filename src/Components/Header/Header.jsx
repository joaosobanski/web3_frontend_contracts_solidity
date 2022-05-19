import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { getContractToken } from '../../Contracts/chain';
import { Button } from '../../Fragments/Button/Button';
import { Label } from '../../Fragments/Label/Label';
import { NavigateTo } from '../Navigation/NavigateTo';
import { NavigationContent } from '../Navigation/NavigationContent';
import liquidityAbi from '../../Contracts/ERC20.json';
import style from './Header.module.css';

export const Header = () => {
    const { mobile, setAddress, address, setChainId, ethBalance, setEthBalance, loading, setLoading, chainId } = useAppContext();

    useEffect(() => {
    }, [address]);



    const onClickConnect = async () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((result) => {
                    setAddress(result[0]);
                    getAccountBalance(result[0]);
                })
                .catch((error) => {
                    alert(error.message);
                });
            const chainId_ = await window.ethereum.request({ method: "eth_chainId" });
            setChainId(chainId_);
            console.log(chainId_)


            /*
            const chainId_ = await window.ethereum.request({ method: "eth_chainId" });

            await window.ethereum
                .request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x3" }],
                })
                .then((e) => {
                    setChainId(chainId_);
                });*/
        } else {
            console.log("Need to install MetaMask");
            alert("Please install MetaMask browser extension to interact");
        }
    }

    const getAccountBalance = (account) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then(balance => {
                setEthBalance(ethers.utils.formatEther(balance));
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (
        <div className={style['header']}>
            <div className={style['left']}>
                <NavigateTo to='/'>Home</NavigateTo>
            </div>
            <div className={style['center']}>
                <NavigationContent />
            </div>
            <div className={style['right']}>
                {
                    !address ?
                        <Button onClick={onClickConnect}>Connect</Button>
                        :
                        <Label text={`ETH ${ethBalance}`} />
                }
            </div>
        </div>
    )
}