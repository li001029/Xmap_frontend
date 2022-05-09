import React from 'react';
import './Footer.css';


function Footer() {
  return (
    <div className='footer-container'>
          <div class='social-icons'>
          <a href="https://www.facebook.com/jiafeng.li.7503" class='social-icon-link' target="_blank" rel="noopener noreferrer" aria-label='Facebook'>
            <i className='fab fa-facebook-f' /></a>
            <a href="https://www.instagram.com/jf.leeeee/" class='social-icon-link' target="_blank" rel="noopener noreferrer" aria-label='Instagram'>
            <i className='fab fa-instagram' /></a>
            <a href="https://www.linkedin.com/in/jfli?trk=public_profile_browsemap_profile-result-card_result-card_full-click" class='social-icon-link' target="_blank" rel="noopener noreferrer" aria-label='Linkedin'>
            <i className='fab fa-linkedin' /></a>
           
          </div>
        </div>
  );
}

export default Footer;
