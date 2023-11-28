import {Link, NavLink} from 'react-router-dom';
import {ABOUT_PAGE, ADD_PAGE, CONTACT_PAGE, HOME_PAGE} from '../../constansts/constanst.ts';

const Header = () => {
  return (
    <div className="bg-red-600">
      <div className="container mx-auto flex items-center justify-between py-5">
        <div>
          <h1 className="text-white text-4xl font-bold"><Link to={HOME_PAGE}>Keddit</Link></h1>
        </div>
        <div className="text-white font-normal text-2xl">
          <ul className="grid grid-cols-4 place-items-center">
            <li><NavLink to={HOME_PAGE}>Home</NavLink></li>
            <li><NavLink to={ADD_PAGE}>Add</NavLink></li>
            <li><NavLink to={ABOUT_PAGE}>About</NavLink></li>
            <li><NavLink to={CONTACT_PAGE}>Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;