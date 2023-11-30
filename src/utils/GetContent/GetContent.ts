import React from 'react';
import axiosApi from '../../axiosApi';
import {BlogApi, BlogState} from '../../types';

export const getContent = async (
  url: string,
  setData: React.Dispatch<React.SetStateAction<BlogState[]>>,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setSpinner(true);
  try {
    const response = await axiosApi.get<BlogApi>(url);
    if (response.data) {
      setData(() => {
        const blogsRes: BlogState[] = Object.keys(response.data).map(key => ({
          idBlog: key,
          blog: response.data[key],
        }));
        return blogsRes;
      });
    }
  } catch (error) {
    alert('Error ' + error);
  } finally {
    setSpinner(false);
  }
};