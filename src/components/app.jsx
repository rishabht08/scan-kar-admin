import React, { Fragment, useEffect , useState} from 'react'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import {Route} from 'react-router-dom'
import Loader from '../layout/Loader'
import {Button} from "react-bootstrap"
import "../assets/css/app.css"
import shopData from "../dummy-shop-data.json"

import { ToastContainer } from 'react-toastify';
import Sample from "../components/starterkits/samplepage"
import QRCode from "qrcode.react"
import jsPDF from 'jspdf';


const AppLayout = (props) =>  {
    const [shop, setShop] = useState({});

    useEffect(() => {
        const index = Math.floor(Math.random() * shopData.length);
        setShop(shopData[index])

      } , []);

      const dineInGen = ()=>{
        const qrCodeCanvas = document.querySelectorAll('canvas');
     
        const qrCodeDataUri = qrCodeCanvas[0].toDataURL('image/jpg', 0.5);
       
        let doc = new jsPDF()
        doc.setFontSize(50)
        for(let i =0 ;i<shop.seats ; i++){
            doc.text(80 , 220 ,"Table: " + (i+1))
           
            doc.addImage(qrCodeDataUri , "JPEG" , 5 ,0,200 ,200);
            doc.addPage()
        }
   
        doc.save("DineIn.pdf");

      }

      const takeAwayGen = () =>{

        const qrCodeCanvas = document.querySelectorAll('canvas');
     
        const qrCodeDataUri = qrCodeCanvas[1].toDataURL('image/jpg', 1.0);
       
        let doc = new jsPDF()
        doc.setFontSize(25)
        doc.addImage(qrCodeDataUri , "JPEG" , 5 ,0,200 ,200);
        doc.text(0 , 220 ,shop.name)
        
   
        doc.save("takeAway.pdf");

      }
 
    return(
        <Fragment> 
        <Loader/>
        <div className="page-wrapper">
        <div className="page-body-wrapper">
            {/* <Header/> */}
            <Route exact path="/" render={()=>{
                    return (<div>
                    <Header/>
                    <div className="page-body" style={{"margin-left": "16rem"}}>
                    <Sample/> </div>
                </div>)}}></Route>

                <Route exact path="/generate" render={()=>{
                    return (<div className="generate">
                        <div className="shopdetails">
                        <span><b>Restaurant</b> : {shop.name}</span>
                         <p><b>Place </b> : {shop.vicinity}</p>
                        </div>
                    <Button variant="primary" onClick={()=>dineInGen()}>Generate For DineIn</Button>{' '}
                    <Button variant="secondary" onClick={()=>takeAwayGen()}>Generate for TakeAway</Button>{' '}
                    <div style={{opacity : 0}}>
                    <QRCode value={`https://scankar.netlify.app/${shop.id}`} size={200} />
                    <QRCode value={`https://scankar.netlify.app/${shop.id}take`} size={200} />
                    </div>
                   
                </div>)}}></Route>


            <Sidebar/>
           
        </div>
        </div>
        <ToastContainer />
        </Fragment>  
    )
}

export default AppLayout