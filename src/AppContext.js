import React, { createContext, useState, useContext } from "react";
const Context = createContext();

export const AppContext = ({ children }) => {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [ethBalance, setEthBalance] = useState();
    const [chainId, setChainId] = useState('');

    return (
        <Context.Provider
            value={{
                address, setAddress,
                loading, setLoading,
                mobile, setMobile,
                chainId, setChainId,
                ethBalance, setEthBalance
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(Context);
    const {
        address, setAddress,
        loading, setLoading,
        mobile, setMobile,
        chainId, setChainId,
        ethBalance, setEthBalance
    } = context;
    return {
        address, setAddress,
        loading, setLoading,
        mobile, setMobile,
        chainId, setChainId,
        ethBalance, setEthBalance
    };
};
