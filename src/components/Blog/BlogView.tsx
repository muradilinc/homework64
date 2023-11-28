import React from 'react';
import {Blog} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  blog: Blog;
}

const BlogView: React.FC<Props> = ({blog}) => {
  return (
    <div className="border border-black p-2">
      <span>{blog.date}</span>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <Link to={blog.id.toString()}>Read more</Link>
    </div>
  );
};

export default BlogView;