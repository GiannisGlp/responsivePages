import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./AllPages.module.css";
import axios from "../../axios";
import Page from "../../components/Page/Page";
import FullPage from "../FullPage/FullPage";

class AllPages extends Component {
  state = {
    pages: [],
  };

  componentDidMount() {
    axios
      .get("/ResponsivePages")
      .then((response) => {
        const pages = response.data.slice();
        const updatedPages = pages.map((page) => {
          return {
            ...page,
          };
        });
        this.setState({ pages: updatedPages });
      })
      .catch((error) => {});
  }
  pageSelectedHandler = (id) => {
    this.props.history.push("/ResponsivePages/" + id);
  };

  render() {
    let pages = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      pages = this.state.pages.map((page) => {
        return (
          <Page
            key={page.id}
            title={page.title}
            description={page.description}
            isActive={page.isActive}
            publishedOn={page.publishedOn}
            pageId={page.id}
            pageType={page.type}
            clicked={() => this.pageSelectedHandler(page.id)}
          />
        );
      });
    }
    return (
      <Switch>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPage}
        />
        <section className={styles.Pages}>{pages}</section>
      </Switch>
    );
  }
}

export default AllPages;
