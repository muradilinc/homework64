import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';
import {Blog} from '../../types';
import * as dayjs from 'dayjs';
import {BLOG_PAGE, EDIT_PAGE} from '../../constansts/constanst.ts';

interface Props {
  removeBlog: (id: string) => void;
}

const SingleBlog: React.FC<Props> = ({removeBlog}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);

  const getBlog = useCallback(async () => {
    try {
      const response = await axiosApi.get(`blogs/${id}.json`);
      setBlog(response.data);
    } catch (error) {
      alert('Error! ' + error);
    }
  }, [id]);

  useEffect(() => {
    void getBlog();
  }, [getBlog]);

  const element = (
    <>
      {
        blog ?
          <div>
            <span>{dayjs(blog.date).format("YYYY.MM.DD HH:mm:ss")}</span>
            <h1>{blog.title}</h1>
            <p>{blog.description}</p>
          </div>
          :
          null
      }
    </>
  );

  const statusEdit = location.pathname.includes('edit');

  return (
    <div className="border border-black">
      <div>
        <button onClick={() => removeBlog(id ? id : '')}>delete blog</button>
        <button onClick={() => navigate(`${BLOG_PAGE}/${id}${EDIT_PAGE}`)}>Edit blog</button>
      </div>
      {!statusEdit ? element : <Outlet/>}
    </div>
  );
};

export default SingleBlog;