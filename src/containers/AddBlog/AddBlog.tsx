import React, {useCallback, useEffect, useState} from 'react';
import {Blog, BlogMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {BLOG_PAGE} from '../../constansts/constanst';
import Form from '../../components/Form/Form';
import Preloader from '../../components/Preloader/Preloader';
import {getSingleBlog} from '../../utils/GetSingleBlog/GetSingleBlog';

interface Props {
  update?: () => void;
}

const AddBlog: React.FC<Props> = ({update}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogMutation>({
    title: '',
    description: '',
    date: ''
  });
  const [loader, setLoader] = useState(false);

  const getBlog = useCallback(async () => {
    void getSingleBlog<BlogMutation>(`blogs/${id}.json`, setBlog, setLoader);
  }, [id]);

  useEffect(() => {
    if (id) {
      void getBlog();
    }
  }, [getBlog, id]);

  const changeBlog = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const postBlog = async (event: React.FormEvent) => {
    event.preventDefault();

    const dataBlog: Blog = {
      id: Math.random(),
      title: blog.title,
      description: blog.description,
      date: new Date().toString(),
    };

    try {
      if (id) {
        await axiosApi.put(`blogs/${id}.json`, {...dataBlog, date: blog.date});
        if (update) {
          update();
        }
        navigate(`${BLOG_PAGE}/${id}`);
      } else {
        await axiosApi.post('blogs.json', {...dataBlog});
        setBlog({
          title: '',
          description: '',
          date: ''
        });
        if (update) {
          update();
        }
      }
    } catch (error) {
      alert('Error ' + error);
    }
  };

  return (
    <>
      {
        id ?
          <div>
            {
              loader ?
                <Preloader/>
                :
                <Form blog={blog} changeBlog={changeBlog} postBlog={postBlog} id={id}/>
            }
          </div>
          :
          <div className="mt-16 flex justify-center w-[75%] mx-auto">
            <div className="border border-black w-full p-5">
              <h2 className="text-3xl">Add new blog</h2>
              <Form blog={blog} changeBlog={changeBlog} postBlog={postBlog} id={id ? id : ''}/>
            </div>
          </div>
      }
    </>
  );
};

export default AddBlog;