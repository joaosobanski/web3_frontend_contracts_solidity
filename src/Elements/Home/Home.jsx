import React from 'react';
import { Label } from '../../Fragments/Label/Label';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style['home']}>
            <Label text='To participate in the game you need to follow some steps to own cryptocurrencies' />
            <Label text='First you need to get faucet from ETH<Ethereum>' />
            <Label text='For that you need to copy your public address from rinkeby chain' />
            <a className={style['a']} href='https://rinkebyfaucet.com' target="_blank">
                (Get Rinkeby Ethereum Here)
            </a>
        </div >
    )
}

