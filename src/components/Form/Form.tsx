import React from 'react';
import {BlogMutation} from '../../types';
import {ABOUT_PAGE, BLOG_PAGE} from '../../constansts/constanst';
import {Link} from 'react-router-dom';

interface Props {
  postBlog: (event: React.FormEvent) => void;
  blog: BlogMutation;
  changeBlog: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id: string;
}

const Form: React.FC<Props> = ({postBlog, blog, changeBlog, id}) => {
  return (
    <form onSubmit={postBlog} className={`flex flex-col`}>
      <div className="mb-3">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="title"
          value={blog.title}
          onChange={changeBlog}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={blog.description}
          onChange={changeBlog}
          rows={10}
          cols={45}
          name="description"
          placeholder="Description"
        />
      </div>
      <div className="self-end">
        {
          id ?
            <Link to={`${BLOG_PAGE}/${id}`} className="text-gray-900 mr-3 capitalize bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</Link>
            :
            null
        }
        <button className="mt-3 bg-green-600 px-3 py-1 text-white capitalize rounded text-[18px]"
                type="submit">{id ? 'save' : 'post'}</button>
      </div>
    </form>
  );
};

export default Form;