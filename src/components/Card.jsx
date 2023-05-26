import React from 'react'
import './scss/card.scss'
import { motion } from 'framer-motion'
import PlaceOrder from './PlaceOrder'

function Card(props) {
  let price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <motion.div className="card" animate={{scale: [0, 1]}} transition={{duration: 2}}>
        <motion.h5 whileHover={{ scale:1.01 }}>Name: {props.name}</motion.h5>
        <motion.h5 whileHover={{ scale:1.01 }}>Number of Assasinations: {props.hits}</motion.h5>
        <motion.h5 whileHover={{ scale:1.01 }}>Price: {price.format(props.price).replace(".00", "")}</motion.h5>
        <hr />
          <motion.button className='pay-button' whileHover={{ backgroundColor:"transparent", color: "rgb(18, 158, 18)", border:"1px solid rgb(18, 158, 18)" }} onClick={props.onClick}>Hire Me</motion.button>
    </motion.div>
  )
}

export default Card