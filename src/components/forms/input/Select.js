import React, { Component } from 'react';
import { Select as SelectAd } from 'antd';
import inputStyles from './styles/input.module.scss';
import styles from './styles/select.module.scss';
import classnames from 'classnames';

const { Option } = SelectAd;

export default class Select extends Component {
  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  };

  render() {
    const {
      label,
      placeholder = '',
      options = [],
      value,
      afterLabel,
      noMarginContainer,
      customWrapperStyle = {},
      disabled,
      multiple,
    } = this.props;
    // console.warn(value);
    let additionalProps = {};
    if (multiple) additionalProps = { mode: 'multiple' };
    return (
      <div
        className={classnames(inputStyles.input_wrapper, customWrapperStyle, {
          [inputStyles.margin_none]: noMarginContainer,
        })}
      >
        {label && (
          <p
            className={classnames(inputStyles.label, {
              [inputStyles.labelShow]: value,
            })}
          >
            {label}
          </p>
        )}
        {afterLabel && (
          <span className={inputStyles.addition_label}>{afterLabel()}</span>
        )}
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
    );
  }
}
