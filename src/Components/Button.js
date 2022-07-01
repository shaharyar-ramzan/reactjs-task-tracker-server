import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <button 
        onClick={props.onClick}
        style={{backgroundColor: props.color}}
        className={`btn ${props.classes}`}
        id={props.id}
    >{props.text}</button>
  )
}
Button.defaultTypes = {
    text: 'Button Text',
    color: 'stealblue',
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button