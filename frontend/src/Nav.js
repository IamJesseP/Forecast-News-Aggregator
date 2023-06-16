import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './styles.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArticleIcon from '@mui/icons-material/Article';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'nav open' : 'nav'}>
      <div className="nav-container">
        <div className="nav-item-wrapper">
          <Link
            to="weather"
            activeClass="active"
            smooth={true}
            spy={true}
            offset={-50}
            className="nav-item">
            <WbSunnyIcon />
          </Link>
        </div>
        <div className="nav-item-wrapper">
          <Link
            to="news"
            activeClass="active"
            smooth={true}
            spy={true}
            offset={0}
            className="nav-item">
            <ArticleIcon />
          </Link>
        </div>
        <div className="nav-item-wrapper">
          <Link
            to="sms"
            activeClass="active"
            smooth={true}
            spy={true}
            offset={0}
            className="nav-item">
            <PhoneIphoneIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}
