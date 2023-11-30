import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import axiosApi from '../../axiosApi';
import {ADD_PAGE, BLOG_PAGE, EDIT_PAGE, HOME_PAGE} from '../../constansts/constanst';
import {BlogState} from '../../types';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import AddBlog from '../AddBlog/AddBlog';
import SingleBlog from '../SingleBlog/SingleBlog';
import {getContent} from '../../utils/GetContent/GetContent';

const App = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogState[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    void getContent('blogs.json', setBlogs, setLoader);
  }, [refreshData]);

  const removeBlog = async (id: string) => {
    setLoader(true);
    try {
      await axiosApi.delete(`blogs/${id}.json`);
      navigate(HOME_PAGE);
      void getContent('blogs.json', setBlogs, setLoader);
    } catch (error) {
      alert('Error! ' + error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={(
            <Home loader={loader} blogs={blogs}/>
          )}>
            <Route path={`${BLOG_PAGE}/:id`} element={(
              <SingleBlog removeBlog={removeBlog}/>
            )}>
              <Route path={`${BLOG_PAGE}/:id${EDIT_PAGE}`} element={(
                <AddBlog
                  update={() => setRefreshData(prevState => !prevState)}
                />
              )}/>
            </Route>
          </Route>
          <Route path={ADD_PAGE} element={(
            <AddBlog update={() => setRefreshData(prevState => !prevState)}/>
          )}/>
          <Route path="*" element={(
            <h1>404 page or developing</h1>
          )}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;