import React, { Component } from "react";
import { Slider as SliderAd } from "antd";
import styles from "./styles/input.module.scss";

export default class Slider extends Component {
  formatter = (value) => {
    const { tipFormatterStart = "", tipFormatterEnd = "" } = this.props;
    return `${tipFormatterStart}${value}${tipFormatterEnd}`;
  };

  render() {
    const {
      label = "",
      disabled,
      onChange,
      value = "",
      type = "text",
      textarea,
      pre,
    } = this.props;
    return (
      <div className={styles.input_wrapper}>
        <p className={styles.label}>{label}</p>
        <SliderAd
          defaultValue={30}
          value={value}
          disabled={disabled}
          onChange={onChange}
          tipFormatter={this.formatter}
        />
      </div>
    );
  }
}
