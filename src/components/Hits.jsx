import React from 'react'
import Table from 'react-bootstrap/Table'
import { motion } from 'framer-motion'
import { get_hits } from './api_requests'
import { useEffect, useState } from 'react'


function Hits() {
  let price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  const [hits, setHits] = useState([])

  useEffect(() => {
      get_hits()
      .then(data => {
        data.map(hit => {
          setHits(hits => [...hits, hit])
        })
      })
  }, [])

  return (
    <motion.div animate={{scale: [0, 1 ]}} transition={{duration: 0.5}}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Target</th>
              <th>Assasin</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {hits.map(hit => {
              return (
                <tr key={hit['id']}>
                  <td>{hit['target']}</td>
                  <td>{hit['hitman']}</td>
                  <td>{price.format(hit['price']).replace(".00", "")}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
    </motion.div>
  )
}

export default Hits