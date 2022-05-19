import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Lottery } from './Elements/Lottery/Lottery';
import { Context } from './Components/Context/Context';
import { Home } from './Elements/Home/Home';
import { AppContext } from './AppContext';
import { Container } from './Components/Context/Container';
import { Swap } from './Elements/Swap/Swap';

export const App = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/lottery' element={<Context><Lottery /></Context>} />
            <Route path='/swap' element={<Swap />} />
          </Routes>
        </Container>
      </AppContext>
    </BrowserRouter>
  );
}

export default App; 
