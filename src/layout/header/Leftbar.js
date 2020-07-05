import React,{useState, Fragment} from 'react';
import { Maximize, MoreHorizontal } from 'react-feather';
import CategoryDropdown from './CategoryDropdown'
import StatusDropdown from './StatusDropdown'
import OrderDropdown from './OrderDropdown'
const Leftbar = () => {
  const [LeftBar,setLeftBar]=useState(false)
  function ToggleLeftBar() {
    setLeftBar(!LeftBar)
  }
   //full screen function
   function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
    return(
        <Fragment>
        <div className="vertical-mobile-sidebar"><i className="fa fa-bars sidebar-bar"></i></div>
          <div className="nav-right col left-menu-header">
            <ul className={`nav-menus-left ${LeftBar? 'open': ''}`}>
              <li><a onClick={goFull} className="text-dark" href="#!"><Maximize/></a></li>
              <li>
              <CategoryDropdown />
              </li>
              <li>
                <StatusDropdown/>
              </li>
              <li>
               <OrderDropdown/>
              </li>
            </ul>
            <div onClick={ToggleLeftBar} className="d-xl-none mobile-toggle-left pull-right">
            <MoreHorizontal/>
            </div>
          </div>
          
        </Fragment>
    )
}


export default Leftbar;