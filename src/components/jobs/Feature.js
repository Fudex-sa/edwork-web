import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";

import styles from "~containers/Jobs/styles/addJob.module.scss";

export default class Feature extends Component {
  render() {
    return (
      <div className={styles.feature}>
        <div className={styles.item}>
          <div className={styles.action}>
            <span>
              <PlusOutlined style={{ fontSize: 17 }} />
            </span>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>
              <span>Title</span> <span>150</span>
            </p>
            <p className={styles.subtitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        <div className={styles.sum}>
          <p>Total: 150</p>
        </div>
      </div>
    );
  }
}
