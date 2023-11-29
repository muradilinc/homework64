import React, {useCallback, useEffect, useState} from 'react';
import {Blog, BlogMutation} from '../../types';
import axiosApi from '../../axiosApi.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {BLOG_PAGE} from '../../constansts/constanst.ts';

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

  const getBlog = useCallback(async () => {
    try {
      const response = await axiosApi.get(`blogs/${id}.json`);
      setBlog(response.data);
    } catch (error) {
      alert('Error! ' + error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void getBlog();
    }
  },[getBlog, id]);

  const changeBlog = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (id){
        await axiosApi.put(`blogs/${id}.json`, {...dataBlog, date: blog.date});
        if (update) {
          update();
        }
        navigate(`${BLOG_PAGE}/${id}`);
      } else {
        await axiosApi.post('blogs.json', {...dataBlog});
      }
    } catch (error) {
      alert('Error ' + error);
    }
  };

  return (
    <div>
      <form onSubmit={postBlog}>
        <div>
          <input
            value={blog.title}
            onChange={changeBlog}
            type="text"
            name='title'
            placeholder="Title"
            required
          />
        </div>
        <div>
          <input
            value={blog.description}
            onChange={changeBlog}
            name='description'
            type="text"
            placeholder="Description"
          />
        </div>
        <button type='submit'>{id ? 'edit' : 'post'}</button>
      </form>
    </div>
  );
};

export default AddBlog;