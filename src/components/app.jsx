import React, { Fragment, } from 'react'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'

import Loader from '../layout/Loader'

import { ToastContainer } from 'react-toastify';
import Sample from "../components/starterkits/samplepage"

const AppLayout = ({children}) =>  {
    console.log("children" , children)
    return(
        <Fragment> 
        <Loader/>
        <div className="page-wrapper">
        <div className="page-body-wrapper">
            <Header/>
            <Sidebar/>
            {/* <RightSidebar/> */}
            <div className="page-body">
                {/* {children} */}
                <Sample/>
            </div>
            {/* <Footer/> */}
            {/* <ThemeCustomize/> */}
        </div>
        </div>
        <ToastContainer />
        </Fragment>  
    )
}

export default AppLayout