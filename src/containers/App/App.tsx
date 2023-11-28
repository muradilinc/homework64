import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import axiosApi from '../../axiosApi.ts';
import {ADD_PAGE, BLOG_PAGE, EDIT_PAGE, HOME_PAGE} from '../../constansts/constanst.ts';
import {BlogApi, BlogState} from '../../types';
import Header from '../../components/Header/Header.tsx';
import Home from '../Home/Home.tsx';
import AddBlog from '../AddBlog/AddBlog.tsx';
import SingleBlog from '../SingleBlog/SingleBlog.tsx';

const App = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogState[]>([]);

  const getBlogs = async () => {
    try {
      const response = await axiosApi.get<BlogApi>('blogs.json');
      setBlogs(() => {
        const blogsRes: BlogState[] = Object.keys(response.data).map(key => ({
          idBlog: key,
          blog: response.data[key],
        }));
        return blogsRes;
      });
    } catch (error) {
      alert('Error ' + error);
    }
  };

  useEffect(() => {
    void getBlogs();
  }, []);

  const removeBlog = async (id: string) => {
    console.log(id);
    try{
      await axiosApi.delete(`blogs/${id}.json`);
      navigate(HOME_PAGE);
      void getBlogs();
    }catch (error) {
      alert('Error! ' + error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={(
            <Home blogs={blogs}/>
          )}>
            <Route path={`${BLOG_PAGE}/:id`} element={(
              <SingleBlog removeBlog={removeBlog}/>
            )}>
              <Route path={`${BLOG_PAGE}/:id${EDIT_PAGE}`} element={(
                <AddBlog/>
              )}/>
            </Route>
          </Route>
          <Route path={ADD_PAGE} element={(
            <AddBlog/>
          )}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;