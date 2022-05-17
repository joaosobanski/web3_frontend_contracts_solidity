import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { Home } from '../../Elements/Home/Home';
import { Loading } from './Loading';
import style from './Context.module.css';


export const Context = ({ children }) => {
    const nav = useNavigate();
    const { loading, address } = useAppContext();

    useEffect(() => {

    }, [loading, address]);

    return (
        <React.Fragment>
            <Loading />
            {
                address ?
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Home />
                    </React.Fragment>
            }
        </React.Fragment>
    )
}