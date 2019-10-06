import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";

import "./scroll-to-top.scss";

class ScrollToTop extends React.Component {
  constructor(props) {
    super(props);
    this.scrollShowHeight = 100;
    this.state = {
      style: { display: "none" }
    };
  }

  componentDidMount() {
    this.scrollShowHeight = Math.round(window.innerHeight * 0.5);
    window.onresize = this.windowResizeEvent;
    window.onscroll = this.windowScrollEvent;
  }

  windowResizeEvent = e => {
    e.preventDefault();
    this.scrollShowHeight = Math.round(window.innerHeight * 0.5);
  };

  windowScrollEvent = e => {
    e.preventDefault();
    if (
      document.documentElement.scrollTop > this.scrollShowHeight ||
      document.body.scrollTop > this.scrollShowHeight
    ) {
      this.setState({
        style: { display: "block" }
      });
    } else {
      this.setState({
        style: { display: "none" }
      });
    }
  };

  actionScrollToTop = () => {
    console.log("Click > Scroll to top");
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // for older browsers
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <div
        id="scroll-to-top"
        onClick={this.actionScrollToTop}
        style={this.state.style}
      >
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
        <span className="screen-reader-text">Scroll to Top</span>
      </div>
    );
  }
}

export default ScrollToTop;
