import "./Herosection.css";
import { Search } from "./Search";
import { useState } from "react";

function Herosection() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div id="hero-section">
      <div className="content-holder">
        <div className="col1">
          <h1>Your Kitchen, Your Plan,</h1>
          <h1>Your Way.</h1>

          <div className="search">
            <button className="searchbtn" onClick={() => setShowSearch(true)}>Search</button>
          </div>
        </div>

      </div>

     {showSearch ? <Search setShowSearch={setShowSearch} /> : null}
    </div>
  );
};

export default Herosection;