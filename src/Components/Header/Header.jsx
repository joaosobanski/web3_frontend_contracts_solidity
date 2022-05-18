import React from 'react';
import { useAppContext } from '../../AppContext';
import { Button } from '../../Fragments/Button/Button';
import { NavigateTo } from '../Navigation/NavigateTo';
import { NavigationContent } from '../Navigation/NavigationContent';
import style from './Header.module.css';

export const Header = () => {
    const { mobile, setAddress, address, setChainId } = useAppContext();

    const onClickConnect = async () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((result) => {
                    setAddress(result[0]);
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


    return (
        <div className={style['header']}>
            <div className={style['left']}>
                <NavigateTo to='/'>Home</NavigateTo>
            </div>
            {
                !mobile &&
                <div className={style['center']}>
                    <NavigationContent />
                </div>
            }
            <div className={style['right']}>
                {
                    !address &&
                    <Button onClick={onClickConnect}>Connect</Button>
                }
            </div>
        </div>
    )
}