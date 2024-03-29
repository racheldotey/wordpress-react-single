import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Placeholder from "../../images/placeholder.jpg";
import LoadingIcon from "../../images/loader-bar-small.gif";

import './post-list.scss';

class PostList extends React.Component {
  renderPosts() {
    return this.props.posts.map((post, i) => {
      return (
        <article className="col-sm-12 col-md-6 col-lg-4 card-outer" key={i}>
          <div className="card">
            <div className="img-outer">
              <Link to={post.slug}>
                <img
                  className="card-img-top"
                  src={
                    post.featured_image_src
                      ? post.featured_image_src
                      : Placeholder
                  }
                  alt="Featured Image"
                />
              </Link>
            </div>
            <div className="card-body">
              <h4 className="card-title">
                <Link to={post.slug}>{post.title.rendered}</Link>
              </h4>
              <p className="card-text">
                <small className="text-muted">
                  {post.author_name} &ndash; {post.published_date}
                </small>
              </p>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </div>
          </div>
        </article>
      );
    });
  }

  renderEmpty() {
    return (
      <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
    );
  }

  render() {
    if (!this.props.posts) {
      return null;
    }

    return (
      <div className="posts-container row">
        {this.props.posts.length ? this.renderPosts() : this.renderEmpty()}
      </div>
    );
  }
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};
