// Framework
import React from "react";

const Header = ({ children, goBack }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    
    <h1>
      {children}
    </h1>

    <button onClick={() => console.log('login button')} className="login-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Login" src={`/icon/header/avatar.svg`} />
    </button>
    <button onClick={() => console.log('cart button')} className="cart-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Login" src={`/icon/header/shopping-cart.svg`} />
    </button>
    <div className="right-content" />
    
    

  </header>;

export default Header;
