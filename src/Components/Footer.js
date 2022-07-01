import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <h4>Copyright &copy; 2022</h4>
        <Link to="/about">About us</Link>
    </footer>
  )
}

export default Footer