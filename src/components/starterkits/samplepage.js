import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import "./sample.css"

import axios from "axios"

const Samplepage = (props) => {



  useEffect(() => {
    callOrders()
  }, []);

  const callOrders = () => {
    axios.get("https://scankar.herokuapp.com/api/v1/customer-order").then(res => {
      console.log(res)
      props.dispatch({
        type: "ADD_TO_ORDERS",
        payLoad: res.data.data.orders
      })
    })

  }

  const changeStatus = (id, status) => {
    if (status == "Pending") {
      axios.patch(`https://scankar.herokuapp.com/api/v1/customer-order/update-order/${id}`, { status: "Placed" }).then(resp => {

        callOrders()

      })
    }
  }


  return (
    <Fragment>
      {/* <BreadCrumb parent="Home" subparent="Sample Page" title="Sample Page"/> */}

      <Container fluid={true}>
        {!props.showPage &&
        <table className="ui purple table totalSale" style = {{width:"80%" , "margin-top":"18%" , "margin-left":"10%"}}>
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
              <td><i className="rupee sign icon"></i>{props.dineInSale}</td>
            </tr>

            <tr>
              <td>Take Away</td>
              <td>{props.takeAwayTotal}</td>
              <td><i className="rupee sign icon"></i>{props.takeAwaySale}</td>
            </tr>

          </tbody>
        </table>
}
        {props.showPage &&
          <Row>
            <Col sm="12">
              {props.orders.map((order, index) => (
                <div className="grid-addjust">

                  <Card>
                    {/* <CardHeader>
                  <h5>Table No. {index + 1} </h5>
             
                </CardHeader> */}
                    <CardBody style={{ "background-color": "#ffffff" }}>
                      <a style={{ marginLeft: "15px" }} class="ui orange right ribbon label">{order.orderType == "Dine In" ? `Dinein / ${order.noOfSeatsRequested}` : "Take away"}</a>
                      <h5>Ordered Items</h5>
                      {order.orders.map(order => (
                        <div>
                          <div className="flexrow">
                            <div>
                              <p><b>{order.item}</b></p>
                              <p>Quantity: {order.quantity}</p>
                            </div>
                            <div>
                              {/* <p>${order.price}</p> */}
                            </div>
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

                    </CardBody>
                    {props.buttonFunctional ?
                      <Button className="s-btn-extrnal-style" color={order.status == "Pending" ? "success" : "secondary"} onClick={() => changeStatus(order["_id"], order.status)} size="sm" block>{order.status == "Pending" ? "Mark As Completed" : "Completed"}</Button>
                      :
                      <Button className="s-btn-extrnal-style" color="warning" size="sm" block disabled={true}>Pending</Button>

                    }
                  </Card>
                </div>

              ))}

            </Col>
          </Row>
        }
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.Toggle.orders,
    takeAwaySale: state.Toggle.takeAwaySale,
    takeAwayTotal: state.Toggle.takeAwayTotal,
    dineInSale: state.Toggle.dineInSale,
    dineInTotal: state.Toggle.dineInTotal,
    showPage: state.Toggle.showPage,
    buttonFunctional: state.Toggle.buttonFunctional
  }


}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Samplepage)