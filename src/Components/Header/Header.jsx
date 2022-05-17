import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { Button } from '../../Fragments/Button/Button';
import { NavigateTo } from '../Navigation/NavigateTo';
import { NavigationContent } from '../Navigation/NavigationContent';
import style from './Header.module.css';

export const Header = () => {
    const { loading, address, mobile, setMobile } = useAppContext();
    const nav = useNavigate();
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
                <Button onClick={() => { nav('/lottery') }}>Connect</Button>
            </div>
        </div>
    )
}