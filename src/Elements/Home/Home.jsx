import React from 'react';
import { Label } from '../../Fragments/Label/Label';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style['home']}>
            <br />
            <Label text='To participate in the game you need to follow some steps to own cryptocurrencies' />
            <br />
            <Label text='First you need to get faucet from ETH<Ethereum>' />
            <br />
            <Label text='For that you need to copy your public address from rinkeby chain' />
            <br />
            <a className={style['a']} href='https://rinkebyfaucet.com' target="_blank">
                (Get Rinkeby Ethereum Here)
            </a>
        </div >
    )
}

