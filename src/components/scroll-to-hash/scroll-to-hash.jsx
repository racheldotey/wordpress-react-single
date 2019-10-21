import React from "react";
import { Link } from "react-router-dom";

class ScrollToHash extends React.Component {
  constructor(props) {
    super(props);

    this.scrollPadding = 10;
    this.anchorElement = false;
  };

  componentDidMount() {
    // Set le location change event
    this.locationChangeEvent();
  };

  locationChangeEvent = () => {
    //e.preventDefault();
    // Get hash from url
    let hash = this.getLocationHash();
    if(this.doHashesMatch(hash, this.props.to)) {
      this.scrollIntoViewAction();
    } else {
      console.log("(Fail) They dont match - " + hash + " - " + this.props.to);
    }
  };

  doHashesMatch(hash1, hash2) {
    if(!hash1 || !hash2) {
      return false;
    } else if (hash1.toLowerCase().trim() == hash2.toLowerCase().trim()) {
    }
    return true;
  };

  getLocationHash = () => {
    let hash = window.location.hash;
    return (hash.length > 0) ? hash : false;
  };

  scrollIntoViewAction = () => {
    if(!this.anchorElement || this.anchorElement === null) {
      console.log("Return false");
      return false;
    }

    // Get element location
    let bounds = this.anchorElement.getBoundingClientRect();
    let top = bounds.top;

    // Go to that location
    top = (top > this.scrollPadding) ? top - this.scrollPadding : top;

    console.log("(Success) scroll to hash at = ", top);
    try {
      window.scroll({
        top: top,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // for older browsers
      window.scrollTo(0, top);
    }
  };

  setAnchorReference = (element) => {
    console.log("setAnchorReference", element);
    console.log("setAnchorReference this.props", this.props);
    console.log("setAnchorReference element.getBoundingClientRect", element.getBoundingClientRect());
    this.anchorElement = element;
  };

  // Headless component
  render() {
    return (<Link to={this.props.to} className="scroll-to-hash" ref={this.setAnchorReference}>{this.props.children}</Link>);
  };
}

export default ScrollToHash;
