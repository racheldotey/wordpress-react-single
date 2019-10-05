import React from "react";
import Blog from "../blog/blog";
import Page from "../page/page";

import "./home.scss";

class Home extends React.Component {
  renderBlog() {
    return <Blog />;
  }

  renderPage(ID) {
    return <Page pageid={ID} />;
  }

  render() {
    return ThemeVariables.show_on_front === "posts"
      ? this.renderBlog()
      : this.renderPage(ThemeVariables.page_on_front);
  }
}

export default Home;
