import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { Loading } from '../../Components/Context/Loading';
import style from './Lottery.module.css';

export const Lottery = () => {
    const nav = useNavigate();
    const { loading, setLoading } = useAppContext();

    const click = () => {
        setLoading(!loading);
    }

    return (
        <React.Fragment>
            <button onClick={click}> s</button>
        </React.Fragment>
    )
}