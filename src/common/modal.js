import React , {useState , useRef, useEffect} from 'react';
import {Modal , Button} from "react-bootstrap";

let data = [
    {title: 'group 1', items: ['Videos', 'Notes', 'Classes' , 'Flash' , 'Saved' ]}
  ]


 const DragModal = (props) =>{

    const handleClose = () => props.setModal(false);
   

    return(
        <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
            {props.modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      <Button variant="primary" onClick={()=> props.uploadAll(!props.isEdit?"uploadAll":"isEdit")}>{!props.isEdit ? "Bulk Upload" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    )
}


export default DragModal;