import React, { Component } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";

import styles from "./NewPage.module.css";

class NewPage extends Component {
  state = {
    title: "",
    description: "",
    isActive: "",
    type: "",
    submitted: false,
  };
  pageDataHandler = () => {
    const data = {
      title: this.state.title,
      description: this.state.description,
      isActive: this.state.isActive,
      type: this.state.type,
      publishedOn: new Date(),
    };
    axios.post("/ResponsivePages/", data).then((response) => {
      console.log(response);
      this.props.history.replace("/ResponsivePages/");
      this.setState({ submitted: true });
      alert("New Page Has Created Succesfully");
    });
  };

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/ResponsivePages" />;
    }
    return (
      <div className={styles.NewPage}>
        {redirect}
        <h1>Create New Page</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Description</label>
        <textarea
          rows="4"
          value={this.state.description}
          onChange={(event) =>
            this.setState({ description: event.target.value })
          }
        />
        <label>Is Active</label>
        <select
          value={this.state.isActive}
          onChange={(event) => this.setState({ isActive: event.target.value })}
        >
          <option value={false}>Not Active</option>
          <option value={true}>Active</option>
        </select>
        <label>Type</label>
        <select
          value={this.state.type}
          onChange={(event) => this.setState({ type: event.target.value })}
        >
          <option value="0">Menu</option>
          <option value="1">Events</option>
          <option value="2">Content</option>
        </select>
        <button onClick={this.pageDataHandler}>Add Page</button>
      </div>
    );
  }
}

export default NewPage;
