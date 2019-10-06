import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Import all brand icons
library.add(fab);

import 'bootstrap/dist/css/bootstrap.css';
// Import index styles which contains variables used in other style sheets
import './index.scss';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Blog from "./pages/blog/blog";
import Home from "./pages/home/home";
import Post from "./pages/post/post";
import Page from "./pages/page/page";
import NotFound from "./pages/not-found/not-found";

// Imported here so that Webpack will copy them to dist
import Favicon from "./images/favicon.ico";
import IndexLoader from "./images/loader-ring-large.gif";

const App = () => (
  <div id="page-inner">
    <Header />
    <main id="content">
      <Switch>
        <Route exact path={ThemeVariables.path} component={Home} />
        <Route exact path={ThemeVariables.path + "blog"} component={Blog} />
        <Route exact path={ThemeVariables.path + "blog/:slug"} component={Post} />
        <Route exact path={ThemeVariables.path + ":slug"} component={Page} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
    <Footer />
  </div>
);

// Routes
const routes = (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

render(routes, document.getElementById("page"));
