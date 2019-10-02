import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerMenu: [
        {
          ID: 0,
          order: 1,
          parent: 0,
          title: "Home",
          url: ThemeVariables.URL.root,
          target: "",
          classes: "",
          type: "page",
          children: []
        }
      ]
    };
  }

  componentDidMount() {
    this.getFooterMenu();
  }

  getFooterMenu() {
    fetch(ThemeVariables.URL.apitheme + "menu/footer-menu")
      .then(res => res.json())
      .then(results => {
        this.setState({ footerMenu: results });
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  render() {
    return (
      <footer id="site-footer">
        <div className="footer-content">
          <div className="container">Add footer widgets</div>
        </div>

        <div className="footer-nav">
          <div className="container text-center">
            <ul className="list-inline">
              {this.state.footerMenu.map(item => (
                <li key={item.ID} className="list-inline-item">
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container">
            Copyright &copy; 2012-{new Date().getFullYear()}{" "}
            <Link to={ThemeVariables.URL.api + "/about/contact"}>
              {ThemeVariables.title}
            </Link>{" "}
            | Theme Powered By React.js
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
