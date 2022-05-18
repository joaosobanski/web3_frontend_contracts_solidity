import React, { useEffect } from 'react'; 
import { useAppContext } from '../../AppContext';
import { Home } from '../../Elements/Home/Home'; 


export const Context = ({ children }) => { 
    const { loading, address } = useAppContext();

    useEffect(() => {

    }, [loading, address]);

    return (
        <React.Fragment> 
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