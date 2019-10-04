import React from "react";
import NotFound from "../not-found/not-found";

import "./page.scss";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    if (this.props.pageid) {
      this.fetchByID(this.props.pageid);
    } else if (this.props.pageslug) {
      this.fetchBySlug(this.props.pageslug);
    } else{
      let url = window.location.href.split("/");
      let slug = url.pop() || url.pop();
      this.fetchBySlug(slug);
    }
  };

  fetchByID = (id) => {
    fetch(`${ThemeVariables.URL.api}pages/${id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ page: res });
      });
  };

  fetchBySlug = (slug) => {
    fetch(`${ThemeVariables.URL.api}pages?slug=${slug}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ page: res[0] });
      });
  };

  renderPage() {
    if (this.state.page.title) {
      return (
        <article className="page">
          <div className="page-header">
            <h1 className="page-title">{this.state.page.title.rendered}</h1>
          </div>
          <div className="page-body" dangerouslySetInnerHTML={{__html: this.state.page.content.rendered}} />
        </article>
      );
    } else {
      this.renderEmpty();
    }
  }

  renderEmpty() {
    return <NotFound />;
  }

  render() {
    console.log("this.state.page", this.state.page);
    return (
      <div className="container post-entry">
        {this.state.page ? this.renderPage() : this.renderEmpty()}
      </div>
    );
  }
}

export default Page;
