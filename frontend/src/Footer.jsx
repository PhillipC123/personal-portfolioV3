import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer id="footer" className="text-center p-3 mt-5">
      <p>© {new Date().getFullYear()} My Portfolio. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;