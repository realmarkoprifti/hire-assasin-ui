import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { place_order, recaptcha } from './api_requests';
import { useState } from 'react';
import ReCaptcha from 'react-google-recaptcha'
import { useRef, useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';


function PlaceOrder(props) {
  const [track_num, setTrackNum] = useState(0)
  const [spinner, setSpinner] = useState(false)
  const recaptchaRef = useRef()

  function CheckoutForm() {

    return (
      <Form className="place-order-form" onSubmit={(event) => {
        event.preventDefault()

        setSpinner(true)

        place_order(props.assasin, document.querySelector("#target").value, recaptchaRef.current.getValue())
        .then(data => {
          setTrackNum(JSON.parse(JSON.stringify(data)).track_number)
        })

      }}>
        <Row className="mb-3">
          <Form.Group as={Col} className='mb-2' controlId="formGridTargetFullName">
            <Form.Label>Target</Form.Label>
            <Form.Control id="target" type="text" placeholder="Enter target full name" required />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Send the money to this Bitcoin address </Form.Label>
          <Form.Control type='text' value={props.btcAddress} readOnly />
          <Form.Text className="text-muted">
            You'll receive the tracking code on the next screen.
        </Form.Text>
        </Form.Group>
        <ReCaptcha sitekey='6LfPPj0mAAAAAO080bTssEfY_IzszIEJz0COlsd6' ref={recaptchaRef} onChange={() => console.log(recaptchaRef.current.getValue())}/>
        <Button className='submit-btn' variant="primary" type="submit" style={{width:"100%", marginTop:"20px"}}>
            { spinner ? <Spinner animation="border" variant="light" /> : "Go Ahead"}
        </Button>        
      </Form>
    )
  }

  function DisplayTrackNum(props) {
    return <h4>Your tracking number is: {props.track_num}</h4>
  }

  return (
    <div className="place-order">
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Place your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {track_num > 0 ? <DisplayTrackNum track_num={track_num} /> : <CheckoutForm />}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PlaceOrder