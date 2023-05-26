import React from 'react'
import './scss/home.scss'
import { motion } from 'framer-motion'
import Card from './Card'
import { useState, useEffect } from 'react'
import { get_assasins } from './api_requests'
import PlaceOrder from './PlaceOrder'


function Home() {
  const [assasins, setAssasins] = useState([])
  const [placeOrder, setPlaceOrder] = useState(false)
  const [address, setAddress] = useState("")
  const [assasin, setAssasin] = useState(0)

  useEffect(() => {
    get_assasins()
    .then(data => {
        data.map(assasin => {
          setAssasins(assasins => [...assasins, assasin])
        })
    })
  }, [])


  return (
    <>
      {placeOrder && <PlaceOrder show={placeOrder} onHide={() => {setPlaceOrder(false)}} btcAddress={address} assasin={assasin} />}
      <div className="home">
        <motion.div className="title" animate={{scale: [0, 1.1, 1.1]}} transition={{duration: 2}}>
          <h1>These are our top assasins</h1>
          <span>Feel free to pick the best for your needs.</span>
        </motion.div>
        <div className="assasins">
          {assasins.map(assasin => {
            return <Card key={assasin['id']} name={assasin['user']} hits={assasin['hit_number']} price={assasin['starting_price']} onClick={(event) => {setPlaceOrder(true); setAddress(assasin["btc_address"]); setAssasin(assasin["user"])}} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home