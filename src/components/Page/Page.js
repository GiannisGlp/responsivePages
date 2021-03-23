import React from "react";

import styles from "./Page.module.css";

const post = (props) => {
  let active = null;
  let type = null;

  switch (props.isActive) {
    case true:
      active = <div>Is Active</div>;
      break;
    case false:
      active = <div>Not Active</div>;
      break;
    default:
      active = <div></div>;
  }

  switch (props.pageType) {
    case 0:
      type = <div>0: Menu</div>;
      break;
    case 1:
      type = <div>1: Events</div>;
      break;
    case 2:
      type = <div>2: Content</div>;
      break;
    default:
      active = <div></div>;
  }

  return (
    <article key={props.id} className={styles.Page} onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div>
        <label>Description</label>
        <div>{props.description}</div>
        <label>Page ID</label>
        <div>{props.pageId}</div>
        <label>Page Type</label>
        {type}
        <label>Page Active</label>
        {active}
        <label>Page PublishedOn</label>
        <div>{props.publishedOn}</div>
      </div>
    </article>
  );
};

export default post;
