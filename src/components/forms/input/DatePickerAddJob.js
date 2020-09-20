import React, { Component } from 'react';
import { DatePicker } from 'antd';
import styles from './styles/input.module.scss';
import classnames from 'classnames';
import moment from 'moment';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

export default class DatePickerAddJob extends Component {
  render() {
    const {
      placeholder = 'Placeholder',
      format = 'DD/MM/YYYY',
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
        <div
          className={classnames(
            styles.input_base_wrapper,
            styles.input_datepicker
          )}
        >
          <DatePicker
            value={value}
            disabledDate={disabledDate}
            placeholder=""
            onChange={onChange}
            suffixIcon={null}
            format={format}
          />
        </div>
      </div>
    );
  }
}
