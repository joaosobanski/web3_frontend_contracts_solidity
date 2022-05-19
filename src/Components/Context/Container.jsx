import React, { useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { Home } from '../../Elements/Home/Home';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import style from './Container.module.css';
import { Loading } from './Loading';

export const Container = ({ children }) => {
    const { loading, address, mobile, setMobile } = useAppContext();

    useEffect(() => {
        if (window.innerWidth <= 900) {
            setMobile(true);
        }
        if (window.innerWidth >= 900) {
            setMobile(false);
        }
    }, [loading, address, window.innerWidth]);

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
                <Footer />
            </div>
        </div>
    )
}