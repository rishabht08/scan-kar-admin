import React, {useState} from 'react'
import { Droplet, FileText, Users, Anchor, Settings ,Activity,Clipboard} from 'react-feather';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const DropletHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
    return(
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
      <Droplet/>
      </DropdownToggle>
      <DropdownMenu className="p-0">
      <ul className="droplet-dropdown">
            <li className="gradient-primary-1 text-center">
              <h6>Grid Dashboard</h6><span>Easy Grid inside dropdown</span>
            </li>
            <li>
              <div className="row">
                <div className="col-sm-4 col-6 droplet-main"><FileText/><span className="d-block">Content</span></div>
                <div className="col-sm-4 col-6 droplet-main"><Activity/><span className="d-block">Activity</span></div>
                <div className="col-sm-4 col-6 droplet-main"><Users/><span className="d-block">Contacts</span></div>
                <div className="col-sm-4 col-6 droplet-main"><Clipboard/><span className="d-block">Reports</span></div>
                <div className="col-sm-4 col-6 droplet-main"><Anchor/><span className="d-block">Automation</span></div>
                <div className="col-sm-4 col-6 droplet-main"><Settings/><span className="d-block">Settings</span></div>
              </div>
            </li>
            <li className="text-center">
              <button className="btn btn-primary btn-air-primary">Follows Up</button>
            </li>
        </ul>
      </DropdownMenu>
      </Dropdown>
    )
}

export default DropletHeader