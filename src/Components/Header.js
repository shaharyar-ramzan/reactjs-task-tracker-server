import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Link } from 'react-router-dom'
import Button from './Button'

const Header = (props) => {
    /*const onClickBtn = () => {
        console.log('btn clicked');
    }*/
    const location = useLocation();
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' ? <Button 
                classes='btn-primary'
                color={props.showForm ? 'red' : 'green'}
                text={props.showForm ? 'Cancel' : 'Add'} 
                onClick={props.onAdd} /> : <Link className='btn btn-primary' to="/">Go Back</Link>}
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

Header.defaultProps = {
    title: 'Task Tracker',
}
/*
const headingStyles = {
    color: 'red',
    backgroundColor: 'black'
}
*/
export default Header