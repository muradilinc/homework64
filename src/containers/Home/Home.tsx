import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

import {BlogState} from '../../types';
import BlogView from '../../components/Blog/BlogView.tsx';

interface Props {
  blogs: BlogState[];
}

const Home: React.FC<Props> = ({blogs}) => {
  const {id} = useParams();

  console.log(blogs);

  return (
    <div className="my-8">
      <div className={`grid ${id ? 'grid-cols-3' : 'grid-cols-1'} gap-2`}>
        <div className="grid col-span-1 gap-2">
          {
            blogs.map((blog) => (<BlogView key={blog.idBlog} idBlog={blog.idBlog} blog={blog.blog}/>))
          }
        </div>
        <div className="col-span-2">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Home;