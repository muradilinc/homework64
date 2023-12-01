import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import dayjs from 'dayjs';
import {Blog} from '../../types';
import {BLOG_PAGE, EDIT_PAGE} from '../../constansts/constanst';
import {getSingleBlog} from '../../utils/GetSingleBlog/GetSingleBlog';
import Preloader from '../../components/Preloader/Preloader';

interface Props {
  removeBlog: (id: string) => void;
}

const SingleBlog: React.FC<Props> = ({removeBlog}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loader, setLoader] = useState(false);


  const getBlog = useCallback(async (): Promise<void> => {
    void getSingleBlog<Blog | null>(`blogs/${id}.json`, setBlog, setLoader);
  }, [id]);

  const statusEdit = location.pathname.includes('edit');

  useEffect(() => {
    if (!statusEdit) {
      void getBlog();
    }
  }, [getBlog, statusEdit]);

  const element = (
    <>
      {
        blog ?
          <div>
            <h1 className="text-3xl">{blog.title}</h1>
            <span className="text-gray-400">Created on: {dayjs(blog.date).format('YYYY.MM.DD HH:mm:ss')}</span>
            <div className="mt-3">
              <p className="text-[18px]">{blog.description}</p>
            </div>
          </div>
          :
          null
      }
    </>
  );

  return (
    <div className="relative border border-black p-3 rounded-2xl min-h-[700px]">
      {
        loader ?
          <Preloader/>
          :
          <>
            {!statusEdit ? element : <Outlet/>}
            {
              !statusEdit ?
                <div className="absolute bottom-[20px] right-5 flex justify-between w-[15%]">
                  <button className="bg-red-600 px-3 py-1 text-white capitalize rounded text-[18px]"
                          onClick={() => removeBlog(id ? id : '')}>delete
                  </button>
                  <button className="bg-green-600 px-3 py-1 text-white capitalize rounded text-[18px]"
                          onClick={() => navigate(`${BLOG_PAGE}/${id}${EDIT_PAGE}`)}>edit
                  </button>
                </div>
                :
                null
            }
          </>
      }
    </div>
  );
};

export default SingleBlog;