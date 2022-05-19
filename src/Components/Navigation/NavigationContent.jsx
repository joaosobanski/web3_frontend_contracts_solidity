import React from 'react';
import { useAppContext } from '../../AppContext';
import { NavigateTo } from './NavigateTo';


export const NavigationContent = () => {
    const { address, chainId } = useAppContext();

    return (
        <React.Fragment>
            {
                address &&
                <React.Fragment>
                    <NavigateTo to='/swap'>Swap</NavigateTo>
                    <NavigateTo to='/lottery'>lottery</NavigateTo>
                </React.Fragment>
            }
        </React.Fragment>
    )
}