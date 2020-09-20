import React, { Component } from 'react';
import styles from './styles/input.module.scss';
import classnames from 'classnames';
import { Select as SelectAd } from 'antd';
const { Option } = SelectAd;

export default class SelectAddJob extends Component {
  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  };

  render() {
    const {
      label,
      subLabel,
      placeholder = '',
      options = [],
      value,
      afterLabel,
      noMarginContainer,
      customWrapperStyle = {},
      disabled,
      multiple,
    } = this.props;
    let additionalProps = {};
    if (multiple) additionalProps = { mode: 'multiple' };
    return (
      <div className={styles.jobadd_input_wrapper}>
        <p className={classnames(styles.label)}>{label}</p>
        <p className={classnames(styles.sub_label)}>{subLabel}</p>
        <div
          className={classnames(styles.input_base_wrapper, styles.input_select)}
        >
          <SelectAd
            disabled={!!disabled}
            value={value}
            className={styles.select}
            // defaultValue="1"
            placeholder={placeholder}
            onChange={this.handleChange}
            allowClear
            {...additionalProps}
          >
            {options.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                );
              } else if (typeof item === 'object') {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.name}
                  </Option>
                );
              }
            })}
          </SelectAd>
        </div>
      </div>
    );
  }
}
