import {Route, Routes} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constansts/constanst.ts';

import Header from '../../components/Header/Header.tsx';
import Home from '../Home/Home.tsx';
import AddBlog from '../AddBlog/AddBlog.tsx';

const App = () => {
  return (
    <div>
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={(
            <Home/>
          )}/>
          <Route path={ADD_PAGE} element={(
            <AddBlog/>
          )}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;