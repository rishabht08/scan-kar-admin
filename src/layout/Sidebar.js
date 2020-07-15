
import React, { Fragment, useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import logo_compact from '../assets/images/scan-kar-logo.png';
import logo_light from '../assets/images/scan-kar-logo.png'
import { MENUITEMS } from './sidebar/menu';
import {Link} from 'react-router-dom'
import configDB from '../data/customizer/config';

const Sidebar = () => {
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const switchToggle = useSelector(state => state.Common.switchToggle)
    const sidebar_background_color = configDB.data.settings.sidebar_background_setting;

    useEffect(() => {
        const currentUrl = window.location.pathname;
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl){
                        setNavActive(subSubItems)
                        return true
                    }
                    else{
                        return false
                    }
                })
                return subItems
            })
            return items
        })

        // eslint-disable-next-line
    }, []);

    const setNavActive = (item) => {
        MENUITEMS.filter(menuItem => {
            if (menuItem !== item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
            return menuItem
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    // Click Toggle menu
    const toggletNavActive = (item) => {        
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

  
    return (
        <Fragment>
            <div className={`page-sidebar ${switchToggle? 'open': sidebar_background_color}`}>
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper compactLogo">
                        <Link to={`${process.env.PUBLIC_URL}/starter-kit/sample-page`}>
                            <img className="blur-up lazyloaded light" src={logo_light}  alt="" />
                            <img className="blur-up lazyloaded compactlogo" src={logo_compact}  alt="" />
                            {/* <img className="blur-up lazyloaded logo" src={logo}  alt="" /> */}
                        </Link>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul className="sidebar-menu">
                         {
                            MENUITEMS.map((menuItem, i) => 
                               
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    {(menuItem.sidebartitle) ? <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}
                                    {(menuItem.type === 'sub') &&
                                        <a className="sidebar-header" href="/" onClick={() => toggletNavActive(menuItem)}>
                                            <menuItem.icon />
                                    <span>{menuItem.title}</span>
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </a>}
                                        { (menuItem.type === 'sub2') && <a className="sidebar-header" href="/generate" onClick={() => toggletNavActive(menuItem)}>
                                        <menuItem.icon />
                                <span>{menuItem.title}</span>
                                        <i className="fa fa-angle-right pull-right"></i>
                                    </a>
                                    
                                    }
                                      { (menuItem.type === 'sub3') && <a className="sidebar-header" href="/addmenu" onClick={() => toggletNavActive(menuItem)}>
                                        <menuItem.icon />
                                <span>{menuItem.title}</span>
                                        <i className="fa fa-angle-right pull-right"></i>
                                    </a>
                                    
                                    }
                                    {(menuItem.type === 'link') ?
                                        <Link className={`sidebar-header ${menuItem.active ? 'active' :''}`}  onClick={() => toggletNavActive(menuItem)} to={menuItem.path}>
                                            <menuItem.icon /><span>{menuItem.title}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}
                                    {menuItem.children ?
                                        <ul
                                            className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                                            style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                        >
                                            {menuItem.children.map((childrenItem, index) =>
                                                <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                                    {(childrenItem.type === 'sub') ?
                                                        <a href={childrenItem.path} onClick={() => toggletNavActive(childrenItem)} >
                                                            <i className="fa fa-circle"></i>{childrenItem.title} <i className="fa fa-angle-down pull-right"></i></a>
                                                        : ''}

                                                    {(childrenItem.type === 'link') ?
                                                        <Link className={childrenItem.active ? 'active' : ''} onClick={() => toggletNavActive(childrenItem)} to={childrenItem.path}>
                                                            <i className="fa fa-circle"></i>{childrenItem.title}
                                                        </Link>
                                                        : ''}
                                                     {(childrenItem.type === 'exteral_link') ?                      
                                                        <a href={childrenItem.path}  className={childrenItem.active ? 'active' : ''} >{childrenItem.title}</a>
                                                        : ''}
                                                </li>
                                            )}
                                            
                                        </ul>
                                        : ''}   
                                </li>

                            )
                        }
                   </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default Sidebar;