import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {ABOUT_PAGE, EDIT_PAGE} from '../../constansts/constanst';

interface Props {
  desc: string;
  onRecovery: () => void;
}

const About: React.FC<Props> = ({desc, onRecovery}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const statusEdit = location.pathname.includes('edit');

  return (
    <div className="my-5">
      <h1 className="text-center text-4xl font-bold">Keddit</h1>
      <div className="mt-3">
        <p>{desc}</p>
        {
          !statusEdit ?
            <div className="mt-5 flex justify-end">
              <button
                onClick={onRecovery}
                className="text-gray-900 capitalize bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >Recovery first text?</button>
              <button
                onClick={() => navigate(`${ABOUT_PAGE}${EDIT_PAGE}`)}
                className="ml-3 bg-green-600 px-3 py-1 text-white capitalize rounded text-[18px]"
              >
                Edit
              </button>
            </div>
            :
            <h1 className="text-5xl mt-5">Editing</h1>
        }
      </div>
      <Outlet/>
    </div>
  );
};

export default About;