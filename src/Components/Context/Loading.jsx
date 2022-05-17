import React from 'react';
import Modal from 'react-modal';
import styles from './Loading.module.css';
import { useAppContext } from '../../AppContext';

export const Loading = ({ }) => {
    const { loading, setLoading } = useAppContext();

    return (
        <Modal
            ariaHideApp={false}
            isOpen={loading}
            className={styles['modal']}
        >
            <div className={styles["loading"]} onClick={() => { setLoading(!loading) }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        </Modal >
    )

}