import React from "react";

class SloganRotator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class: props.className ? props.className : "slogan-rotator",
      displayID: props.displayID ? parseInt(props.displayID) : 0,
      milliseconds: props.seconds ? (parseInt(props.seconds)*1000) : 3000,
      slogans: props.sloganArray
        ? props.sloganArray
        : ["Slogan array not provided", "Click me!", "Property slogan array not set"]
    };
  }

  componentDidMount() {
    this.startSloganRotator();
  }

  componentWillUnmount() {
    this.stopSloganRotator();
  }

  startSloganRotator = () => {
    this.timer = setInterval(this.rotateSlogan, this.state.milliseconds);
  };

  stopSloganRotator = () => {
    clearInterval(this.timer);
  };

  rotateSlogan = () => {
    let i = this.state.displayID+1;
    this.setState({displayID: (i >= this.state.slogans.length) ? 0 : i});
  };

  sloganClickEvent = () => {
    this.stopSloganRotator();
    this.rotateSlogan();
    this.startSloganRotator();
  };

  render() {
    return (
      <span className={this.state.class} onClick={this.sloganClickEvent}
      dangerouslySetInnerHTML={{
        __html: this.state.slogans[this.state.displayID]
      }}></span>
    );
  }
}

export default SloganRotator;
