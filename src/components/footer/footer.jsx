import React from "react";

import './footer.scss';

const Footer = () => (
  <footer id="colophon" className="container">
    <div className="card-footer text-center bg-transparent border-primary">
      
    </div>
    <div class="site-footer copyright text-center">
    <p>&copy; 2012-{new Date().getFullYear()} <a href='{ThemeVariables.URL.api}/about/contact'>get_bloginfo('name')</a> All Rights Reserved. | Theme by Rachel Dotey</p>
    </div>
  </footer>
);

export default Footer;