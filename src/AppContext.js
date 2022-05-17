import React, { createContext, useState, useContext } from "react"; 
const Context = createContext();

export const AppContext = ({ children }) => {
    const [address, setAddress] = useState("teste");
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(false);

    return (
        <Context.Provider
            value={{
                address, setAddress,
                loading, setLoading,
                mobile, setMobile
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
        mobile, setMobile
    } = context;
    return {
        address, setAddress,
        loading, setLoading,
        mobile, setMobile
    };
};
