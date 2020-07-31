import React, { Fragment, useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Route } from "react-router-dom";
import Loader from "../layout/Loader";
import { Switch } from "antd";
import "./app.css";
import {
  Button,
  Form,
  Col,
  Table,
  DropdownButton,
  DropdownItem,
} from "react-bootstrap";
import "../assets/css/app.css";
import shopData from "../dummy-shop-data.json";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

import { ToastContainer } from "react-toastify";
import Sample from "../components/starterkits/samplepage";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
// import { Segment, Checkbox, Form  } from 'semantic-ui-react'
import Select from "react-select";
import Axios from "axios";
import swal from "sweetalert";
import { Dropdown } from "semantic-ui-react";
import Toggle from "react-toggle";
import Modal from "../common/modal";

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
  const [category, setCategory] = useState("BURGER");

  const [price, setPrice] = useState([]);
  const [file, setFile] = useState({});
  const [seats, setSeats] = useState([]);
  const [menu, setMenu] = useState([]);
  const [optionsValue, setOptions] = useState([]);
  const [modal, setModal] = useState(false);
  const [menuFile, setMenuFile] = useState(null);

  const options = [
    { value: "milkType", label: "milkType" },
    { value: "size", label: "size" },
    { value: "quantity", label: "quantity" },
    { value: "decaf", label: "decaf" },
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
    loadMenu();
  }, []);

  const loadMenu = () => {
    Axios.get("https://scankar.herokuapp.com/api/v1/products").then((res) => {
      setMenu(res.data.data.products.reverse());
    });
  };

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

  const storeOptions = (e) => {
    if (e) {
      let arr = [];
      e.forEach((item) => {
        arr.push(item.value);
      });
      console.log("options", arr);
      setOptions(arr);
    } else {
      setOptions([]);
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
    data.append("options", optionsValue);
    Axios.post("https://scankar.herokuapp.com/api/v1/products", data).then(
      (resp) => {
        if ((resp.data.status = "Success")) {
          swal("Added!", "Menu Item Succesfully Added", "success").then(() => {
            setName("");
            setFile({});
            setCategory("");
            setPrice("");
            loadMenu();
          });
        }
      }
    );
  };

  const changeAvailability = (e, status, id) => {
    if (status == "Available") {
      swal({
        title: "Are you sure?",
        text: "This Will make this item unavailable",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          Axios.patch(`https://scankar.herokuapp.com/api/v1/products/${id}`, {
            status: "unAvailable",
          }).then(() => {
            loadMenu();
          });
        }
      });
    } else {
      Axios.patch(`https://scankar.herokuapp.com/api/v1/products/${id}`, {
        status: "Available",
      }).then(() => {
        loadMenu();
      });
    }
  };

  const deleteItem = (id) => {
    Axios.delete(`https://scankar.herokuapp.com/api/v1/products/${id}`).then(
      () => {
        loadMenu();
      }
    );
  };

  const showModal = () => {
    setModal(true);
  };

  const menuUpload = () => {
    return (
      <div>
        <span>Sequence of menu details in .CSV file</span>
        <br></br>
        <span>
          <b>Name----Category----Price</b>
        </span>
        <input
          type="file"
          onChange={(e) => setMenuFile(e.target.files[0])}
          style={{ padding: "10px" }}
          accept=".csv"
        />
      </div>
    );
  };

  const uploadAll = () => {
    if (!menuFile) {
      alert("No CSV File Chosen");
      return;
    }
    let fileObj = menuFile;

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        alert(err);
      } else {
        console.log("File obj", resp.rows);
        let products = [];
        let data = {};
        resp.rows.forEach((item) => {
          data.name = item[0];
          data.category = item[1];
          data.price = parseInt(item[2]);
          data.rating = 4.5;
          data.photo =
            "https://res.cloudinary.com/dvetb04ra/image/upload/v1595283891/qqmliaurpz3dk9qsezcn.jpg";
          data.resturant_id = "RES7711000";
          data.options = ["quantity"];

          products.push(data);
          data = {};
        });
        Axios.post(
          "https://scankar.herokuapp.com/api/v1/products/uploadinbulk",
          { products }
        ).then((res) => {
          console.log("Bul uploaded", res);
          loadMenu();
        });
      }
      setModal(false);
    });
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
                <div>
                  <Header />
                  <div className="generate">
                    <div className="shopdetails">
                      <span>
                        <b>{localStorage.getItem("ownertype") != "hotelowner" ?"Restaurant" :"Hotel"}</b> : {shop.name}
                      </span>
                      <p>
                        <b>Place </b> : {shop.vicinity}
                      </p>
                    </div>
                    {localStorage.getItem("ownertype") != "hotelowner" ? (
                      <div>
                        <Button variant="primary" onClick={() => dineInGen()}>
                          Generate For DineIn
                        </Button>{" "}
                        <Button
                          variant="secondary"
                          onClick={() => takeAwayGen()}
                        >
                          Generate for TakeAway
                        </Button>{" "}
                      </div>
                    ) : (
                      <Button variant="primary" onClick={() => dineInGen()}>
                        Generate For Hotel Rooms
                      </Button>
                    )}
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
                </div>
              );
            }}
          ></Route>

          <Route
            exact
            path="/addmenu"
            render={() => {
              return (
                <div>
                  <Header />
                  <div className="generate">
                    {/* <Segment>Pellentesque habitant morbi tristique senectus.</Segment> */}

                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
                            placeholder="Enter item name"
                            onChange={(e) => onImputChange(e)}
                            value={name}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            id="price"
                            placeholder="Enter price"
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
                            onChange={(e) => setCategory(e.label)}
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
                            onChange={(e) => storeOptions(e)}
                            id="options"
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Menu Item Image</Form.Label>
                          <Form.Control
                            style={{ width: "40%" }}
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
                    <p style={{ fontSize: "20px" }}>
                      Upload Menu from .Csv file
                    </p>
                    <Button variant="warninig" onClick={() => showModal()}>
                      Bulk Menu Upload
                    </Button>
                    <Modal
                      show={modal}
                      setModal={() => setModal(false)}
                      modalBody={menuUpload()}
                      uploadAll={() => uploadAll()}
                    />
                    <div className="menu-card-grid">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>

                            <th>Category</th>
                            <th>Availability</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {menu.map((item, index) => (
                            <tr>
                              <td>{item.name}</td>
                              <td>
                                <i className="rupee sign icon"></i>
                                {item.price}
                              </td>
                              <td>{item.category}</td>
                              <td style={{ "padding-left": "3%" }}>
                                <Switch
                                  checked={item.status == "Available"}
                                  size="small"
                                  onChange={(e) =>
                                    changeAvailability(e, item.status, item._id)
                                  }
                                />{" "}
                              </td>
                              <td style={{ cursor: "pointer" }}>
                                <i
                                  className="fa fa-trash fa-2x"
                                  aria-hidden="true"
                                  onClick={() => deleteItem(item._id)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {/* <---------------- end fake cards----------------> */}
                    </div>
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
