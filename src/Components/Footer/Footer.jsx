import React from 'react';
import { NavigationContent } from '../Navigation/NavigationContent';
import style from './Footer.module.css'

export const Footer = () => {
    return (
        <div className={style['footer']}>
            <div className={style['tab']}>
                <NavigationContent />
            </div>
        </div>
    )
}