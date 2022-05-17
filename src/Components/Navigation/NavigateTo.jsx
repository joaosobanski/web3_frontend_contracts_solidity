import React from 'react';
import { useNavigate } from 'react-router-dom';

import style from './NavigateTo.module.css';

export const NavigateTo = ({ to, children }) => {
    const nav = useNavigate();

    const onClick = () => {
        nav(to);
    }

    return (
        <label className={style['pointer']} onClick={onClick}>
            {children}
        </label>
    )
}