import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import axiosApi from '../../axiosApi';
import {ABOUT_PAGE, ADD_PAGE, BLOG_PAGE, EDIT_PAGE, HOME_PAGE} from '../../constansts/constanst';
import {BlogState} from '../../types';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import AddBlog from '../AddBlog/AddBlog';
import SingleBlog from '../SingleBlog/SingleBlog';
import {getContent} from '../../utils/GetContent/GetContent';
import About from '../About/About';
import EditPage from '../EditPage/EditPage';
import {desc} from '../../constansts/text';

const App = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogState[]>([]);
  const [oldText, setOldText] = useState('');
  const [description, setDescription] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const [loader, setLoader] = useState(false);

  const aboutText = async () => {
    try {
      const response = await axiosApi.get('about.json');
      setOldText(response.data.text);
      setDescription(response.data.text);
    }catch (error) {
      alert('Error! ' + error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    void getContent('blogs.json', setBlogs, setLoader);
    void aboutText();
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

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const saveDescription = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoader(true);
    try {
      await axiosApi.put('/about.json', {text: description});
      void aboutText();
      navigate(`${ABOUT_PAGE}`);
    } catch (error) {
      alert('Error! ' + error);
    } finally {
      setLoader(false);
    }
  };

  const recoveryText = async () => {
    setLoader(true);
    try {
      await axiosApi.put('/about.json', {text: desc});
      void aboutText();
      setDescription(desc);
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
          <Route path={ABOUT_PAGE} element={(
            <About
              loader={loader}
              onRecovery={recoveryText}
              desc={oldText}
            />
          )}>
            <Route path={`${ABOUT_PAGE}${EDIT_PAGE}`} element={(
              <EditPage
                text={description}
                changeDesc={changeDescription}
                onSave={saveDescription}
              />
            )}/>
          </Route>
          <Route path="*" element={(
            <h1>404 page or developing</h1>
          )}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;