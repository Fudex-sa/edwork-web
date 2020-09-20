import React, { Component } from "react";
import { Radio as RadioAd } from "antd";
import styles from "./styles/input.module.scss";

export default class Radio extends Component {
  render() {
    const {
      label = "",
      onChange,
      value,
      options = [],
      afterLabel,
    } = this.props;
    return (
      <div className={styles.input_wrapper}>
        <p className={styles.label}>{label}</p>
        {afterLabel && (
          <span className={styles.addition_label}>{afterLabel()}</span>
        )}
        <RadioAd.Group
          value={value}
          className={styles.radio}
          onChange={onChange}
          // value={value}
        >
          {options.map((item) => (
            <RadioAd className={styles.item} value={item.value}>
              {item.label}
            </RadioAd>
          ))}
        </RadioAd.Group>
      </div>
    );
  }
}
