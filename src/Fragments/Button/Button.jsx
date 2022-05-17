import React from 'react';
import style from './Button.module.css';
export const Button = ({ onClick, children }) =>
    <button
        className={style['button']}
        onClick={onClick}>
        {children}
    </button>