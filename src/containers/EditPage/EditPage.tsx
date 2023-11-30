import React from 'react';
import {Link} from 'react-router-dom';
import {ABOUT_PAGE} from '../../constansts/constanst';

interface Props{
  text: string;
  changeDesc: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: (event: React.FormEvent) => void;
}

const EditPage: React.FC<Props> = ({text, changeDesc, onSave}) => {
  return (
    <form onSubmit={onSave} className="my-5">
      <textarea
        className="w-full"
        value={text}
        onChange={changeDesc}
        name="desc"
        id="desc" rows={10}
        cols={45}
      />
      <div className="w-[200px] flex justify-between">
        <Link to={`${ABOUT_PAGE}`} className="text-gray-900 capitalize bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">cancel</Link>
        <button type="submit" className="capitalize bg-green-600 px-5 py-2.5 text-white rounded text-sm">save</button>
      </div>
    </form>
  );
};

export default EditPage;