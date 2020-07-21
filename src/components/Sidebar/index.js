import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  const [toggle, setToggle] = useState('sidebar');
  return (
    <div className='homesidebar'>
      <div class='btn' onClick={() => setToggle(!toggle)}>
        <span class='fas fa-bars'></span>
      </div>
      <nav class={toggle ? 'sidebar' : 'show'}>
        {/* <div class='text'>Side Menu</div> */}
        <ul>
          <li class='active'>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='/' class='feat-btn'>
              Map
              <span class='fas fa-caret-down first'></span>
            </Link>
            <ul class='feat-show'>
              <li>
                <Link to='/'>Pages</Link>
              </li>
              <li>
                <Link to='/'>Elements</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/' class='serv-btn'>
              Services
              <span class='fas fa-caret-down second'></span>
            </Link>
            <ul class='serv-show'>
              <li>
                <Link to='/'>App Design</Link>
              </li>
              <li>
                <Link to='/'>Web Design</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/'>Portfolio</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
