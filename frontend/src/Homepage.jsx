import React from "react";
import Weather from './Weather';

function Homepage() {
  return (
    <div className="container mt-4">
      <h1>Welcome to Phillip's Personal Portfolio!</h1>
      <p>Welcome to my personal portfolio! You will find various pages you can visit, such as the about page and portfolio page. Click one of the navigation buttons to redirect to the appropriate page.</p>
      <Weather/>
    </div>
  );
}

export default Homepage;
