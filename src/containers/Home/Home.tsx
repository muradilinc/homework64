import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

import {BlogState} from '../../types';
import BlogViewMemoed from '../../components/Blog/BlogViewMemoed';
import Preloader from '../../components/Preloader/Preloader';

interface Props {
  loader: boolean;
  blogs: BlogState[];
}

const Home: React.FC<Props> = ({loader, blogs}) => {
  const {id} = useParams();
  return (
    <div className="my-8">
      {
        loader ?
          <Preloader/>
          :
          <div className={`grid ${id ? 'grid-cols-3' : 'grid-cols-1'} items-start gap-2`}>
            {
              blogs.length === 0 ?
                <div className="text-center">
                  <h1 className="text-3xl">Empty Blogs</h1>
                </div>
                :
                <div className="grid col-span-1 gap-2">
                  {
                    blogs.map((blog) => (<BlogViewMemoed key={blog.idBlog} idBlog={blog.idBlog} blog={blog.blog}/>))
                  }
                </div>
            }
            <div className="col-span-2">
              <Outlet/>
            </div>
          </div>
      }
    </div>
  );
};

export default Home;