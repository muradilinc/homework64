import React from 'react';
import {Blog} from '../../types';
import {Link} from 'react-router-dom';
import * as dayjs from 'dayjs';
import {BLOG_PAGE} from '../../constansts/constanst.ts';

interface Props {
  blog: Blog;
  idBlog: string;
}

const BlogViewMemoed: React.FC<Props> = React.memo(function BlogView({blog, idBlog}) {
  return (
    <div className="border border-black p-3 rounded-2xl">
      <p className="text-gray-400">Crated on: <span>{dayjs(blog.date).format('YYYY.MM.DD HH:mm:ss')}</span></p>
      <div>
        <h3 className="text-3xl text-ellipsis">{blog.title}</h3>
      </div>
      <Link
        className="relative mt-3 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        to={`${BLOG_PAGE}/` + idBlog}
      >
        <span
          className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Read more
        </span>
      </Link>
    </div>
  );
}, (prevProps, nextProps) => {
  console.log(prevProps.blog === nextProps.blog);
  return prevProps.blog === nextProps.blog;
});

export default BlogViewMemoed;