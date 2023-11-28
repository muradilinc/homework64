import React, {useState} from 'react';
import {Blog, BlogState} from '../../types';
import axiosApi from '../../axiosApi.ts';

const AddBlog = () => {
  const [blog, setBlog] = useState<BlogState>({
    title: '',
    description: '',
  });

  const changeBlog = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const postBlog = async (event: React.FormEvent) => {
    event.preventDefault();

    const dataBlog: Blog = {
      id: Math.random(),
      title: blog.title,
      description: blog.description,
      date: new Date().toString(),
    };

    try {
      await axiosApi.post('blogs.json', dataBlog);
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
        <button type='submit'>post</button>
      </form>
    </div>
  );
};

export default AddBlog;