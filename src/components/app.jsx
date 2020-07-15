import React, { Fragment, useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Route } from "react-router-dom";
import Loader from "../layout/Loader";
import { Button, Form, Col } from "react-bootstrap";
import "../assets/css/app.css";
import shopData from "../dummy-shop-data.json";

import { ToastContainer } from "react-toastify";
import Sample from "../components/starterkits/samplepage";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
// import { Segment, Checkbox, Form  } from 'semantic-ui-react'
import Select from "react-select";
import Axios from "axios";
import swal from 'sweetalert';
// import { colourOptions } from '../data';




const AppLayout = (props) => {
  const [shop, setShop] = useState({});
  const [photo , setPhoto] = useState("");
  const [name , setName] = useState("");
  const [category , setCategory] = useState("");
  // const [options , setOptions] = useState([])
  const [price , setPrice] = useState([])
  const [file , setFile] = useState({})
  const [seats , setSeats] = useState([])


  const options = [
    { value: "milkType", label: "MilkType" },
    { value: "size", label: "Size" },
    { value: "quantity", label: "Quantity" },
    { value: "decaf", label: "Decaf" }
  ];

  useEffect(() => {
    const index = Math.floor(Math.random() * shopData.length);
    let arr = []
    for(let i= 1  ; i<=25 ; i++){
      arr[i-1] = i
    }

    setSeats(arr)
    setShop(shopData[index]);
  }, []);

  const dineInGen = () => {
    const qrCodeCanvas = document.querySelectorAll("canvas");

   

    let doc = new jsPDF();
    doc.setFontSize(50);
    for (let i = 0; i < shop.seats; i++) {
      doc.text(80, 220, "Table: " + (i + 1));
      const qrCodeDataUri = qrCodeCanvas[i].toDataURL("image/jpg", 0.5);

      doc.addImage(qrCodeDataUri, "JPEG", 5, 0, 200, 200);
      doc.addPage();
    }

    doc.save("DineIn.pdf");
  };

  const takeAwayGen = () => {
    const qrCodeCanvas = document.querySelectorAll("canvas");
    console.log("canvasses" , qrCodeCanvas)

    const qrCodeDataUri = qrCodeCanvas[25].toDataURL("image/jpg", 1.0);

    let doc = new jsPDF();
    doc.setFontSize(25);
    doc.addImage(qrCodeDataUri, "JPEG", 5, 0, 200, 200);
    doc.text(0, 220, shop.name);

    doc.save("takeAway.pdf");
  }

  const uploadImage =  (e) =>{
    const files = e.target.files[0]
    setFile(files)

   
  }

  const onImputChange = (e)=>{
    switch(e.target.id){
      case "name":
        setName(e.target.value)
        break;
      
      case "category":
        setCategory(e.target.value)
        break;  
      
      case "price":
        setPrice(e.target.value);
        break;  
      }

  }

  const onsubmit = ()=>{
    if(!file.name){
      alert("No Image Selected");
      return;
    }
    const data = new FormData()
    data.append('photo' , file);
    data.append('name' , name);
    data.append('category' , category);
    data.append('price' , price);
    data.append('resturant_id' , "RES77110")
    Axios.post("https://scankar.herokuapp.com/api/v1/products" , data).then(resp=>{
      if(resp.data.status = "Success"){
        swal("Added!", "Menu Item Succesfully Added", "success").then(()=>{
          setName("");
          setFile({});
          setCategory("");
          setPrice("")
          
        })
      }
    })
 

  }

  return (
    <Fragment>
      <Loader />
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          {/* <Header/> */}
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <Header />
                  <div className="page-body" style={{ "margin-left": "16rem" }}>
                    <Sample />
                  </div>
                </div>
              );
            }}
          ></Route>

          <Route
            exact
            path="/generate"
            render={() => {
              return (
                <div className="generate">
                  <div className="shopdetails">
                    <span>
                      <b>Restaurant</b> : {shop.name}
                    </span>
                    <p>
                      <b>Place </b> : {shop.vicinity}
                    </p>
                  </div>
                  <Button variant="primary" onClick={() => dineInGen()}>
                    Generate For DineIn
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => takeAwayGen()}>
                    Generate for TakeAway
                  </Button>{" "}
                  <div style={{ opacity: 0 }}>
                    {seats.map((x)=>(
                        <QRCode
                        value={`https://scankar.netlify.app/${shop.id}T${x}`}
                        size={200}
                      />

                    ))}
                  
                    <QRCode
                      value={`https://scankar.netlify.app/${shop.id}take`}
                      size={200}
                    />
                  </div>
                </div>
              );
            }}
          ></Route>

          <Route
            exact
            path="/addmenu"
            render={() => {
              return (
                <div className="generate">
                  {/* <Segment>Pellentesque habitant morbi tristique senectus.</Segment> */}

                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          id="name"
                          placeholder="Enter menu name"
                          onChange = {(e)=>onImputChange(e)}
                          value = {name}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          id="price"
                          placeholder="Enter menu price"
                          onChange = {(e)=>onImputChange(e)}
                          value = {price}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter menu Category"
                          id="category"
                          onChange = {(e)=>onImputChange(e)}
                          value = {category}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Options</Form.Label>
                        <Select
                          // defaultValue={[colourOptions[2], colourOptions[3]]}
                          isMulti
                          name="colors"
                          options={options}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          id="options"
                      
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Menu Item Image</Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Enter menu Image"
                          onChange = {(e)=>uploadImage(e)}
                        />
                      </Form.Group>
                      </Form.Row>

                    <Button variant="primary" onClick={()=>onsubmit()}>
                      Submit
                    </Button>
                  </Form>
                </div>
              );
            }}
          ></Route>

          <Sidebar />
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AppLayout;
