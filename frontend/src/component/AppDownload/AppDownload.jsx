import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For a better experience, download the <br/> Book App</p>
      <div className="app-download-platforms">
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <img src={assets.GooglePlayStore} alt="Google Play Store" />
        </a>
        <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.appstore} alt="App Store" />
        </a>
      </div>
    </div>
  );
}

export default AppDownload;
