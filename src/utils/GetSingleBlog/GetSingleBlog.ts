import React from 'react';
import axiosApi from '../../axiosApi';

export const getSingleBlog = async <T> (
  url: string,
  setData: React.Dispatch<React.SetStateAction<T>>,
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setSpinner(true);
  try {
    const response = await axiosApi.get<T>(url);
    setData(response.data);
  } catch (error) {
    alert('Error! ' + error);
  } finally {
    setSpinner(false);
  }
};