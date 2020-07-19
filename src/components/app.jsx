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
import swal from "sweetalert";
// import { colourOptions } from '../data';
import { Dropdown } from "semantic-ui-react";
// import { colourOptions, groupedOptions } from '../data';

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const AppLayout = (props) => {
  const [shop, setShop] = useState({});
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // const [options , setOptions] = useState([])
  const [price, setPrice] = useState([]);
  const [file, setFile] = useState({});
  const [seats, setSeats] = useState([]);

  const options = [
    { value: "milkType", label: "MilkType" },
    { value: "size", label: "Size" },
    { value: "quantity", label: "Quantity" },
    { value: "decaf", label: "Decaf" },
  ];

  const CategoryOptions = [
    { value: "burger", label: "BURGER" },
    { value: "soup", label: "SOUP" },
    { value: "soft drink", label: "SOFT DRINK" },
    { value: "beer", label: "BEER" },
    { value: "pizza", label: "PIZZA" },
    { value: "donuts", label: "DONUTS" },
    { value: "south indian", label: "SOUTH INDIAN" },
    { value: "north indian", label: "NORTH INDIAN" },
    { value: "italian", label: "ITALIAN" },
    { value: "vegetarian", label: "VEGETARIAN" },
  ];

  useEffect(() => {
    const index = Math.floor(Math.random() * shopData.length);
    let arr = [];
    for (let i = 1; i <= 25; i++) {
      arr[i - 1] = i;
    }

    setSeats(arr);
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
    console.log("canvasses", qrCodeCanvas);

    const qrCodeDataUri = qrCodeCanvas[25].toDataURL("image/jpg", 1.0);

    let doc = new jsPDF();
    doc.setFontSize(25);
    doc.addImage(qrCodeDataUri, "JPEG", 5, 0, 200, 200);
    doc.text(0, 220, shop.name);

    doc.save("takeAway.pdf");
  };

  const uploadImage = (e) => {
    const files = e.target.files[0];
    setFile(files);
  };

  const onImputChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;

      case "category":
        setCategory(e.target.value);
        break;

      case "price":
        setPrice(e.target.value);
        break;
    }
  };

  const onsubmit = () => {
    if (!file.name) {
      alert("No Image Selected");
      return;
    }
    const data = new FormData();
    data.append("photo", file);
    data.append("name", name);
    data.append("category", category);
    data.append("price", price);
    data.append("resturant_id", "RES77110");
    Axios.post("https://scankar.herokuapp.com/api/v1/products", data).then(
      (resp) => {
        if ((resp.data.status = "Success")) {
          swal("Added!", "Menu Item Succesfully Added", "success").then(() => {
            setName("");
            setFile({});
            setCategory("");
            setPrice("");
          });
        }
      }
    );
  };

  return (
    // <Fragment>
    <div>
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
                    {seats.map((x) => (
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
                          onChange={(e) => onImputChange(e)}
                          value={name}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          id="price"
                          placeholder="Enter menu price"
                          onChange={(e) => onImputChange(e)}
                          value={price}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Category</Form.Label>
                        <Select
                          // defaultValue={}
                          options={CategoryOptions}
                          formatGroupLabel={formatGroupLabel}
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
                          style={{ width: "20%" }}
                          type="file"
                          placeholder="Enter menu Image"
                          onChange={(e) => uploadImage(e)}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Button variant="primary" onClick={() => onsubmit()}>
                      Submit
                    </Button>
                  </Form>
                  <div className="menu-card-grid">
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>

                    {/* <---------------- start fake cards----------------> */}

                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div class="ui card">
                      <div class="content">
                        {/* <div class="right floated meta">14h</div> */}
                        {/* <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
                        Shahi paneer
                      </div>
                      <div class="image">
                        <img src="https://i.ndtvimg.com/i/2016-09/tofu-625_625x350_61474273627.jpg" />
                      </div>
                      <div class="content">
                        <span class="right floated">
                          <i class="rupee sign icon"></i>
                          150
                        </span>
                        {/* <i class="list ul icon"></i> */}
                        Vegetarian
                      </div>
                      <div class="extra content">
                        {/* <div class="ui large transparent left icon input"> */}
                        {/* <i class="heart outline icon"></i>
      <input type="text" placeholder="Add Comment..."/> */}
                        <div class="ui bottom attached button" tabindex="0">
                          Bottom
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    {/* <---------------- end fake cards----------------> */}
                  </div>
                </div>
              );
            }}
          ></Route>

          <Sidebar />
        </div>
      </div>
      <ToastContainer />
      {/* </Fragment> */}
    </div>
  );
};

export default AppLayout;
