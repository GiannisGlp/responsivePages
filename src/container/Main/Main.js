import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import styles from "./Main.module.css";
import AllPages from "../AllPages/AllPages";
import asyncComponent from "../../hoc/asyncComponent";

const AsyncNewPage = asyncComponent(() => {
  return import("../NewPage/NewPage");
});

class Main extends Component {
  state = {
    auth: true,
  };

  render() {
    return (
      <div className={styles.Main}>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/ResponsivePages"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  All Pages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-page",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Create New Page
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? (
            <Route path="/new-page" component={AsyncNewPage} />
          ) : null}
          <Route path="/ResponsivePages" component={AllPages} />
          <Route path="/" component={AllPages} />
        </Switch>
      </div>
    );
  }
}

export default Main;
