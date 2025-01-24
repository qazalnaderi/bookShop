import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>A book is a dream that you hold in your hands</p>
                    <div className="footer-social">
                        <img src={assets.facebook} alt="" />
                        <img src={assets.telegram} alt="" />
                        <img src={assets.twitter} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About US</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                <h2>Get In Touch</h2>
                    <ul>
                        <li>+98-911-657-4789</li>
                        <li>contact@WhisperOfWords.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">copyright 2024</p>
        </div>
    )
}

export default Footer
