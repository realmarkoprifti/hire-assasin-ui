import React from 'react'
import Form from 'react-bootstrap/Form'
import './scss/track.scss'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { get_assasination_status } from './api_requests'
import ReCaptcha from 'react-google-recaptcha'


function TrackAssasination() {
  const [modal, setModal] = useState(false)
  const [status, setStatus] = useState("")
  const [error, setError] = useState()
  const recaptchaRef = useRef()

  function DisplayProgress(props) {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
            <Modal.Title>Track Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Status: {props.status}</h4>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div className="track">
      <DisplayProgress show={modal} onHide={() => setModal(false)} status={status} />
      <motion.form method='POST' onSubmit={(e) => {
        e.preventDefault()
        setError(false)
        get_assasination_status(document.querySelector("#track_number").value, recaptchaRef.current.getValue())
        .then(data => {
          switch (data["status"]) {
            case "created":
              setStatus(status => "Created 🔵")
              break
            case "no_payment":
              setStatus(status => "Hasn't Paid 🔴")
              break
            case "on_going":
              setStatus(status => "On-Going 🟠")
              break
            case "completed":
              setStatus(status => "Completed 🟢")
              break
          }

          setModal(true)
        })
        .catch(error => {
          e.target.reset()
          setError(true)
        })

      }} animate={error ? {x: [-20, 20, -20, 0]} : error || {x: [-1050, 0, 30, 0]}} transition={{duration:0.3}} onAnimationEnd={() => setError(false)}>
        <Form.Label>Enter Assassination ID</Form.Label>
        <Form.Control id="track_number" type='number' name='assasinationID' onInput={(event) => {event.target.value=event.target.value.slice(0,event.target.maxLength)}} maxLength={5} />
        <ReCaptcha sitekey='6LfPPj0mAAAAAO080bTssEfY_IzszIEJz0COlsd6' ref={recaptchaRef} onChange={() => console.log(recaptchaRef.current.getValue())} />
        <motion.input whileHover={{ backgroundColor:"transparent", color: "rgb(19, 130, 182)", border:"1px solid rgb(19, 130, 182)" }} type="submit" value="Get Status" />
      </motion.form>
    </div>
  )
}

export default TrackAssasination
