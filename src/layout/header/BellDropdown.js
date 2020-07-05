import React, {useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Bell, MessageCircle,ThumbsUp } from 'react-feather';

const BellDropdown = () => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(prevState => !prevState);
return(
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle>
    <Bell/><span className="notification badge badge-pill badge-danger f-10">2</span>
     </DropdownToggle>
     <DropdownMenu className="p-0">
     <ul className="notification-dropdown">
            <li className="gradient-primary-1">
              <h6>Notifications</h6><span>You have 6 unread messages</span>
            </li>
            <li>
              <div className="media">
                <div className="notification-icons bg-success mr-3"><ThumbsUp className="mt-0" /></div>
                <div className="media-body">
                  <h6>Someone Likes Your Posts</h6>
                  <p className="mb-0"> 2 Hours Ago</p>
                </div>
              </div>
            </li>
            <li className="pt-0">
              <div className="media">
                <div className="notification-icons bg-info mr-3"><MessageCircle className="mt-0" /></div>
                <div className="media-body">
                  <h6>3 New Comments</h6>
                  <p className="mb-0"> 1 Hours Ago</p>
                </div>
              </div>
            </li>
            <li className="bg-light txt-dark"><a href="/#">All </a> notification</li>
          </ul>
     </DropdownMenu>
 </Dropdown>
)
}

export default BellDropdown