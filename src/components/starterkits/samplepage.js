import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';

import axios from "axios"

const Samplepage = (props) => {



  useEffect(() => {
    callOrders()
  } , []);

  const callOrders = () =>{
    axios.get("http://13.233.233.253:5000/api/v1/customer-order").then(res => {
      console.log(res)
      props.dispatch({
        type:"ADD_TO_ORDERS",
        payLoad : res.data.data.orders
      })
    })

  }

  const changeStatus = (id , status) =>{
    if(status == "Pending"){
      axios.patch(`http://13.233.233.253:5000/api/v1/customer-order/update-order/${id}` , {status : "Placed"}).then(resp=>{
     
        callOrders()
      
      })
    }
  }


  return (
    <Fragment>
      {/* <BreadCrumb parent="Home" subparent="Sample Page" title="Sample Page"/> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            {props.orders.map((order, index) => (

              <Card>
                <CardHeader>
                  <h5>User {index + 1} </h5>
                  {/* <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span> */}
                </CardHeader>
                <CardBody>
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
                    <p>Amount: ${order.price}</p>
                  </div>

                </CardBody>
                {props.buttonFunctional ? 
                <Button className="s-btn-extrnal-style" color={order.status == "Pending" ? "success" : "secondary"} onClick={()=>changeStatus(order["_id"] , order.status)} size="sm" block>{order.status == "Pending" ? "Mark As Completed" : "Completed"}</Button>
                : 
                <Button className="s-btn-extrnal-style" color="warning" size="sm" block disabled={true}>Pending</Button>
                
                }
                </Card>

            ))}

          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.Toggle.orders,
    buttonFunctional : state.Toggle.buttonFunctional
  }


}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Samplepage)