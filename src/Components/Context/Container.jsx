import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { Home } from '../../Elements/Home/Home';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import style from './Container.module.css';
import { Loading } from './Loading';

export const Container = ({ children }) => {
    const nav = useNavigate();
    const { loading, address, mobile, setMobile } = useAppContext();

    useEffect(() => {
        if (window.innerWidth <= 900) {
            setMobile(true);
        }
    }, [loading, address, window]);

    return (
        <div className={style['container']}>
            <div className={style['children']}>
                <Header />
                <Loading />
                <div className={style['margin']}>
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
                </div>
                {
                    mobile &&
                    <Footer />
                }
            </div>
        </div>
    )
}