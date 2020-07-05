import React, { Fragment, useState } from 'react';
// import BreadCrumb from '../../layout/Breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';

const Samplepage = (props) => {
  const [orders, setOrders] = useState([1, 1, 1, 1]);
  const [names, setNames] = useState([1, 1, 1, 1]);
  return (
    <Fragment>
      {/* <BreadCrumb parent="Home" subparent="Sample Page" title="Sample Page"/> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            {names.map(() => (

              <Card>
                <CardHeader>
                  <h5>Sample Card</h5>
                  {/* <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span> */}
                </CardHeader>
                <CardBody>
                  <h5>Ordered Items</h5>
                  {orders.map(order => (
                    <div>
                      <div className="flexrow">
                        <div>
                          <p>Order 1</p>
                          <p>Order 1</p>
                        </div>
                        <div>
                          <p>Amount</p>
                        </div>
                      </div>
                      <hr></hr>
                    </div>

                  ))}

                </CardBody>
                <Button color="success" size="lg" block>Mark As Completed</Button>
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
    orders: state.Toggle.orders
  }


}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Samplepage)