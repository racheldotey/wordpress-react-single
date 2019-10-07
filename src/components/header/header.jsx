import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerMenu: [
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
    this.getHeaderMenu();
  }

  getHeaderMenu() {
    fetch(ThemeVariables.URL.apitheme + "menus/header-menu")
      .then(res => res.json())
      .then(results => {
        this.setState({ headerMenu: results });
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  render() {
    return (
      <header className="site-header" role="banner">
        <div className="container">
          <Navbar variant="dark">
            <Navbar.Brand href={ThemeVariables.URL.root} className="site-brand">
              <span className="site-title" dangerouslySetInnerHTML={{ __html: ThemeVariables.title }}></span>
              <span className="site-tagline" dangerouslySetInnerHTML={{ __html: ThemeVariables.tagline }}></span>
            </Navbar.Brand>
            <Nav className="site-nav">
              {this.state.headerMenu.map(item => (
                <Nav.Link href={item.url} key={item.ID}>
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar>
        </div>
      </header>
    );
  }
}

export default Header;
