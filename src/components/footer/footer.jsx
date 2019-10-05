import React from "react";
import { Link } from "react-router-dom";
import SloganRotator from "../slogan-rotator/slogan-rotator.jsx";

import "./footer.scss";

import Facebook from "../../images/socialicon-facebook.png";
import LinkedIn from "../../images/socialicon-linkedin.png";
import StackOverflow from "../../images/socialicon-stackoverflow.png";
import GitHub from "../../images/socialicon-github.png";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slogans: [
        "Let's build<br/>something great",
        "Love the hustle",
        "Fresh code baked daily",
        "Click me!",
        "Code really is poetry",
        "Talk is cheap<br/>Show me the code",
        "I speak software",
        "Click me!",
        "Code for computers<br/>Design for humans",
        "Web master since 1999",
        "Believe<br/>in the algorithm",
        "Click me!",
        "I am not a robot"
      ],
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
      ] /*
      footerSidebar: {
        name: "Footer Sidebar",
        id: "footer-sidebar",
        description: "Widget area to appear in the footer area.",
        class: "footer-sidebar",
        before_widget: "<div className='widget-container'>",
        after_widget: "</div>",
        before_title: "<h5 className='widget-title'>",
        after_title: "</h5>",
        rendered: "<div></div>"
      } */
    };
  }

  componentDidMount() {
    this.getFooterMenu();
    //this.getFooterSidebar();
  }

  getFooterSidebar() {
    fetch(ThemeVariables.URL.apitheme + "sidebars/footer-sidebar")
      .then(res => res.json())
      .then(results => {
        this.setState({ footerSidebar: results });
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  getFooterMenu() {
    fetch(ThemeVariables.URL.apitheme + "menus/footer-menu")
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

  renderFooterSidebar = () => {
    return (
      <div
        className={this.state.footerSidebar.class}
        dangerouslySetInnerHTML={{
          __html: this.state.footerSidebar.rendered
        }}
      ></div>
    );
  };

  render() {
    return (
      <footer id="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <p className="footer-slogan">
                <SloganRotator sloganArray={this.state.slogans} seconds="3" />
              </p>
            </div>

            <div className="col-9">
              <div className="row">
                <div className="col">
                  <h3 className="call-to-action">
                    I collaborate with ambitious business and people.
                    <br />
                    Lets build something great together.
                  </h3>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p className="contact-header">Start a conversation</p>
                  <p className="contact-phone">607.386.5872</p>
                  <p className="contact-email">
                    <a href="mailto:hello@racheldotey.com">
                      hello@racheldotey.com
                    </a>
                  </p>
                </div>

                <div className="col social-list">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a
                        href="https://www.facebook.com/rachelldotey"
                        target="_blank"
                        alt="Find me on Facebook"
                      >
                        <img src={Facebook} alt="Find me on Facebook" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/racheldotey/"
                        target="_blank"
                        alt="Find me on LinkedIn"
                      >
                        <img src={LinkedIn} alt="Find me on LinkedIn" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://stackoverflow.com/users/1024313/racheld"
                        target="_blank"
                        alt="Find me on Stack Overflow"
                      >
                        <img
                          src={StackOverflow}
                          alt="Find me on Stack Overflow"
                        />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://github.com/racheldotey"
                        target="_blank"
                        alt="Find me on GitHub"
                      >
                        <img src={GitHub} alt="Find me on GitHub" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <div className="footer-copyright">
                <p>
                  &copy; 2012-{new Date().getFullYear()}{" "}
                  <Link to="/#home">
                    {ThemeVariables.title}
                  </Link>{" "}
                  <br />
                  Powered By React.js
                </p>
                <p>
                  <Link to="/policies">
                    Website Policies
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-9">
              <div className="row">
                <div className="col footer-nav">
                  <ul className="list-inline">
                    {this.state.footerMenu.map(item => (
                      <li key={item.ID} className="list-inline-item">
                        <Link to={item.url}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
