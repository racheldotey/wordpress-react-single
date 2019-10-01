import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Posts from "./pages/blog/blog";
import Post from "./pages/post/post";
import Page from "./pages/page/page";
import NotFound from "./pages/not-found/not-found";

const App = () => (
  <div id="page-inner">
    <Header />
    <main id="content">
      <Switch>
        <Route exact path={ThemeVariables.path} component={Posts} />
        <Route exact path={ThemeVariables.path + "posts/:slug"} component={Post} />
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