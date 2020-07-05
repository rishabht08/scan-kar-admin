import React from 'react'
import { Row, Col, Container} from 'reactstrap'
const Footer = () => {
    return (
        <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="6" className="footer-copyright">
              <p className="mb-0">Copyright 2020 © Creative All rights reserved.</p>
            </Col>
            <Col md="6" >
              <p className="pull-right mb-0">Hand crafted & made with<i className="fa fa-heart"></i></p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
}

export default Footer
