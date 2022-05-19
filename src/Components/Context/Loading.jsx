import React from 'react';
import styles from './Loading.module.css';
import { useAppContext } from '../../AppContext';

export const Loading = () => {
    const { loading, setLoading } = useAppContext();
    const onClose = () => {
        setLoading(!loading)
    }
    return (
        <React.Fragment>
            {
                loading &&
                <div className={styles['modalBackground']}>
                    <div className={styles['loader']} onClick={onClose} />
                </div>
            }
        </React.Fragment>
    )

}