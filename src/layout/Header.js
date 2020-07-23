
import React,{useState,useEffect,useCallback, useLayoutEffect} from 'react';
// import creativeLogo from '../assets/images/scan-kar-logo.png';
import Leftbar from './header/Leftbar'
// import Rightbar from './header/Rightbar'
import { MoreHorizontal } from 'react-feather';
import {SearchBarToggle, MobileRightToggle, SwitchToggle} from '../redux/common/actions'
import { Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {MENUITEMS} from './sidebar/menu'
import {Link} from 'react-router-dom'
import logo_light from '../assets/images/scan-kar-logo.png'
import {connect} from "react-redux"

 export const Header = () => {

  const configDB = useSelector(content => content.Customizer.customizer);
  const sidebar_background_color = configDB.settings.sidebar_background_setting;
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [searchValue, setsearchValue] = useState('');
  // eslint-disable-next-line
  const [searchResult, setSearchResult] = useState(false);
  // eslint-disable-next-line
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
  const [leftBarShow , setLeftBar] = useState(false)

  const dispatch = useDispatch();
  const searchTog = useSelector(state => state.Common.searchToggle)
  const mobileRightTog = useSelector(state => state.Common.mobileRightToggle)
  const switchToggle= useSelector(state => state.Common.switchToggle) 
  const width = useWindowSize()
  

  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setsearchValue('')
    }
}, []);

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    
  useEffect(() => {
      console.log("page Url" , window.location.href)
      setLeftBar(window.location.href.includes("/generate") || window.location.href.includes("/addmenu") );
    if (width <= 991) {
        document.querySelector(".page-main-header").className = 'page-main-header open' 
        document.querySelector(".page-sidebar").className = 'page-sidebar open' 
        if (localStorage.getItem("layout_version") === 'dark-only') {
            document.querySelector(".header-logo").className = 'header-logo light';
        }
        else {
            document.querySelector(".header-logo").className = 'header-logo normal';
        }
    }
    else {
        document.querySelector(".page-main-header").className = 'page-main-header ' 
        document.querySelector(".page-sidebar").className = 'page-sidebar ' + sidebar_background_color
    }
    document.addEventListener("keydown", escFunction, false);
    return () => {
        document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction,width,sidebar_background_color]);

  const handleSearchKeyword = (keyword) => {
      keyword ? addFix() : removeFix()
      const items = [];
      setsearchValue(keyword)
      mainmenu.filter(menuItems => {
          if (menuItems.title.toLowerCase().includes(keyword) && menuItems.type === 'link') {
              items.push(menuItems);
          }
          if (!menuItems.children) return false
          menuItems.children.filter(subItems => {
              if (subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link') {
                  subItems.icon = menuItems.icon
                  items.push(subItems);
              }
              if (!subItems.children) return false
              subItems.children.filter(suSubItems => {
                  if (suSubItems.title.toLowerCase().includes(keyword)) {
                      suSubItems.icon = menuItems.icon
                      items.push(suSubItems);
                  }
                  return suSubItems
              })
              return subItems
          })
          checkSearchResultEmpty(items)
          setsearchValue(items);
          return menuItems
      });
  }

  const checkSearchResultEmpty = (items) => {
      if (!items.length) {
          setSearchResultEmpty(true);
          document.querySelector(".empty-menu").classList.add('is-open');
      } else {
          setSearchResultEmpty(false);
          document.querySelector(".empty-menu").classList.remove('is-open');
      }
  }

  const addFix = () => {
      setSearchResult(true);
      document.querySelector(".Typeahead-menu").classList.add('is-open');
  }

  const removeFix = () => { 
      setSearchResult(false)
      setsearchValue('')
  }

    return(
        <div className={`page-main-header ${switchToggle? 'open': ''}`}>
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper header-logo normal"><a href="#javascript">
              {/* <img className="normallogo" src={creativeLogo} alt=""/> */}
              <img className="lightlogo" src={logo_light}  alt="" />
              </a></div>
          </div>
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
            <Label className="switch">
              <Input type="checkbox" onChange={() => dispatch(SwitchToggle(switchToggle))} checked={!switchToggle}/>
              <span className="switch-state"></span>
            </Label>
            </div>
          </div> 
          {!leftBarShow && <Leftbar/> }
            
            {/* <Rightbar/> */}
            <form className={`form-inline search-full ${searchTog? 'open': ''}`}>
            <div className="form-group form-control-plaintext">
              <input 
                type="search"
                id="search"
                placeholder="Search.."
                defaultValue={searchValue}
                onChange={(e) => handleSearchKeyword(e.target.value)}  
                />
              <i onClick={() => dispatch(SearchBarToggle(searchTog))} className="icon-close -search close-search"></i>

              <div className="Typeahead-menu custom-scrollbar" id="search-outer">
                  {searchValue ?
                      searchValue.map((data, index) => {
                          return (
                              <div className="ProfileCard u-cf" key={index}>
                                  <div className="ProfileCard-avatar">
                                      <data.icon />
                                  </div>
                                  <div className="ProfileCard-details">
                                      <div className="ProfileCard-realName">
                                          <Link 
                                              to={data.path} 
                                              className="realname" 
                                              onClick={removeFix}
                                          >
                                              {data.title}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          )
                      }) : ''
                  }
                </div>
                <div className="Typeahead-menu empty-menu">
                    <div className="tt-dataset tt-dataset-0">
                        <div className="EmptyMessage">
                            Opps!! There are no result found.
                        </div>
                    </div>
                </div>
            </div>
          </form>
          <div className="d-lg-none mobile-toggle pull-right"><MoreHorizontal onClick={() => dispatch(MobileRightToggle(mobileRightTog))}/></div>
        </div>
      </div>
    )
}

const mapStateToProps = (state , ownProps) =>{
    console.log("ownProps" , ownProps)
    return{
        sales:state.Toggle.sales
    }
    
    
 }
 
 const mapDispatchToProps = (dispatch) => {
    return {
     
  }
  };
 
 export default connect(mapStateToProps, mapDispatchToProps)(Header)