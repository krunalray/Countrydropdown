import React from "react";

const Header = () => {
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 sticky-top" id="header-nav">
          <div className="container">
            <p className="align-items-center mb-3 mb-md-0 text-center text-decoration-none">
              <span className="fs-4">REST Countries API</span>
            </p>            
          </div>
      </header>
    );
}

export default Header;