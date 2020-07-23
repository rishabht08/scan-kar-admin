import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import { Table } from "react-bootstrap";

import { bindActionCreators } from 'redux';
import axios from "axios";
import * as Actions from "../../actions/actions"
import { connect } from "react-redux";
import "./sample.css";

// const fast2sms = require('fast-two-sms')
const API_KEY_SMS = "KucHqnUEg1iwNszrdGMoSF4x9ZPIhWv3QpB8lfa5JY7OADkyjb0IYWm7DF1XTBx5dUNAts4QORzZyGhw";

const Samplepage = (props) => {
  useEffect(() => {
    callOrders("Running");
  }, []);

  const callOrders = (type) => {

    props.actions.addOrders(type).then(res => {
      console.log("redux Save", res)
    })
  };

  const changeStatus = (id, status) => {
    let process = (status == "Accept") ? "Running" : status == "Reject" ? "Rejected" : "Completed";
    let message  = `Your Order is ${process}`
    let options = {authorization : API_KEY_SMS , message : message ,  numbers : ['9643710095']} 

    axios
      .patch(
        `https://scankar.herokuapp.com/api/v1/customer-order/update-order/${id}`,
        { process: process }
      )
      .then((resp) => {
        // fast2sms.sendMessage(options).then(res=>{
        //   // console.log("sent message" , res)

        // })
        callOrders(process);
      });

  };

  return (
    <Fragment>
      {/* <BreadCrumb parent="Home" subparent="Sample Page" title="Sample Page"/> */}

      <Container fluid={true}>
        {!props.showPage && (
          <Table responsive
               style={{
                width: "80%",
                "margin-top": "5%",
                "margin-left": "10%",
              }}
            >
              <thead>
                <tr>
                  <th>Order Type</th>
                  <th>Total Order</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dine In</td>
                  <td>{props.dineInTotal}</td>
                  <td>
                    <i className="rupee sign icon"></i>
                    {props.dineInSale}
                  </td>
                </tr>

                <tr>
                  <td>Take Away</td>
                  <td>{props.takeAwayTotal}</td>
                  <td>
                    <i className="rupee sign icon"></i>
                    {props.takeAwaySale}
                  </td>
                </tr>
              </tbody>
            </Table>
        )}
        {props.showPage && (
          <Row>
            <Col sm="12">
              {props.orders.map((order, index) => (
                <div className="grid-addjust">
                  <Card>
                    {/* <CardHeader>
                  <h5>Table No. {index + 1} </h5>
             
                </CardHeader> */}
                    <CardBody style={{ "background-color": "#ffffff" }}>
                      <a
                        style={{ marginLeft: "15px" }}
                        class="ui orange right ribbon label s-c-custome"
                      >
                        {order.orderType == "Dine In"
                          ? `Dinein / ${order.noOfSeatsRequested}`
                          : "Take away"}
                      </a>
                      <h4><b>{order.userName ? order.userName : ""}</b></h4>
                      <h5>Ordered Items</h5>
                      {order.orders.map((order) => (
                        <div>
                          <div className="flexrow">
                            <div>
                              <p>
                                <b>{order.item}</b>
                              </p>
                              <p>Quantity: {order.quantity}</p>
                            </div>
                            <div>{/* <p>${order.price}</p> */}</div>
                          </div>
                          <hr></hr>
                        </div>
                      ))}
                      <div>
                        {/* <p>Order Type: {order.orderType}</p>
                    {order.orderType == "Dine In" &&
                      <p>Table: {order.noOfSeatsRequested}</p>} */}
                        <p>Amount: Rs. {order.price}</p>
                      </div>
                    <p><b>Special Instructions:</b> {order.instruction == "" ? "None" : order.instruction}</p>
                    </CardBody>
                    {/* {props.buttonFunctional ? (
                      <Button
                        className="s-btn-extrnal-style"
                        color={
                          order.status == "Pending" ? "success" : "secondary"
                        }
                        onClick={() => changeStatus(order["_id"], order.status)}
                        size="sm"
                        block
                      >
                        {order.status == "Pending"
                          ? "Mark As Completed"
                          : "Completed"}
                      </Button>
                    ) : (
                        <Button
                          className="s-btn-extrnal-style"
                          color="warning"
                          size="sm"
                          block
                          disabled={true}
                        >
                          Pending
                        </Button>
                      )} */}
                    {order.process == "Pending" &&
                      <div className="flex-btn">
                        <Button
                          className="s-btn-extrnal-style"
                          color="success"
                          onClick={() => changeStatus(order["_id"], "Accept")}
                          size="sm"
                          style = {{width:"100%"}}

                        >
                          Accept
                      </Button>


                        <Button
                          className="s-btn-extrnal-style"
                          color="secondary"
                          onClick={() => changeStatus(order["_id"], "Reject")}
                          size="sm"
                          style = {{width:"100%"}}

                        >
                          Decline Order
                      </Button>

                      </div>}

                    {order.process == "Running" &&

                      <Button
                        className="s-btn-extrnal-style"
                        color="success"
                        onClick={() => changeStatus(order["_id"], "Completed")}
                        size="sm"

                      >
                        Add To Complete
                      </Button>}
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.Toggle.orders,
    takeAwaySale: state.Toggle.takeAwaySale,
    takeAwayTotal: state.Toggle.takeAwayTotal,
    dineInSale: state.Toggle.dineInSale,
    dineInTotal: state.Toggle.dineInTotal,
    showPage: state.Toggle.showPage,
    buttonFunctional: state.Toggle.buttonFunctional,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Samplepage);
