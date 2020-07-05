import React from 'react'
import { MessageSquare} from 'react-feather';
import BellDropdown from './BellDropdown'
import UserActivity from './UserActivity'
import DropletHeader from './Droplet'
import Search from './Search'
import {RightSidebarToggle} from '../../redux/common/actions'
import { useSelector, useDispatch } from 'react-redux';

const Rightbar = () => {
  const mobileRightTog = useSelector(state => state.Common.mobileRightToggle)
  const rightSidebarToggle = useSelector(state => state.Common.rightSidebarToggle)
  const dispatch = useDispatch();
    return(
          <div className="nav-right col pull-right right-menu">
            <ul className={`nav-menus ${mobileRightTog ? 'open': ''}`}>
              <li>
               <Search/>
              </li>
              <li> 
               <UserActivity/>
              </li>
              <li>
                <BellDropdown/>
              </li>
              <li><a className="right_side_toggle" href="#javascript" onClick={()=>dispatch(RightSidebarToggle(rightSidebarToggle))}><MessageSquare/></a></li>
              <li>
               <DropletHeader/>
              </li>
            </ul>
          </div> 
    )
}


export default Rightbar