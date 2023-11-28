import React from 'react';
import Header from '../../components/Header/Header.tsx';
import {Route, Routes} from 'react-router-dom';
import {HOME_PAGE} from '../../constansts/constanst.ts';
import Home from '../Home/Home.tsx';

const App = () => {
  return (
    <div>
      <Header/>
      <div>
        <Routes>
          <Route path={HOME_PAGE} element={(
            <Home/>
          )}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;