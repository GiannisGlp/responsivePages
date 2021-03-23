import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "../../axios";

import styles from "./FullPage.module.css";

class FullPage extends Component {
  state = {
    title: "",
    description: "",
    isActive: false,
    type: "",
    submitted: false,
    loadedPage: null,
    deleted: false,
    updated: false,
  };

  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPage ||
        (this.state.loadedPage &&
          this.state.loadedPage.id !== +this.props.match.params.id)
      ) {
        axios
          .get("/ResponsivePages/" + this.props.match.params.id)
          .then((response) => {
            console.log(response.data);
            this.setState({ loadedPage: response.data });
          });
      }
    }
  }

  deletePageHandler = () => {
    axios
      .delete("/ResponsivePages/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ deleted: true });
        alert(" Page Has Been Deleted Succesfully");
        this.props.history.replace("/ResponsivePages/");
      });
  };

  updatePageHandler = () => {
    const data = {
      title: this.state.title,
      description: this.state.description,
      type: this.state.type,
      isActive: this.state.isActive,
      publishedOn: new Date(),
      id: this.props.match.params.id,
    };
    axios
      .put("/ResponsivePages/" + this.props.match.params.id, data)
      .then((response) => {
        this.setState({ updated: true });
        alert(" Page Has Been Updated Succesfully");
      });
  };
  updatePageNameHandler = () => {
    const data = {
      title: this.state.title,
      description: this.state.loadedPage.description,
      type: this.state.loadedPage.type,
      isActive: this.state.loadedPage.isActive,
      publishedOn: new Date(),
      id: this.props.match.params.id,
    };
    axios
      .put("/ResponsivePages/" + this.props.match.params.id, data)
      .then((response) => {
        this.setState({ updated: true });
        alert(" Page Has Been Updated Succesfully");
      });
  };
  updatePageDescHandler = () => {
    const data = {
      title: this.state.loadedPage.title,
      description: this.state.description,
      type: this.state.loadedPage.type,
      isActive: this.state.loadedPage.isActive,
      publishedOn: new Date(),
      id: this.props.match.params.id,
    };
    axios
      .put("/ResponsivePages/" + this.props.match.params.id, data)
      .then((response) => {
        this.setState({ updated: true });
        alert(" Page Has Been Updated Succesfully");
      });
  };
  updatePageTypeHandler = () => {
    const data = {
      title: this.state.loadedPage.title,
      description: this.state.loadedPage.description,
      type: this.state.type,
      isActive: this.state.loadedPage.isActive,
      publishedOn: new Date(),
      id: this.props.match.params.id,
    };
    axios
      .put("/ResponsivePages/" + this.props.match.params.id, data)
      .then((response) => {
        this.setState({ updated: true });
        alert(" Page Has Been Updated Succesfully");
      });
  };
  updatePageActiveHandler = () => {
    const data = {
      title: this.state.loadedPage.title,
      description: this.state.loadedPage.description,
      type: this.state.loadedPage.type,
      isActive: this.state.loadedPage.isActive,
      publishedOn: new Date(),
      id: this.props.match.params.id,
    };
    axios
      .put("/ResponsivePages/" + this.props.match.params.id, data)
      .then((response) => {
        this.setState({ updated: true });
        alert(" Page Has Been Updated Succesfully");
      });
  };

  render() {
    let redirect = null;
    if (this.state.deleted) {
      redirect = <Redirect to="/ResponsivePages/" />;
      this.setState({});
    }
    if (this.state.updated) {
      redirect = <Redirect to="/ResponsivePages/" />;
    }
    let page = <p style={{ textAlign: "center" }}>Please select a Page!</p>;
    if (this.props.match.params.id) {
      page = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPage) {
      let active = null;
      let type = null;

      switch (this.state.loadedPage.isActive) {
        case true:
          active = <p>Is Active</p>;
          break;
        case false:
          active = <p>Not Active</p>;
          break;
        default:
          active = <p></p>;
      }

      switch (this.state.loadedPage.type) {
        case 0:
          type = <p>0: Menu</p>;
          break;
        case 1:
          type = <p>1: Events</p>;
          break;
        case 2:
          type = <p>2: Content</p>;
          break;
        default:
          active = <p></p>;
      }
      page = (
        <div className={styles.FullPage}>
          {redirect}

          <section>
            <h1> Page Name: {this.state.loadedPage.title}</h1>
            <input
              type="text"
              placeholder="Type Here New Page Name"
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <button
              onClick={this.updatePageNameHandler}
              className={styles.Update}
            >
              UpdateName
            </button>
          </section>

          <section>
            <label>Description</label>
            <p>{this.state.loadedPage.description}</p>
            <input
              type="text"
              placeholder="Type Here New Page Description"
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
            <button
              onClick={this.updatePageDescHandler}
              className={styles.Update}
            >
              UpdateDesc
            </button>
          </section>

          <section>
            <label>Type Of The Page</label>
            {type}
            <select
              placeholder={this.props.type}
              onChange={(event) => this.setState({ type: event.target.value })}
            >
              <option value="0">Menu</option>
              <option value="1">Events</option>
              <option value="2">Content</option>
            </select>
            <button
              onClick={this.updatePageTypeHandler}
              className={styles.Update}
            >
              UpdateType
            </button>
          </section>

          <section>
            <label>Active</label>
            {active}
            <select
              placeholder={toString(this.props.isActive)}
              onChange={(event) =>
                this.setState({ isActive: event.target.value })
              }
            >
              <option value={false}>Not Active</option>
              <option value={true}>Active</option>
            </select>
            <button
              onClick={this.updatePageNameHandler}
              className={styles.Update}
            >
              UpdateActiveStatus
            </button>
          </section>

          <label>PublishedOn</label>
          <p>{this.state.loadedPage.publishedOn}</p>
          <label>Page ID</label>
          <p>{this.state.loadedPage.id}</p>

          <div className={styles.Edit}>
            <button onClick={this.deletePageHandler} className={styles.Delete}>
              Delete
            </button>
            <button onClick={this.updatePageHandler} className={styles.Update}>
              Update All
            </button>
          </div>
        </div>
      );
    }
    return page;
  }
}

export default FullPage;
