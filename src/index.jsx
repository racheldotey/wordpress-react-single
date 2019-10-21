import React from "react";
import { render } from "react-dom";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Import all brand icons
library.add(fab);

import 'bootstrap/dist/css/bootstrap.css';
// Import index styles which contains variables used in other style sheets
import './index.scss';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";
import Blog from "./pages/blog/blog";
import Home from "./pages/home/home";
import Post from "./pages/post/post";
import Page from "./pages/page/page";
import NotFound from "./pages/not-found/not-found";

// Imported here so that Webpack will copy them to dist
import Favicon from "./images/favicon.ico";
import IndexLoader from "./images/loader-ring-large.gif";

// Browser history
const history = createBrowserHistory();
/*
history.listen((location, action) => {
  console.log("INDEX.jsx history.listen location.hash = ", location.hash);
});
*/

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div id="page-inner" className="d-flex flex-column h-100">
        <Header />
        <main id="content">
        <Link to="#top">#bottom</Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog/:slug" component={Post} />
            <Route exact path="/:slug" component={Page} />
            <Route path="*" component={NotFound} />
          </Switch>
        <Link to="#bottom">#bottom</Link>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  };
}

// Routes
const routes = (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
);

render(routes, document.getElementById("page"));
