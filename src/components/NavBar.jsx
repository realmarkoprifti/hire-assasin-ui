import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './scss/navbar.scss'

function NavBar() {
  return (
    <nav className='navbar'>
        <h2>Hire an Assasin</h2>
        <motion.button whileHover={{backgroundColor:"rgb(37, 115, 154)"}}><Link to="/">Home</Link></motion.button>
        <motion.button whileHover={{backgroundColor:"rgb(37, 115, 154)"}}><Link to="/track-assasination">Track Assasination</Link></motion.button>
        <motion.button whileHover={{backgroundColor:"rgb(37, 115, 154)"}}><Link to="/hits">All Hits</Link></motion.button>
    </nav>
  )
}

export default NavBar;