import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StorContext } from '../../context/StorContext';

const Navbar = ({ setShowLogin }) => {
    const [list, setList] = useState("Home");
    const { getTotalCartAmount, cartItems } = useContext(StorContext); 

    const totalItemsInCart = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt="" className="logo" />
            </Link>
            <ul className='navbar-list'>
                <Link 
                    to='/' 
                    onClick={() => setList("Home")} 
                    className={list === "Home" ? "active" : ""}
                >
                    Home
                </Link>
                <a 
                    href='#explore-list' 
                    onClick={() => setList("Book List")} 
                    className={list === "Book List" ? "active" : ""}
                >
                    Book List
                </a>
                <a 
                    href='#app-download' 
                    onClick={() => setList("Mobile App")} 
                    className={list === "Mobile App" ? "active" : ""}
                >
                    Mobile App
                </a>
                <a 
                    href='#footer' 
                    onClick={() => setList("Contact Us")} 
                    className={list === "Contact Us" ? "active" : ""}
                >
                    Contact Us
                </a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search} alt="" />
                <div className='navbar-search'>
                    <Link to='/cart'>
                        <img src={assets.bag} alt="" />
                    </Link>
                    {totalItemsInCart > 0 && <div className="dot"></div>}
                </div>
                <button onClick={() => setShowLogin(true)}>sign in</button>
            </div>
        </div>
    );
};

export default Navbar;
