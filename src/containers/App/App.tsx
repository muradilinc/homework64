import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import axiosApi from '../../axiosApi';
import {toast, ToastContainer} from 'react-toastify';
import {ABOUT_PAGE, ADD_PAGE, BLOG_PAGE, CONTACT_PAGE, EDIT_PAGE, HOME_PAGE} from '../../constansts/constanst';
import {desc} from '../../constansts/text';
import {BlogState} from '../../types';
import {getContent} from '../../utils/GetContent/GetContent';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import AddBlog from '../AddBlog/AddBlog';
import SingleBlog from '../SingleBlog/SingleBlog';
import About from '../About/About';
import EditPage from '../EditPage/EditPage';
import Contact from '../Contact/Contact';

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
    } catch (error) {
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
      if (blogs.length < 2) {
        setBlogs(prevState => {
          return prevState.filter(blog => blog.idBlog !== id);
        });
      } else {
        void getContent('blogs.json', setBlogs, setLoader);
      }
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      setLoader(false);
      toast.success('Blog deleted!');
    }
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const saveDescription = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    setLoader(true);
    try {
      await axiosApi.put('/about.json', {text: description});
      void aboutText();
      navigate(`${ABOUT_PAGE}`);
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      setLoader(false);
      toast.success('Text saved!');
    }
  };

  const recoveryText = async (): Promise<void> => {
    setLoader(true);
    try {
      await axiosApi.put('/about.json', {text: desc});
      void aboutText();
      setDescription(desc);
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      toast.success('Recovered text!');
      setLoader(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          <Route path={`${CONTACT_PAGE}`} element={<Contact/>}/>
          <Route path="*" element={(
            <h1>404 page or developing</h1>
          )}/>
        </Routes>
      </div>
    </>
  );
};

export default App;