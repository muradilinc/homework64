import React from 'react';
import {Blog} from '../../types';
import {Link} from 'react-router-dom';
import * as dayjs from 'dayjs';
import {BLOG_PAGE} from '../../constansts/constanst.ts';

interface Props {
  blog: Blog;
  idBlog: string;
}

const BlogView: React.FC<Props> = ({blog, idBlog}) => {
  return (
    <div className="border border-black p-2">
      <p>Crated on: <span>{dayjs(blog.date).format("YYYY.MM.DD HH:mm:ss")}</span></p>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <Link to={`${BLOG_PAGE}/` + idBlog}>Read more</Link>
    </div>
  );
};

export default BlogView;