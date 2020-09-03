import React, { Component } from 'react';
import { Input as InputAd } from 'antd';
import styles from './styles/input.module.scss';
import classnames from 'classnames';

const { TextArea } = InputAd;

export default class InputAddJob extends Component {
  render() {
    const {
      placeholder = 'Placeholder',
      label = '',
      subLabel = '',
      afterLabel,
      onChange,
      value = '',
      type = 'text',
      textarea,
      disabled,
      pre,
    } = this.props;
    return (
      <div className={styles.jobadd_input_wrapper}>
        <p className={classnames(styles.label)}>{label}</p>
        <p className={classnames(styles.sub_label)}>{subLabel}</p>
        {/*
        {afterLabel && (
          <span className={styles.addition_label}>{afterLabel()}</span>
        )} */}
        {textarea ? (
          <TextArea
            value={value}
            disabled={disabled}
            className={styles.input_jobadd}
            placeholder={placeholder}
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={onChange}
          />
        ) : (
          <InputAd
            type={type}
            addonBefore={pre}
            disabled={disabled}
            value={value}
            className={classnames(styles.input, styles.input_jobadd)}
            // placeholder={placeholder}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
}
