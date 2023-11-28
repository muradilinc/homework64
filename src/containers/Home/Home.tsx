import {useEffect, useState} from 'react';
import {Blog} from '../../types';
import axiosApi from '../../axiosApi.ts';
import BlogView from '../../components/Blog/BlogView.tsx';

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const response = await axiosApi.get<Blog[]>('blogs.json');
      setBlogs(() => Object.values(response.data));
    } catch (error) {
      alert('Error ' + error);
    }
  };

  useEffect(() => {
    void getBlogs();
  }, []);


  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-2">
        {
          blogs.map((blog) => (<BlogView key={blog.id} blog={blog}/>))
        }
      </div>
    </div>
  );
};

export default Home;