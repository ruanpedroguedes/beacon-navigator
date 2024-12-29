import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__profile">
        <div className="profile__icon"></div>
      </div>
      <div className="header__search">
        <input type="text" placeholder="Buscar" className="search__input" />
        <button className="search__button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="header__settings">
        <button className="settings__button">
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
    </header>
  );
};

export default Header;
