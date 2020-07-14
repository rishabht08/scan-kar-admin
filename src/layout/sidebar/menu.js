import {Home , Anchor} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', type: 'sub',icon: Home ,active:false , path: `${process.env.PUBLIC_URL}/`
        //  children: [
        //     { path: `${process.env.PUBLIC_URL}/`, title: 'DashBoard', type: 'link' },
        // ]
    },
    {
        title: 'Generate QR Code', icon:Anchor , type: 'sub2', active: false, path: `${process.env.PUBLIC_URL}`
          
    },
    // {
    //     title: 'Support', icon:Headphones,type: 'sub',active: false, children: [
    //         {  path: 'http://support.pixelstrap.com/help-center', title: 'Raise Ticket', type: 'exteral_link', },
    //     ]
    // },

    // starter-kit/default-page
   
]
