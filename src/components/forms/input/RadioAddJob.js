import React, { Component } from 'react';
import { Radio as RadioAd } from 'antd';
import styles from './styles/input.module.scss';

export default class RadioAddJob extends Component {
  render() {
    const {
      label = '',
      labelIcon,
      onChange,
      value,
      options = [],
      afterLabel,
    } = this.props;
    return (
      <div className={styles.jobadd_input_wrapper}>
        <p className={styles.label}>
          {label} {labelIcon}
        </p>
        {afterLabel && (
          <span className={styles.addition_label}>{afterLabel()}</span>
        )}
        <RadioAd.Group
          value={value}
          className={styles.radio}
          onChange={onChange}
          // value={value}
        >
          {options.map((item,index) => (
            <RadioAd key={index} className={styles.item} value={item.value}>
              {item.label}
            </RadioAd>
          ))}
        </RadioAd.Group>
      </div>
    );
  }
}
